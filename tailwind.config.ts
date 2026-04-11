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
         animation: {
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            shimmer: 'shimmer 3s linear infinite'
         },
         keyframes: {
            shimmer: {
               '0%': { transform: 'translateX(0)' },
               '100%': { transform: 'translateX(400%)' }
            }
         },
         borderWidth: {
            '3': '3px'
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
         },
         scale: {
            '102': '1.02'
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
               primary: '#2563EB', // Busuu Blue - Vibrant and trustworthy
               'primary-content': '#FFFFFF',

               secondary: '#dbeafe', // Light Blue - For backgrounds/cards
               'secondary-content': '#1e40af', // Dark Blue text

               accent: '#FFC800', // Gold/Yellow - For gamification elements
               'accent-content': '#422a00',

               neutral: '#1f2937', // Dark cool gray
               'neutral-content': '#FFFFFF',

               'base-100': '#FFFFFF',
               'base-200': '#F9FAFB', // Very light cool gray
               'base-300': '#E5E7EB', // Border gray

               info: '#2563EB',
               success: '#22c55e', // Vibrant Green
               warning: '#FFC800',
               error: '#ef4444',

               // '--rounded-box': '1.5rem', // Highly rounded cards
               '--rounded-btn': '11px' // Slightly rounded buttons
               // '--rounded-badge': '2rem',
               // '--animation-btn': '0.2s', // Snappy button press
               // '--btn-focus-scale': '0.95',
               // '--border-btn': '0px', // We will handle borders manually for 3D effect usually, or leave standard
               // '--tab-border': '1px'
            }
         }
      ],
      base: true,
      utils: true,
      logs: true
   }
}
export default config
