import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--bg-0))',
        foreground: 'hsl(var(--foreground))',
        level: {
          0: 'hsl(var(--bg-0) / <alpha-value>)',
          1: 'hsl(var(--bg-1) / <alpha-value>)',
        },
        primary: {
          weakest: 'hsl(var(--primary-weakest) / <alpha-value>)',
          weaker: 'hsl(var(--primary-weaker) / <alpha-value>)',
          weak: 'hsl(var(--primary-weak) / <alpha-value>)',
          base: 'hsl(var(--primary-base) / <alpha-value>)',
          strong: 'hsl(var(--primary-strong) / <alpha-value>)',
          stronger: 'hsl(var(--primary-stronger) / <alpha-value>)',
          strongest: 'hsl(var(--primary-strongest) / <alpha-value>)',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          weakest: 'hsl(var(--destructive-weakest) / <alpha-value>)',
          weaker: 'hsl(var(--destructive-weaker) / <alpha-value>)',
          weak: 'hsl(var(--destructive-weak) / <alpha-value>)',
          base: 'hsl(var(--destructive-base) / <alpha-value>)',
          strong: 'hsl(var(--destructive-strong) / <alpha-value>)',
          stronger: 'hsl(var(--destructive-stronger) / <alpha-value>)',
          strongest: 'hsl(var(--destructive-strongest) / <alpha-value>)',
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        warning: {
          weakest: 'hsl(var(--warning-weakest) / <alpha-value>)',
          weaker: 'hsl(var(--warning-weaker) / <alpha-value>)',
          weak: 'hsl(var(--warning-weak) / <alpha-value>)',
          base: 'hsl(var(--warning-base) / <alpha-value>)',
          strong: 'hsl(var(--warning-strong) / <alpha-value>)',
          stronger: 'hsl(var(--warning-stronger) / <alpha-value>)',
          strongest: 'hsl(var(--warning-strongest) / <alpha-value>)',
          foreground: 'hsl(var(--warning-foreground))',
        },
        success: {
          weakest: 'hsl(var(--success-weakest) / <alpha-value>)',
          weaker: 'hsl(var(--success-weaker) / <alpha-value>)',
          weak: 'hsl(var(--success-weak) / <alpha-value>)',
          base: 'hsl(var(--success-base) / <alpha-value>)',
          strong: 'hsl(var(--success-strong) / <alpha-value>)',
          stronger: 'hsl(var(--success-stronger) / <alpha-value>)',
          strongest: 'hsl(var(--success-strongest) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        neutral: {
          weakest: 'hsl(var(--neutral-weakest) / <alpha-value>)',
          weaker: 'hsl(var(--neutral-weaker) / <alpha-value>)',
          weak: 'hsl(var(--neutral-weak) / <alpha-value>)',
          base: 'hsl(var(--neutral-base) / <alpha-value>)',
          strong: 'hsl(var(--neutral-strong) / <alpha-value>)',
          stronger: 'hsl(var(--neutral-stronger) / <alpha-value>)',
          strongest: 'hsl(var(--neutral-strongest) / <alpha-value>)',
        },
        semantic: {
          destructive: {
            DEFAULT: 'hsl(var(--destructive-base) / <alpha-value>)',
            soft: 'hsl(var(--destructive-weakest) / <alpha-value>)',
            strong: 'hsl(var(--destructive-strong) / <alpha-value>)',
            foreground: 'hsl(var(--destructive-foreground))',
          },
          warning: {
            DEFAULT: 'hsl(var(--warning-base) / <alpha-value>)',
            soft: 'hsl(var(--warning-weakest) / <alpha-value>)',
            strong: 'hsl(var(--warning-strong) / <alpha-value>)',
            foreground: 'hsl(var(--warning-foreground))',
          },
          success: {
            DEFAULT: 'hsl(var(--success-base) / <alpha-value>)',
            soft: 'hsl(var(--success-weakest) / <alpha-value>)',
            strong: 'hsl(var(--success-strong) / <alpha-value>)',
            foreground: 'hsl(var(--success-foreground))',
          },
        },
        brand: {
          navy: 'hsl(var(--primary-strongest) / <alpha-value>)',
          amber: 'hsl(var(--warning-base) / <alpha-value>)',
        },
        state: {
          critical: 'hsl(var(--destructive-base) / <alpha-value>)',
          'critical-bg': 'hsl(var(--destructive-weakest) / <alpha-value>)',
          'at-risk': 'hsl(var(--warning-base) / <alpha-value>)',
          'at-risk-bg': 'hsl(var(--warning-weakest) / <alpha-value>)',
          enrolled: 'hsl(var(--primary-base) / <alpha-value>)',
          'enrolled-bg': 'hsl(var(--primary-weaker) / <alpha-value>)',
          compliant: 'hsl(var(--success-base) / <alpha-value>)',
          'compliant-bg': 'hsl(var(--success-weakest) / <alpha-value>)',
          expired: 'hsl(var(--neutral-base) / <alpha-value>)',
          'expired-bg': 'hsl(var(--neutral-weakest) / <alpha-value>)',
        },
        score: {
          high: 'hsl(var(--success-base) / <alpha-value>)',
          'high-bg': 'hsl(var(--success-weakest) / <alpha-value>)',
          mid: 'hsl(var(--warning-base) / <alpha-value>)',
          'mid-bg': 'hsl(var(--warning-weakest) / <alpha-value>)',
          low: 'hsl(var(--destructive-base) / <alpha-value>)',
          'low-bg': 'hsl(var(--destructive-weakest) / <alpha-value>)',
        },
        wire: {
          bg: 'hsl(var(--neutral-weaker) / <alpha-value>)',
          card: 'hsl(var(--neutral-weakest) / <alpha-value>)',
          border: 'hsl(var(--neutral-weaker) / <alpha-value>)',
          muted: 'hsl(var(--neutral-weak) / <alpha-value>)',
          text: 'hsl(var(--neutral-stronger) / <alpha-value>)',
          label: 'hsl(var(--neutral-strong) / <alpha-value>)',
        },
      },
      fontSize: {
        xs: '11px',
        sm: '12.5px',
        base: '15px',
        lg: '21px',
        xl: '26px',
        '2xl': '38px',
      },
      fontFamily: {
        display: ['var(--font-display)', 'TikTok Sans', 'sans-serif'],
        body: ['var(--font-display)', 'TikTok Sans', 'sans-serif'],
        mono: ['var(--font-display)', 'TikTok Sans', 'sans-serif'],
        heading: ['var(--font-display)', 'TikTok Sans', 'sans-serif'],
      },
      boxShadow: {
        sm:
          '0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)',
        DEFAULT: '0 8px 30px rgb(0 0 0 / 0.06)',
        md: '0px 0px 0px 1px rgba(0,0,0,0.06), 0px 1px 1px -0.5px rgba(0,0,0,0.06), 0px 3px 3px -1.5px rgba(0,0,0,0.06), 0px 6px 6px -3px rgba(0,0,0,0.06), 0px 12px 12px -6px rgba(0,0,0,0.06), 0px 24px 24px -12px rgba(0,0,0,0.06)',
        lg: '0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1)',
        xl: '0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
}

export default config
