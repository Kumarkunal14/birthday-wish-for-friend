# Birthday Wish Website 🎂💕

I built this website to wish my friend on her birthday. A fully animated, multi-page love letter in the browser. It went down so well that I decided to clean it up and share it, so anyone can fork it and make their own in minutes.

---

## Live Demo

See it in action here: https://kumarkunal14.github.io/Birthday-Wish-For-Your-Friend/

When you fork and customise, your link will be: `https://YOUR_USERNAME.github.io/Birthday-Wish-For-Your-friend/`

---

## What's Inside

| Page | What it does |
|------|-------------|
| 🎂 Landing | Typewriter name reveal, animated cake with blow-out candles |
| 💌 Poem | Scroll-reveal stanzas with particle effects |
| 🎵 Music | Vinyl record player wired to a YouTube embed |
| 📸 Gallery | Polaroid photo grid + optional video row with lightbox |
| 🎮 Quiz | Yes/No quiz — the No button runs away from the cursor 😄 |
| 💬 Letter | Animated personal letter with a wax-seal reveal |

---

## Quickstart — 3 steps

### 1. Fork & clone

Click **Fork** at the top-right of this page, then clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/Birthday-Wish-For-Your-Girlfriend.git
cd Birthday-Wish-For-Your-Girlfriend
```

### 2. Customise `config.js`

Open **`config.js`** — it's the only file you need to edit. Fill in:

- **Names** — yours and hers
- **Song** — paste any YouTube video ID
- **Gallery** — drop photos/videos into `assets/gallery/` and list them
- **Poem** — write your own stanzas (use `<br>` for line breaks)
- **Quiz** — add your own yes/no questions
- **Letter** — write your paragraphs

> Every section has inline comments explaining exactly what each field does.

### 3. Add your photos

Place your photos in `assets/gallery/` and update the `photos` array in `config.js`:

```js
photos: [
  { url: "assets/gallery/photo1.jpg", caption: "Our first date 🌸" },
  { url: "assets/gallery/photo2.jpg", caption: "My favourite smile 💕" },
],
```

Supported formats: `.jpg` `.jpeg` `.png` `.gif` `.webp` (photos) · `.mp4` `.webm` (videos)

---

## Deploy on GitHub Pages (free)

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "personalised for her birthday"
   git push
   ```

2. Go to your repo on GitHub → **Settings** → **Pages**

3. Under **Branch**, select `main` and folder `/` (root), then click **Save**

4. Your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/Birthday-Wish-For-Your-friend/
   ```
   (GitHub takes about 1–2 minutes to build it the first time)

5. Send her the link! 🎁

---

## File Overview

```
├── config.js        ← Edit this — all personalisation lives here
├── index.html       ← Page structure (no need to touch)
├── style.css        ← All styles (no need to touch)
├── animations.js    ← Particles, petals, confetti (no need to touch)
├── poem.js          ← Reads poem from config.js
├── quiz.js          ← Reads quiz from config.js
├── main.js          ← Navigation, gallery, letter, music
└── assets/
    ├── heart.svg           ← Favicon
    └── gallery/            ← Drop your photos & videos here
        ├── photo1.svg      ← Replace these with your own images
        └── ...
```

---

## Tips

- **No code knowledge needed** — `config.js` is plain English with comments.
- **Mobile-friendly** — works on phones and tablets out of the box.
- **No build step, no dependencies** — plain HTML/CSS/JS, open `index.html` directly in a browser to preview locally.
- **YouTube video ID** — grab it from the URL: `youtube.com/watch?v=`**`THIS_PART`**

---

## License

MIT — free to use, modify, and share. A star on the repo is always appreciated! 💕
