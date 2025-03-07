import type { Config } from 'tailwindcss'

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}'
   ],
   theme: {
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
         },

         width: {
            '1/24': '4.166667%',
            '3/24': '12.5%',
            '4/24': '16.666667%',
            '5/24': '20.833333%',
            '6/24': '25%',
            '7/24': '29.166667%',
            '8/24': '33.333333%',
            '9/24': '37.5%',
            '10/24': '41.666667%',
            '11/24': '45.833333%',
            '12/24': '50%',
            '13/24': '54.166667%',
            '14/24': '58.333333%',
            '15/24': '62.5%',
            '16/24': '66.666667%',
            '17/24': '70.833333%',
            '18/24': '75%',
            '19/24': '79.166667%',
            '20/24': '83.333333%',
            '21/24': '87.5%',
            '22/24': '91.666667%',
            '23/24': '95.833333%',
            '24/24': '100%',
            '1/32': '3.125%',
            '2/32': '6.25%',
            '3/32': '9.375%',
            '4/32': '12.5%',
            '5/32': '15.625%',
            '6/32': '18.75%',
            '7/32': '21.875%',
            '8/32': '25%',
            '9/32': '28.125%',
            '10/32': '31.25%',
            '11/32': '34.375%',
            '12/32': '37.5%',
            '13/32': '40.625%',
            '14/32': '43.75%',
            '15/32': '46.875%',
            '16/32': '50%',
            '17/32': '53.125%',
            '18/32': '56.25%',
            '19/32': '59.375%',
            '20/32': '62.5%',
            '21/32': '65.625%',
            '22/32': '68.75%',
            '23/32': '71.875%',
            '24/32': '75%',
            '25/32': '78.125%',
            '26/32': '81.25%',
            '27/32': '84.375%',
            '28/32': '87.5%',
            '29/32': '90.625%',
            '30/32': '93.75%',
            '31/32': '96.875%',
            '32/32': '100%'
         },
         height: {
            'calc-vh-60': 'calc(100vh - 130px)',
            '1/24': '4.166667%',
            '3/24': '12.5%',
            '4/24': '16.666667%',
            '5/24': '20.833333%',
            '6/24': '25%',
            '7/24': '29.166667%',
            '8/24': '33.333333%',
            '9/24': '37.5%',
            '10/24': '41.666667%',
            '11/24': '45.833333%',
            '12/24': '50%',
            '13/24': '54.166667%',
            '14/24': '58.333333%',
            '15/24': '62.5%',
            '16/24': '66.666667%',
            '17/24': '70.833333%',
            '18/24': '75%',
            '19/24': '79.166667%',
            '20/24': '83.333333%',
            '21/24': '87.5%',
            '22/24': '91.666667%',
            '23/24': '95.833333%'
         },
         spacing: {
            34: '8.5rem'
         }
      }
   },
   plugins: [require('@tailwindcss/typography'), require('daisyui')],
   daisyui: {
      styled: true,
      themes: [
         'cmyk',
         'night',
         'winter',
         'lemonade',
         {
            mytheme: {
               primary: '#805AF2', // Vibrant purple, used for main buttons, highlights, and active elements
               'primary-content': '#FFFFFF', // White, ensures readability on primary-colored elements

               secondary: '#e5defc', // Light pastel purple, for secondary buttons and subtle UI elements
               'secondary-content': '#4D2C91', // Darker purple, maintaining good contrast on secondary elements

               accent: '#FFC107', // Amber/Gold, used for accents like hover effects, interactive elements
               'accent-content': '#5A3B00', // Dark gold/brown, ensuring visibility on accent elements

               neutral: '#555555', // Medium gray, ideal for main text and general content
               'neutral-content': '#FAFAFA', // Off-white, providing contrast for text on darker neutral backgrounds

               'base-100': '#FAFAFA', // Off-white/light gray, main background color
               'base-200': '#f4f6f7', // Slightly darker gray, for subtle section differentiation
               'base-300': '#D6D6D6', // Light gray, for UI elements like dividers, borders
               'base-content': '#222222', // Dark gray, used for general text ensuring readability

               info: '#3AB7BF', // Teal, for informational messages and hints
               'info-content': '#042A2E', // Deep teal, ensuring contrast on info messages

               success: '#36D399', // Bright green, for success indicators and positive feedback
               'success-content': '#064C2C', // Dark green, used for text on success elements

               warning: '#FBBD23', // Gold/Yellow, for warnings and alerts
               'warning-content': '#5A3E00', // Dark gold, ensuring text visibility on warnings

               error: '#F87272', // Soft red, for error states and critical messages
               'error-content': '#5A1A1A' // Deep red, maintaining contrast for error text
            }
         }
      ],
      base: true,
      utils: true,
      logs: true
   }
}
export default config
