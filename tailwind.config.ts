import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Weather-specific colors
				sunny: {
					DEFAULT: 'hsl(var(--sunny))',
					secondary: 'hsl(var(--sunny-secondary))'
				},
				cloudy: {
					DEFAULT: 'hsl(var(--cloudy))',
					dark: 'hsl(var(--cloudy-dark))'
				},
				rainy: {
					DEFAULT: 'hsl(var(--rainy))',
					dark: 'hsl(var(--rainy-dark))'
				},
				snowy: 'hsl(var(--snowy))',
				stormy: {
					DEFAULT: 'hsl(var(--stormy))',
					dark: 'hsl(var(--stormy-dark))'
				}
			},
			backgroundImage: {
				'gradient-sunny': 'var(--gradient-sunny)',
				'gradient-cloudy': 'var(--gradient-cloudy)',
				'gradient-rainy': 'var(--gradient-rainy)',
				'gradient-snowy': 'var(--gradient-snowy)',
				'gradient-stormy': 'var(--gradient-stormy)',
				'gradient-sunny-day': 'var(--gradient-sunny-day)',
				'gradient-cloudy-day': 'var(--gradient-cloudy-day)',
				'gradient-rainy-day': 'var(--gradient-rainy-day)',
				'gradient-snowy-day': 'var(--gradient-snowy-day)',
				'gradient-stormy-day': 'var(--gradient-stormy-day)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'rain-drop': {
					'0%': {
						transform: 'translateY(-100vh) rotate(10deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(100vh) rotate(10deg)',
						opacity: '0'
					}
				},
				'cloud-move': {
					'0%': { transform: 'translateX(-100px)' },
					'100%': { transform: 'translateX(calc(100vw + 100px))' }
				},
				'snow-fall': {
					'0%': {
						transform: 'translateY(-100vh) rotate(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(100vh) rotate(360deg)',
						opacity: '0'
					}
				},
				'lightning': {
					'0%, 90%, 100%': { opacity: '0' },
					'5%, 10%': { opacity: '1' }
				},
				'sun-rays': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'rain-drop': 'rain-drop 1s linear infinite',
				'cloud-move': 'cloud-move 20s linear infinite',
				'snow-fall': 'snow-fall 3s linear infinite',
				'lightning': 'lightning 2s infinite',
				'sun-rays': 'sun-rays 20s linear infinite',
				'fade-in': 'fade-in 0.6s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
