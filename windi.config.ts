import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },

  preflight: {
    blocklist: 'h1 h2 h3 h4 h5 p',
  },

  theme: {
    extend: {
      gridTemplateColumns: {
        tc: 'repeat(auto-fit, minmax(8rem, 1fr))',
      },
      boxShadow: {
        boxShadowNeu: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
      screens: {
        phone: '580px',
      },
    },
  },

  plugins: [
    require('@windicss/plugin-animations')({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
      },
    }),
  ],
  attributify: true,
});
