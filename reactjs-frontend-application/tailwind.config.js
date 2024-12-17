/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			customColor: '#123456',
  			secondary: '#595959',
  			primary: '#004164',
			'gray-1100': '#F8F8F9',
			'blue-1100': '#28698c',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontSize: {
  			xxs: '10px'
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		scale: {
  			'75': '.75'
  		},
  		screens: {
  			xs: '320px',
  			'2xl': '1400px',
  			sm: '576px',
  			md: '768px',
  			lg: '992px',
  			xl: '1200px',
  			'3xl': '1600px'
  		},
  		width: {
  			inherit: 'inherit'
  		}
  	},
  	boxShadow: {
  		'custom-shadow': '0 4px 30px rgba(100, 186, 224, 0.3)'
  	}
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".webkit-fill-available-width": {
            width: "-webkit-fill-available",
          },
          ".webkit-fill-available-height": {
            height: "-webkit-fill-available",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};

