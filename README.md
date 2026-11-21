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

## Hero showreel video
The hero video uses the YouTube link supplied for this portfolio:
- https://youtu.be/LsM6JlXAsaA
- Embedded through the privacy-enhanced `youtube-nocookie.com` player.
- The embed fills the 16:9 hero card and receives a slight centered crop to hide tiny edge mattes.
- YouTube's own playback UI/branding may still appear inside the iframe; YouTube does not allow a third-party page to completely remove it.

To use a completely brand-free player instead, replace the embed with an exported MP4 that you own and host.

## Notes
- Fonts are loaded from Google Fonts; a system font fallback is provided.
- The project is static and can be hosted on GitHub Pages for free.
- Interaction sounds are subtle synthesized tones and only play after a user click, subject to browser audio permissions.
- The custom cursor is disabled on touch devices. Reduced-motion preferences are respected.
- Project visual panels are designed placeholders, not real client footage. Replace them with thumbnails or video embeds when your project links are ready.


## V7 interaction polish
- Removes the thin outer matte around the embedded video with a very slight centered crop.
- Adds subtle cursor-follow tilt and soft highlight to the hero video, all four selected-work visuals, and all package cards.
- Keeps the existing YouTube audio controls and mobile layout; pointer effects are disabled on touch devices.


## V8 custom video player
- Replaces the YouTube iframe with a brand-free HTML5 MP4 player.
- Includes custom play/pause, seek, time display, volume, mute and fullscreen controls.
- Requires your own exported file at `assets/showreel.mp4`; the source MP4 was not included.


## V10 YouTube showreel update
- Replaces the empty MP4 placeholder with the supplied YouTube showreel link.
- Removes the "Add your showreel video" overlay and the nonfunctional custom MP4 controls.
- Uses a rounded 16:9 edge-to-edge embed with a subtle crop to conceal thin outer matte edges.
