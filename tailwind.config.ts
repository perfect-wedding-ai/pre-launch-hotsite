import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        h1: 'var(--h1-color)',
        h2: 'var(--h2-color)',
        subtitle: 'var(--subtitle-color)',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-playfair)', ...defaultTheme.fontFamily.serif],
        montserrat: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        playfair: ['var(--font-playfair)', ...defaultTheme.fontFamily.serif],
        system: ['var(--system-font)'],
      },
      boxShadow: {
        'custom': 'var(--shadow)',
      },
      backgroundImage: {
        'gradient-custom': 'var(--gradient-bg)',
      },
      borderRadius: {
        'custom': 'var(--border-radius)',
      },
      opacity: {
        '10': '0.1',
        '90': '0.9',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'var(--text-color, #333)',
            p: {
              width: 'auto',
            },
            a: {
              color: 'var(--primary-color)',
              '&:hover': {
                color: 'var(--secondary-color)',
              },
            },
            h1: {
              fontFamily: 'var(--font-playfair)',
              color: 'var(--h1-color)',
              width: 'auto',
            },
            h2: {
              fontFamily: 'var(--font-playfair)',
              color: 'var(--h2-color)',
              width: 'auto',
            },
            h3: {
              fontFamily: 'var(--font-playfair)',
              width: 'auto',
            },
            h4: {
              fontFamily: 'var(--font-playfair)',
              width: 'auto',
            },
            ul: {
              width: 'auto',
            },
            ol: {
              width: 'auto',
            },
            li: {
              width: 'auto',
            },
            blockquote: {
              width: 'auto',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'bg-primary',
    'bg-secondary',
    'text-primary',
    'text-h1',
    'text-h2',
    'border-primary',
    'hover:bg-primary',
    'hover:opacity-90',
    'hover:text-white',
    'hover:shadow-lg',
    'hover:-translate-y-0.5',
    'font-playfair',
    'font-montserrat',
    'font-system',
  ],
}

export default config 