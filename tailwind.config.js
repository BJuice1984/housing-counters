module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        'background-main': '#F8F9FA',
        'background-light': '#FFFFFF',
        'background-secondary': '#F0F3F7',
        'background-hover': '#F7F8F9',
        'background-table': '#E0E5EB',
        'background-button': '#F2F5F8',
        'background-trash': '#FEE3E3',
        'text-main': '#1F2939',
        'text-table-head': '#697180',
      },
      fontFamily: {
        primary: [
          'Roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
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
      backgroundImage: {
        'cold-water': "url('/src/images/icon-cold-water.svg')",
        'hot-water': "url('/src/images/icon-hot-water.svg')",
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
