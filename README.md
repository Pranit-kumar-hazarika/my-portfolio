

# Pranit Kumar Hazarika Portfolio

This repository contains the redesigned personal portfolio website for Pranit Kumar Hazarika, a Computer Science student from Assam, India who works across web development, video editing, content creation, and digital art.

## Live site

https://pranittt.netlify.app/

## What is included

- Premium editorial-style landing page with a scrapbook-inspired creative aesthetic
- About section with personal story and creative identity
- Skills and tool sections for development and design work
- Featured project cards with modal detail views
- Creative showcase gallery with category filtering
- Contact form that opens a prefilled email draft
- Search-focused metadata, social sharing tags, structured data, and sitemap/robots configuration

## Run locally

Open `index.html` directly in a browser, or use a simple static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

This project is static and works well with Netlify, Vercel, GitHub Pages, or any static hosting provider. For Netlify, simply drag and drop the project root or connect the repository.

## Google Search Console

The site is prepared for Google Search Console with a canonical URL, index/follow directive, Person and WebSite structured data, `robots.txt`, and an XML sitemap. Search Console ownership verification must be completed from the Google account that will manage the property; no verification token is committed to this repository.

1. Deploy the site and confirm `https://pranittt.netlify.app/` is publicly accessible.
2. In [Google Search Console](https://search.google.com/search-console), add the URL-prefix property `https://pranittt.netlify.app/`.
3. Choose the **HTML file** verification method and put the Google-provided verification file in the site root. The current verification file is `google8442ef242bcab5a7.html`.
4. Return to Search Console and select **Verify**.
5. In **Sitemaps**, submit `https://pranittt.netlify.app/sitemap.xml`.
6. Use **URL Inspection** on the homepage and request indexing after the deployment is live.

Google decides when and whether to index a page; submitting a sitemap or requesting indexing does not guarantee inclusion or ranking.

## Key files

- `index.html` — page structure and SEO metadata
- `style.css` — visual redesign, layout, responsiveness, and animations
- `script.js` — scroll reveal, modal project previews, filtering, and contact form behavior
- `robots.txt` and `sitemap.xml` — crawler guidance and the canonical homepage URL

## Connect

- GitHub: https://github.com/Pranit-kumar-hazarika
- LinkedIn: https://www.linkedin.com/in/pranit-kumar-hazarika-64302937a/
- Instagram: https://www.instagram.com/pranittttt._/
