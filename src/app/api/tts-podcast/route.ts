import { GoogleGenAI } from '@google/genai'
import lamejs from 'lamejs-fixed'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY })

const encodePcmToMp3 = (pcmBytes: Uint8Array, sampleRate: number, numChannels: number): Uint8Array => {
   const mp3Encoder = new lamejs.Mp3Encoder(numChannels, sampleRate, 64)
   const pcmSamples = new Int16Array(pcmBytes.buffer)
   const mp3Chunks: Int8Array[] = []
   const blockSize = 1152

   for (let i = 0; i < pcmSamples.length; i += blockSize) {
      const block = pcmSamples.subarray(i, Math.min(i + blockSize, pcmSamples.length))
      const mp3buf = mp3Encoder.encodeBuffer(block)
      if (mp3buf.length > 0) {
         mp3Chunks.push(mp3buf)
      }
   }

   const mp3End = mp3Encoder.flush()
   if (mp3End.length > 0) {
      mp3Chunks.push(mp3End)
   }

   const totalLength = mp3Chunks.reduce((acc, chunk) => acc + chunk.length, 0)
   const mp3Buffer = new Uint8Array(totalLength)
   let offset = 0
   for (const chunk of mp3Chunks) {
      mp3Buffer.set(chunk, offset)
      offset += chunk.length
   }

   return mp3Buffer
}

export async function POST(request: Request) {
   const body = await request.json()
   const { text } = body

   if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid text parameter' }, { status: 400 })
   }

   try {
      const ttsPrompt = `# AUDIO PROFILE: LingoDeutsch Tutor
## "Grammar Explained"

## THE SCENE: A Bright Study Room
It is morning in a sunlit study room. Books on German grammar line the shelves. A warm cup of coffee sits on the desk next to highlighted notes. The tutor speaks with the calm confidence of someone who genuinely loves explaining how German works — and has done it thousands of times for Spanish-speaking learners. Every word is chosen to illuminate, every pause lets the concept land.

### DIRECTOR'S NOTES
Style:
* Warm and encouraging tone, like a favorite teacher who makes complex grammar feel surprisingly simple.
* The "Vocal Smile" — the listener should hear a smile in the vomimeTypeice. Friendly, inviting, never robotic or monotone.
* Crystal-clear enunciation. This is educational content: every syllable matters. Pace yourself so the listener can follow along without rewinding.
* Natural cadence with strategic pauses. Pause briefly before German examples (let the listener anticipate), pause after them (let the concept sink in). Commas and periods are breaths, not suggestions.
* Dynamic shifts: When speaking Spanish explanations, sound conversational and warm — like talking to a friend over coffee. When reading German words, phrases, or examples, shift to precise, deliberate pronunciation — as if placing each German word carefully on a table for the listener to examine.
* German pronunciation rules:
  - Umlauts (ä, ö, ü) are distinctly pronounced, never reduced or substituted.
  - The "ch" sound varies: [ç] after front vowels (ich, nicht), [x] after back vowels (Buch, machen).
  - Consonant endings are crisp: "und" ends with a clear [t], "ist" ends sharp.
  - Word stress follows German patterns: separable prefixes stressed (úmgehen, áufmachen), compound stress on the first element (Haus+tür, Deutsch+land).
  - Never hispanicize German vowels. "ei" is [aɪ], "ie" is [iː], "eu/äu" is [ɔʏ].
* When speaking Spanish: natural, fluent Latin American Spanish. Clear diction, warm register.
* Do NOT translate German text into Spanish. Read German exactly as written with authentic pronunciation, and Spanish exactly as written.
* Pacing: Moderate tempo. Not rushed. The listener should feel they have time to absorb each grammar point before the next one arrives. Premium quality, as if recorded for a professional language learning podcast.
* Emotion: Patient, pedagogical, genuinely enthusiastic about German grammar. The listener should feel: "This person actually believes I can learn this."

### CONTEXT
This is a German grammar podcast for LingoDeutsch (Blabling), a language learning platform where Spanish speakers learn German through a grammar-first approach. The content comes from structured lessons covering topics like articles (der/die/das), present tense conjugation, cases (nominative/accusative), plurals, and sentence structure. The podcaster brings these written lessons to life with their voice.

#### TRANSCRIPT
${text}`

      const response = await ai.models.generateContent({
         model: 'gemini-3.1-flash-tts-preview',
         contents: [{ parts: [{ text: ttsPrompt }] }],
         config: {
            responseModalities: ['AUDIO'],
            speechConfig: 'Kore'
         }
      })

      const audioPart = response.candidates?.[0]?.content?.parts?.[0]

      if (!audioPart || !('inlineData' in audioPart) || !audioPart.inlineData) {
         return NextResponse.json({ error: 'No audio generated' }, { status: 500 })
      }

      const inlineData = audioPart.inlineData
      const pcmBase64 = inlineData.data ?? ''
      const pcmBinary = atob(pcmBase64)
      const pcmBytes = new Uint8Array(pcmBinary.length)
      for (let i = 0; i < pcmBinary.length; i++) {
         pcmBytes[i] = pcmBinary.charCodeAt(i)
      }

      const sampleRate = 24000
      const numChannels = 1

      const mp3Buffer = encodePcmToMp3(pcmBytes, sampleRate, numChannels)

      let mp3Base64 = ''
      for (let i = 0; i < mp3Buffer.length; i++) {
         mp3Base64 += String.fromCharCode(mp3Buffer[i])
      }
      mp3Base64 = btoa(mp3Base64)

      return NextResponse.json({
         audio: mp3Base64,
         mimeType: 'audio/mp3'
      })
   } catch (error) {
      console.warn('***************TTS ERROR: ', error)
      return NextResponse.json({ error: 'Error generating audio' }, { status: 500 })
   }
}
