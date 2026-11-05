# Pranit Kumar Hazarika

Personal portfolio: https://pranittt.netlify.app/

## Run locally

```bash
python -m http.server 8000
```

Open http://localhost:8000.

The contact form sends inquiries through a Netlify Function using Gmail SMTP. Before deploying:

1. Enable 2-Step Verification on the Gmail account that will send the mail and create a Google App Password. Enter the App Password without its display spaces.
2. In Netlify, open **Site configuration → Environment variables** and add `GMAIL_USER` (the sending Gmail address), `GMAIL_APP_PASSWORD` (the App Password), and `INQUIRY_TO` (`pranitkumarhazarika09@gmail.com`).
3. Deploy the site. Keep the App Password private and never add it to the repository.

Replies to inquiry emails go to the visitor's email address.

## Search engines

- Sitemap: https://pranittt.netlify.app/sitemap.xml
- Search Console verification: `google8442ef242bcab5a7.html`
