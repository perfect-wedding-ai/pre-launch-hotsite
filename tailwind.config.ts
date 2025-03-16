import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			h1: 'var(--h1-color)',
  			h2: 'var(--h2-color)',
  			subtitle: 'var(--subtitle-color)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-montserrat)',
                    ...defaultTheme.fontFamily.sans
                ],
  			serif: [
  				'var(--font-playfair)',
                    ...defaultTheme.fontFamily.serif
                ],
  			montserrat: [
  				'var(--font-montserrat)',
                    ...defaultTheme.fontFamily.sans
                ],
  			playfair: [
  				'var(--font-playfair)',
                    ...defaultTheme.fontFamily.serif
                ],
  			system: [
  				'var(--system-font)'
  			]
  		},
  		boxShadow: {
  			custom: 'var(--shadow)'
  		},
  		backgroundImage: {
  			'gradient-custom': 'var(--gradient-bg)'
  		},
  		borderRadius: {
  			custom: 'var(--border-radius)',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		opacity: {
  			'10': '0.1',
  			'90': '0.9'
  		},
  		transitionProperty: {
  			height: 'height',
  			spacing: 'margin, padding'
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					maxWidth: '100%',
  					color: 'var(--text-color, #333)',
  					p: {
  						width: 'auto'
  					},
  					a: {
  						color: 'var(--primary-color)',
  						'&:hover': {
  							color: 'var(--secondary-color)'
  						}
  					},
  					h1: {
  						fontFamily: 'var(--font-playfair)',
  						color: 'var(--h1-color)',
  						width: 'auto'
  					},
  					h2: {
  						fontFamily: 'var(--font-playfair)',
  						color: 'var(--h2-color)',
  						width: 'auto'
  					},
  					h3: {
  						fontFamily: 'var(--font-playfair)',
  						width: 'auto'
  					},
  					h4: {
  						fontFamily: 'var(--font-playfair)',
  						width: 'auto'
  					},
  					ul: {
  						width: 'auto'
  					},
  					ol: {
  						width: 'auto'
  					},
  					li: {
  						width: 'auto'
  					},
  					blockquote: {
  						width: 'auto'
  					}
  				}
  			}
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/typography'),
      require("tailwindcss-animate")
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