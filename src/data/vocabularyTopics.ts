// Vocabulary topics organized by CEFR levels
export const vocabularyTopics = {
   A1: [
      { id: 'family', name: 'Familie', icon: '👨‍👩‍👧‍👦', description: 'Familia', wordCount: 25 },
      { id: 'numbers', name: 'Zahlen', icon: '🔢', description: 'Números', wordCount: 20 },
      { id: 'colors', name: 'Farben', icon: '🎨', description: 'Colores', wordCount: 15 },
      { id: 'body', name: 'Körperteile', icon: '🫀', description: 'Partes del cuerpo', wordCount: 18 },
      { id: 'food', name: 'Essen', icon: '🍎', description: 'Comida', wordCount: 30 },
      { id: 'clothes', name: 'Kleidung', icon: '👔', description: 'Ropa', wordCount: 22 }
   ],
   A2: [
      { id: 'house', name: 'Haus', icon: '🏠', description: 'Casa', wordCount: 28 },
      { id: 'time', name: 'Zeit', icon: '⏰', description: 'Tiempo', wordCount: 25 },
      { id: 'weather', name: 'Wetter', icon: '🌤️', description: 'Clima', wordCount: 20 },
      { id: 'transport', name: 'Transport', icon: '🚗', description: 'Transporte', wordCount: 24 },
      { id: 'school', name: 'Schule', icon: '🎓', description: 'Escuela', wordCount: 35 },
      { id: 'hobbies', name: 'Hobbys', icon: '⚽', description: 'Pasatiempos', wordCount: 26 }
   ],
   B1: [
      { id: 'work', name: 'Arbeit', icon: '💼', description: 'Trabajo', wordCount: 40 },
      { id: 'health', name: 'Gesundheit', icon: '⚕️', description: 'Salud', wordCount: 32 },
      { id: 'travel', name: 'Reisen', icon: '✈️', description: 'Viajes', wordCount: 38 },
      { id: 'technology', name: 'Technologie', icon: '💻', description: 'Tecnología', wordCount: 35 },
      { id: 'emotions', name: 'Gefühle', icon: '😊', description: 'Emociones', wordCount: 28 },
      { id: 'shopping', name: 'Einkaufen', icon: '🛍️', description: 'Compras', wordCount: 30 }
   ],
   B2: [
      { id: 'environment', name: 'Umwelt', icon: '🌍', description: 'Medio ambiente', wordCount: 45 },
      { id: 'politics', name: 'Politik', icon: '🏛️', description: 'Política', wordCount: 42 },
      { id: 'culture', name: 'Kultur', icon: '🎭', description: 'Cultura', wordCount: 38 },
      { id: 'science', name: 'Wissenschaft', icon: '🔬', description: 'Ciencia', wordCount: 48 },
      { id: 'media', name: 'Medien', icon: '📺', description: 'Medios', wordCount: 35 },
      { id: 'economy', name: 'Wirtschaft', icon: '📈', description: 'Economía', wordCount: 40 }
   ]
}

export type VocabularyTopic = {
   id: string
   name: string
   icon: string
   description: string
   wordCount: number
}

export type VocabularyLevel = 'A1' | 'A2' | 'B1' | 'B2'
