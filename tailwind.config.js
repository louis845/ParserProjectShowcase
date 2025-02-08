module.exports = {
    purge: [],
    theme: {
      extend: {
        maxHeight: {
          '1/2': '50%',
          '50vh': '50vh',
          '30vh': '30vh',
          'full': '100%'
        },
        maxWidth: {
          '1/2': '50%',
          'full': '100%',
          'none': 'none',
        },
        width: {
          'auto': 'auto',
        },
        padding: {
          '5': '1.25rem',
        },
        display: ['hover', 'focus'],
      },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
    ],
  }