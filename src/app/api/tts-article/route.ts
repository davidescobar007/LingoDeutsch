import { GoogleGenAI } from '@google/genai'
import lamejs from 'lamejs-fixed'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY })

const ARTICLE_VOICES = ['Kore', 'Charon', 'Aoede', 'Zephyr', 'Enceladus', 'Orus', 'Puck']

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
         mimeType: 'audio/mp3',
         voiceName
      })
   } catch (error) {
      console.warn('***************TTS ARTICLE ERROR: ', error)
      return NextResponse.json({ error: 'Error generating audio' }, { status: 500 })
   }
}
