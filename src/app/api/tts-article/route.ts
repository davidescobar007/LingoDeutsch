import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'

import { convertPcmBase64ToMp3Base64 } from '@/utils/audio.utils'

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY })

const ARTICLE_VOICES = ['Kore', 'Charon', 'Aoede', 'Zephyr', 'Enceladus', 'Orus', 'Puck']

export async function POST(request: Request) {
   const body = await request.json()
   const { text } = body

   if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid text parameter' }, { status: 400 })
   }

   try {
      const voiceName = ARTICLE_VOICES[Math.floor(Math.random() * ARTICLE_VOICES.length)]

      const ttsPrompt = `Narrate the following German article for Blabling, a platform where Spanish speakers learn German through immersive listening.

Use a warm, clear, natural audiobook-style voice in authentic Standard German. Speak only in German. Do not translate, explain, summarize, or add any extra content. Read only the article text exactly as provided.

Delivery guidelines:
- Natural Standard German pronunciation, never hispanicized.
- Moderate learner-friendly pace, slightly slower than a native audiobook but still fluent.
- Clear articulation and crisp final consonants.
- Natural pauses after punctuation, headings, and section transitions.
- Warm, calm, engaging tone.
- Slightly slower delivery for important words, examples, lists, and definitions.
- Clear umlauts: ä, ö, ü.
- Correct German "ch" pronunciation, as in "ich" and "Buch".
- Correct vowel sounds: "ei" as [aɪ], "ie" as long [iː], "eu/äu" as [ɔʏ].

Article:
${text}`

      const response = await ai.models.generateContent({
         model: 'gemini-3.1-flash-tts-preview',
         contents: [{ parts: [{ text: ttsPrompt }] }],
         config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
               voiceConfig: {
                  prebuiltVoiceConfig: { voiceName }
               }
            }
         }
      })

      const audioPart = response.candidates?.[0]?.content?.parts?.[0]

      if (!audioPart || !('inlineData' in audioPart) || !audioPart.inlineData) {
         return NextResponse.json({ error: 'No audio generated' }, { status: 500 })
      }

      const inlineData = audioPart.inlineData
      const pcmBase64 = inlineData.data ?? ''
      const mp3Base64 = convertPcmBase64ToMp3Base64(pcmBase64)

      return NextResponse.json({
         audio: mp3Base64,
         mimeType: 'audio/mp3',
         voiceName
      })
   } catch (error) {
      console.warn('***************TTS ARTICLE ERROR: ', error)
      return NextResponse.json({ error: 'Error generating audio' }, { status: 500 })
   }
}
