# Landing Page for Coaches, Consultants & Trainers

Single-page site built with React + Vite + Tailwind CSS. Brand placeholder: "Creative Crew".

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
- Form: `src/components/Contact.jsx`

## Appointment slot reservations

The form reserves a selected slot for 10 minutes. Other visitors' availability refreshes every 5 seconds, and the Apps Script confirms the reservation under a script lock before saving a booking. The success screen appears as soon as the Sheet confirms the booking; CRM and WhatsApp updates run in the background so they do not hold up the visitor.

1. Open the Apps Script project currently deployed at the URL configured as `FORM_ENDPOINT` in `src/components/Contact.jsx`.
2. Replace its server code with `apps-script/Code.gs` and save.
3. In **Deploy > Manage deployments**, edit the existing web app deployment, select **New version**, and deploy it. Keep the existing web app URL and access settings.
4. Open the web app URL with `?action=booked`. The JSON response should include `"reservationSupport":true`, plus `booked` and `reserved` arrays.

The frontend disables appointment selection if the deployed backend does not advertise reservation support. Do not remove the `Slot Key`, `Submission ID`, or `Form Stage` sheet columns; the script adds missing headers automatically.
