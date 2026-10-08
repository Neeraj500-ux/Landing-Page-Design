export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    fontFamily: { display: ['"Bricolage Grotesque"', 'sans-serif'], sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'] },
    colors: { ink: '#2B1245', cloud: '#F8F3FF', cobalt: '#6D35C9', amber: '#FF8A3D', mist: '#E6DAF7', sun: '#FFC93C' },
    boxShadow: { card: '0 1px 2px rgba(75,38,106,.05), 0 14px 36px -14px rgba(109,53,201,.28)' }
  } },
  plugins: []
}
