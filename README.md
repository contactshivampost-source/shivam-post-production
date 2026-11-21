# SHIVAM POST — Portfolio Website

A responsive, Apple-inspired video editor portfolio built with plain HTML, CSS and JavaScript. No build tools or dependencies required.

## Preview locally
1. Download and unzip the project.
2. Open `index.html` in a modern browser.
3. For best results, use a local server (VS Code Live Server or `python3 -m http.server 8000`).

## Publish with GitHub Pages
1. Create a new GitHub repository, for example `shivam-post-portfolio`.
2. Upload **all files** from this folder (`index.html`, `style.css`, `script.js`, `README.md`) to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to publish. Your site URL will appear in the Pages settings.

## Personalize your links
Open `script.js`:
- Replace each `url: ""` in the `PROJECTS` object with the matching project video URL.
- Add your social profile URLs in the `SOCIALS` object.
- Project cards open a small modal until a URL is added.

## Update WhatsApp
The current WhatsApp link is set to `https://wa.me/9779713517297` based on the supplied Nepal number. If the number needs a different country code or digits, update the link in `index.html`.

## Update the intro video
The hero currently embeds the supplied YouTube video. To change it, replace the video ID in the iframe `src` in `index.html`.

## Notes
- Fonts are loaded from Google Fonts; a system font fallback is provided.
- The project is static and can be hosted on GitHub Pages for free.
- Interaction sounds are subtle synthesized tones and only play after a user click, subject to browser audio permissions.
- The custom cursor is disabled on touch devices. Reduced-motion preferences are respected.
- Project visual panels are designed placeholders, not real client footage. Replace them with thumbnails or video embeds when your project links are ready.
