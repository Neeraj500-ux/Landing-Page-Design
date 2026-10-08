# Landing Page for Coaches, Consultants & Trainers

Single-page site built with React + Vite + Tailwind CSS. Brand placeholder: "Your Brand Name".

## Run
```bash
npm install
npm run dev        # http://localhost:5173
```
## Build
```bash
npm run build      # outputs to dist/
npm run preview    # optional: preview the build
```
## Customise
- Copy: `src/data.js` and `src/components/*`
- Brand colours/fonts: `tailwind.config.js`
- Images: `public/images/` (replace files, keep names, or update paths in components). The bundled images are concept illustrations (SVG) - swap in your own photos/screenshots.
- Form: `src/components/Contact.jsx` (`submit` currently shows a thank-you message; connect your backend, CRM or email service there).
