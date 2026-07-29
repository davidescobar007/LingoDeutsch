import { GoogleGenAI } from '@google/genai'

import { TGrammar, TTutorMessage } from '@/modules/actions/types'
import { buildGrammarTutorSystemPrompt } from '@/modules/ai/grammarTutor.prompt'
import { pb } from '@/network/setup'

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY })

const TUTOR_DAILY_LIMIT = 15
const TUTOR_HISTORY_LIMIT = 24

type TutorRequestBody = {
   grammarId?: string
   messages?: TTutorMessage[]
   locale?: string
}

const sseEncode = (data: string): Uint8Array => new TextEncoder().encode(data)

const sanitizeHistory = (messages: TTutorMessage[]): TTutorMessage[] => {
   if (!Array.isArray(messages) || messages.length === 0) return []
   const cleaned = messages
      .filter(
         (m) => m && (m.role === 'user' || m.role === 'model') && typeof m.content === 'string' && m.content.trim()
      )
      .map((m) => ({ role: m.role, content: m.content.slice(0, 4000), createdAt: m.createdAt ?? Date.now() }))
   return cleaned.slice(-TUTOR_HISTORY_LIMIT)
}

export const POST = async (request: Request): Promise<Response> => {
   let body: TutorRequestBody
   try {
      body = (await request.json()) as TutorRequestBody
   } catch {
      return new Response(JSON.stringify({ error: 'tutor.invalidBody' }), {
         status: 400,
         headers: { 'Content-Type': 'application/json' }
      })
   }

   const grammarId = body.grammarId
   const locale = body.locale ?? 'es'
   const incomingMessages = sanitizeHistory(body.messages ?? [])

   if (!grammarId || typeof grammarId !== 'string') {
      return new Response(JSON.stringify({ error: 'tutor.missingGrammarId' }), {
         status: 400,
         headers: { 'Content-Type': 'application/json' }
      })
   }

   if (incomingMessages.length === 0) {
      return new Response(JSON.stringify({ error: 'tutor.emptyMessage' }), {
         status: 400,
         headers: { 'Content-Type': 'application/json' }
      })
   }

   let grammar
   try {
      grammar = await pb.collection('grammar').getOne(grammarId, { expand: 'learning_unit_id' })
   } catch (error) {
      console.warn('***************GRAMMAR TUTOR: lesson not found', { grammarId, error })
      return new Response(JSON.stringify({ error: 'tutor.grammarNotFound' }), {
         status: 404,
         headers: { 'Content-Type': 'application/json' }
      })
   }

   const userMessagesCount = incomingMessages.filter((m) => m.role === 'user').length
   if (userMessagesCount > TUTOR_DAILY_LIMIT) {
      return new Response(JSON.stringify({ error: 'tutor.limitReached' }), {
         status: 429,
         headers: { 'Content-Type': 'application/json' }
      })
   }

   const systemInstruction = buildGrammarTutorSystemPrompt({ grammar: grammar as unknown as TGrammar, locale })

   const contents = incomingMessages.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }]
   }))

   const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
         try {
            const responseStream = await ai.models.generateContentStream({
               model: 'gemini-2.5-flash',
               contents,
               config: {
                  systemInstruction,
                  temperature: 0.4,
                  maxOutputTokens: 1000
               }
            })

            for await (const chunk of responseStream) {
               const text = chunk?.text
               if (text) {
                  controller.enqueue(sseEncode(`data: ${JSON.stringify({ text })}\n\n`))
               }
            }

            controller.enqueue(sseEncode('data: [DONE]\n\n'))
            controller.close()
         } catch (error) {
            console.warn('***************GRAMMAR TUTOR: stream error', error)
            controller.enqueue(sseEncode(`data: ${JSON.stringify({ error: 'tutor.error' })}\n\n`))
            controller.enqueue(sseEncode('data: [DONE]\n\n'))
            controller.close()
         }
      }
   })

   return new Response(stream, {
      headers: {
         'Content-Type': 'text/event-stream; charset=utf-8',
         'Cache-Control': 'no-cache, no-transform',
         Connection: 'keep-alive',
         'X-Accel-Buffering': 'no'
      }
   })
}
