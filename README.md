# Abhisek Swain — Portfolio

Personal portfolio website built with **Node.js, Express, EJS and Bootstrap 5**.
All page content lives in JSON files inside the `data/` folder, so the site can be updated without touching any HTML.

## Run it

```bash
npm install
npm start          # http://localhost:3000
# or, with auto-reload while editing:
npm run dev
```

Requires Node.js 18 or newer.

## Project structure

```
abhisek-portfolio/
├── app.js                 # Express server setup
├── data/                  # ← all website content
│   ├── site.json          # name, email, navbar, social links, footer
│   ├── home.json          # hero, terminal card, stats, services, featured projects, CTA
│   ├── about.json         # bio, quick facts, experience, skills, approach
│   ├── portfolio.json     # filter categories + every project
│   └── contact.json       # email, topic shortcuts, availability
├── utils/dataLoader.js    # reads the JSON files
├── routes/
│   ├── pages.js           # /, /about, /portfolio, /portfolio/:slug, /contact
│   └── api.js             # /api, /api/:page, /api/portfolio/:slug
├── views/                 # EJS templates + partials
└── public/                # css/style.css, js/main.js
```

## Editing content

- JSON is read on every request, so changes show up after a browser refresh. No server restart needed.
- **Add a project:** copy an object in `data/portfolio.json`, give it a unique `slug`, and it gets its own page at `/portfolio/<slug>`. Put its `category` in the `categories` list so the filter button works.
- **Featured on home:** list project slugs in `featuredProjects` in `data/home.json`.
- **Live / GitHub links:** fill `liveUrl` and `repoUrl` on a project and the buttons appear automatically.
- **Social links:** fill the `url` for GitHub / LinkedIn in `data/site.json`. Empty URLs are hidden.
- Icons use [Bootstrap Icons](https://icons.getbootstrap.com/) class names (e.g. `bi-camera`).

## Contact page

There is no form. Every button is a `mailto:` link to **swainabhishek914@gmail.com**. The topic cards open the visitor's email app with the subject and a starter message already filled in, and there are "Copy address" and "Open in Gmail" buttons too.

## JSON API

| Endpoint | Returns |
|---|---|
| `GET /api` | list of endpoints |
| `GET /api/home` (about, portfolio, contact, site) | that page's JSON |
| `GET /api/portfolio/:slug` | a single project |
