## Portfolio (Next.js)

Single-page portfolio built with Next.js App Router, React 19, and Framer Motion, with static assets served from `public/`. A legacy static prototype also lives in `_legacy/`.

## Project structure
```
.
├── app/                     # Next.js app router
│   ├── components/          # Reusable UI blocks
│   │   ├── TechOrbit.js
│   │   └── TechTree.js
│   ├── globals.css          # Base styles
│   ├── globals-fixed.css    # Optional global overrides
│   ├── layout.js            # Root layout
│   ├── page.js              # Landing page
│   └── page.module.css      # Page-scoped styles
├── public/                  # Static assets
│   ├── images/              # Profile & project thumbnails
│   ├── globe.svg, file.svg, window.svg, next.svg, vercel.svg
│   └── favicon.ico
├── _legacy/                 # Old static HTML prototype
├── next.config.mjs          # Next.js config
├── eslint.config.mjs        # ESLint config
├── jsconfig.json            # Path/alias config
├── package.json             # Dependencies & scripts
└── package-lock.json
```

## Tech stack
- Next.js 16 (App Router)
- React 19
- Framer Motion
- React Icons
- ESLint (Next.js config)

## Scripts
- `npm run dev` — start local dev server (default http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint

## Development
1) Install deps: `npm install`
2) Run dev server: `npm run dev`
3) Edit the landing page at `app/page.js`; adjust styles in `app/page.module.css` or globals in `app/globals.css`.

## Contact form email (SMTP)
Create `.env.local` with:
```
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
CONTACT_TO=destination_email@example.com
```
Restart the dev server after changing env vars.

## Deployment
Standard Next.js static/server deployment. For Vercel, push the repo and import the project; default settings work out of the box.
