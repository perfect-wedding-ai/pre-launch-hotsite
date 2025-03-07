import type { Config } from 'tailwindcss'

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
    },
  },
  plugins: [],
  safelist: [
    'bg-primary',
    'text-primary',
    'border-primary',
    'hover:bg-primary',
    'hover:opacity-90',
    'hover:bg-opacity-10',
  ],
}

export default config 