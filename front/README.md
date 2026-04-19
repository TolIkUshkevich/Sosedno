# Sosedno Landing

Static landing page for the Sosedno early access waitlist.

## Structure

- `index.html` - main landing page.
- `waitlist.html` - early access form page.
- `style.css` - shared landing and component styles.
- `waitlist.css` - waitlist page styles.
- `app.js` - navbar, animation, and demo waitlist interactions.
- `stitch_*.html` - design exports kept in git, excluded from Vercel deploy.

## Deploy

This is a static Vercel project. There is no build step.

Vercel uses `vercel.json` for clean URLs and security headers. `.vercelignore` keeps local/design-export files out of the production deployment.
