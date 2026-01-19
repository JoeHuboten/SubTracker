/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Typography-led design with distinctive font pairing
      fontFamily: {
        'display': ['var(--font-fraunces)', 'Georgia', 'serif'],
        'body': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'handwritten': ['var(--font-caveat)', 'cursive'],
      },
      // Color system - "Aurora Nights" theme
      // Deep space blues with vibrant aurora accents
      colors: {
        // Surfaces - deep cosmic backgrounds
        surface: {
          ground: '#0F172A',      // Deep midnight blue
          card: '#1E293B',         // Elevated slate
          raised: '#334155',       // Modal/popover
          desk: '#020617',         // Darkest navy
        },
        // Ink colors - cool ethereal tones
        ink: {
          primary: '#F1F5F9',      // Bright white-blue
          secondary: '#94A3B8',    // Soft blue-gray
          muted: '#64748B',        // Muted slate
        },
        // Accent colors - aurora magic
        accent: {
          focus: '#22D3EE',        // Electric cyan
          'focus-hover': '#06B6D4',
          warm: '#F472B6',         // Vibrant pink
          'warm-subtle': '#831843',
          glow: '#A78BFA',         // Soft purple
          gold: '#FBBF24',         // Warm amber
        },
        // Feedback colors - vivid but harmonious
        feedback: {
          caution: '#FBBF24',      // Bright amber
          'caution-bg': '#422006',
          alert: '#FB7185',        // Soft coral
          'alert-bg': '#4C0519',
          success: '#34D399',      // Mint green
          'success-bg': '#064E3B',
          info: '#60A5FA',         // Sky blue
          'info-bg': '#1E3A5F',
          danger: '#FB7185',
          'danger-bg': '#4C0519',
        },
      },
      // Spacing scale based on 8px base unit
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Border radius for soft, approachable feel
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'tag': '9999px',
      },
      // Box shadows for glowing depth
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 1px rgba(34, 211, 238, 0.1)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(34, 211, 238, 0.15)',
        'raised': '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 40px rgba(167, 139, 250, 0.1)',
        'stamp': '1px 1px 0 rgba(0, 0, 0, 0.3)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.4)',
        'glow-pink': '0 0 20px rgba(244, 114, 182, 0.4)',
        'glow-purple': '0 0 20px rgba(167, 139, 250, 0.4)',
      },
      // Animation for calm, purposeful motion
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'fade-in-up': 'fadeInUp 250ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      // Typography scale
      fontSize: {
        'xs': ['12px', { lineHeight: '1.5' }],
        'sm': ['14px', { lineHeight: '1.5' }],
        'base': ['16px', { lineHeight: '1.6' }],
        'lg': ['18px', { lineHeight: '1.5' }],
        'xl': ['22px', { lineHeight: '1.4' }],
        '2xl': ['28px', { lineHeight: '1.3' }],
        '3xl': ['36px', { lineHeight: '1.2' }],
        '4xl': ['48px', { lineHeight: '1.1' }],
      },
    },
  },
  plugins: [],
};
