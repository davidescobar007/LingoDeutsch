import lamejs from 'lamejs-fixed'

export const encodePcmToMp3 = (pcmBytes: Uint8Array, sampleRate: number, numChannels: number): Uint8Array => {
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

export const convertPcmBase64ToMp3Base64 = (
   pcmBase64: string,
   sampleRate: number = 24000,
   numChannels: number = 1
): string => {
   const pcmBinary = atob(pcmBase64)
   const pcmBytes = new Uint8Array(pcmBinary.length)
   for (let i = 0; i < pcmBinary.length; i++) {
      pcmBytes[i] = pcmBinary.charCodeAt(i)
   }

   const mp3Buffer = encodePcmToMp3(pcmBytes, sampleRate, numChannels)

   let mp3Base64 = ''
   for (let i = 0; i < mp3Buffer.length; i++) {
      mp3Base64 += String.fromCharCode(mp3Buffer[i])
   }

   return btoa(mp3Base64)
}
