// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        'background-light': '#FFFFFF',
        'background-secondary': '#F0F3F7',
        'background-hover': '#F7F8F9',
        'background-card': '#E0E5EB',
        'background-alert': '#FEE3E3',
        'text-main': '#1F2939',
      },
      fontFamily: {
        primary: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        code: [
          'source-code-pro',
          'Menlo',
          'Monaco',
          'Consolas',
          "'Courier New'",
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
