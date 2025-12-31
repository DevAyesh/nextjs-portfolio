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

## Contact form email (Gmail SMTP)
Create `.env.local` with:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
CONTACT_TO=your_email@gmail.com
```

**Setup Gmail App Password:**
1. Enable 2-Step Verification on your Google Account
2. Go to: Google Account → Security → 2-Step Verification → App passwords
3. Generate an app password for "Mail"
4. Use the 16-character password as `SMTP_PASS`

**Important:** Use the app password, NOT your regular Gmail password.

Restart the dev server after changing env vars.

**For Vercel deployment:** Add all 5 variables as Environment Variables in Project Settings → Redeploy.

## Deployment
Standard Next.js static/server deployment. For Vercel, push the repo and import the project; default settings work out of the box.
