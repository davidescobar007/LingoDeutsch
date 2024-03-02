import createMiddleware from "next-intl/middleware"

import { localePrefix, locales } from "./navigation"

export default createMiddleware({
   locales,
   localePrefix,
   defaultLocale: "es"
})

export const config = {
   // Match only internationalized pathnames
   matcher: ["/", "/(es|de)/:path*"]
}
