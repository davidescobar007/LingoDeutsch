import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'

import { convertPcmBase64ToMp3Base64 } from '@/utils/audio.utils'

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY })

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
      const mp3Base64 = convertPcmBase64ToMp3Base64(pcmBase64)

      return NextResponse.json({
         audio: mp3Base64,
         mimeType: 'audio/mp3'
      })
   } catch (error) {
      console.warn('***************TTS ERROR: ', error)
      return NextResponse.json({ error: 'Error generating audio' }, { status: 500 })
   }
}
