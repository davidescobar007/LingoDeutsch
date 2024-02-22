import createMiddleware from "next-intl/middleware"

export default createMiddleware({
   // A list of all locales that are supported
   locales: ["es", "de"],

   // Used when no locale matches
   defaultLocale: "es"
})

export const config = {
   // Match only internationalized pathnames
   matcher: ["/", "/(de|es)/:path*"]
}
