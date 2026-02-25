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
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
        admin: {
          sidebar: 'hsl(var(--primary-strongest) / <alpha-value>)',
          'sidebar-hover': 'hsl(var(--primary-stronger) / <alpha-value>)',
          surface: 'hsl(var(--neutral-weaker) / <alpha-value>)',
          card: 'hsl(var(--neutral-weakest) / <alpha-value>)',
          border: 'hsl(var(--neutral-weaker) / <alpha-value>)',
          'border-strong': 'hsl(var(--neutral-weak) / <alpha-value>)',
          heading: 'hsl(var(--neutral-strongest) / <alpha-value>)',
          body: 'hsl(var(--neutral-stronger) / <alpha-value>)',
          muted: 'hsl(var(--neutral-strong) / <alpha-value>)',
          faint: 'hsl(var(--neutral-base) / <alpha-value>)',
        },
        state: {
          critical: 'hsl(var(--destructive-base) / <alpha-value>)',
          'critical-bg': 'hsl(var(--destructive-weakest) / <alpha-value>)',
          'at-risk': 'hsl(var(--warning-strong) / <alpha-value>)',
          'at-risk-bg': 'hsl(var(--warning-weakest) / <alpha-value>)',
          enrolled: 'hsl(var(--primary-strong) / <alpha-value>)',
          'enrolled-bg': 'hsl(var(--primary-weaker) / <alpha-value>)',
          compliant: 'hsl(var(--success-strong) / <alpha-value>)',
          'compliant-bg': 'hsl(var(--success-weakest) / <alpha-value>)',
          expired: 'hsl(var(--neutral-base) / <alpha-value>)',
          'expired-bg': 'hsl(var(--neutral-weakest) / <alpha-value>)',
        },
        score: {
          high: 'hsl(var(--success-strong) / <alpha-value>)',
          'high-bg': 'hsl(var(--success-weakest) / <alpha-value>)',
          mid: 'hsl(var(--warning-strong) / <alpha-value>)',
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
      fontFamily: {
        display: ['var(--font-display)', 'DM Sans', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
        heading: ['var(--font-display)', 'DM Sans', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
        modal: '0 20px 60px -10px rgba(0,0,0,0.25)',
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
