import es from '../../messages/es.json'

import { routing } from './routing'

declare module 'next-intl' {
   interface AppConfig {
      Messages: typeof es
      Locale: (typeof routing.locales)[number]
   }
}
