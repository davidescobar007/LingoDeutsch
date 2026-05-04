import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY })

const createWavHeader = (
   pcmDataLength: number,
   sampleRate: number,
   numChannels: number,
   bitsPerSample: number
): Uint8Array => {
   const byteRate = sampleRate * numChannels * (bitsPerSample / 8)
   const blockAlign = numChannels * (bitsPerSample / 8)
   const header = new Uint8Array(44)
   const view = new DataView(header.buffer)

   view.setUint32(0, 0x52494646, false)
   view.setUint32(4, 36 + pcmDataLength, true)
   view.setUint32(8, 0x57415645, false)
   view.setUint32(12, 0x666d7420, false)
   view.setUint32(16, 16, true)
   view.setUint16(20, 1, true)
   view.setUint16(22, numChannels, true)
   view.setUint32(24, sampleRate, true)
   view.setUint32(28, byteRate, true)
   view.setUint16(32, blockAlign, true)
   view.setUint16(34, bitsPerSample, true)
   view.setUint32(36, 0x64617461, false)
   view.setUint32(40, pcmDataLength, true)

   return header
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
      const bitsPerSample = 16

      const wavHeader = createWavHeader(pcmBytes.length, sampleRate, numChannels, bitsPerSample)
      const wavBuffer = new Uint8Array(wavHeader.length + pcmBytes.length)
      wavBuffer.set(wavHeader, 0)
      wavBuffer.set(pcmBytes, wavHeader.length)

      let wavBase64 = ''
      for (let i = 0; i < wavBuffer.length; i++) {
         wavBase64 += String.fromCharCode(wavBuffer[i])
      }
      wavBase64 = btoa(wavBase64)

      return NextResponse.json({
         audio: wavBase64,
         mimeType: 'audio/wav'
      })
   } catch (error) {
      console.warn('***************TTS ERROR: ', error)
      return NextResponse.json({ error: 'Error generating audio' }, { status: 500 })
   }
}
