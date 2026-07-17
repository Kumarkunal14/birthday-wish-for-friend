/* ============================================================
   CONFIG.JS — The only file you need to edit!
   ============================================================
   Personalise every section below, then follow README.md
   to deploy your site free on GitHub Pages.
   ============================================================ */

const CONFIG = {

  // ─── Names ─────────────────────────────────────────────────────────────────
  senderName:  "Kumar kunal",      // Your name — shown in the poem signature & letter closing
  partnerName: "Devanshi",       // Her full name — typed on the landing screen
  nickname:    "Devanshi",     // Nickname — used in headings across the site

  // ─── Song ──────────────────────────────────────────────────────────────────
  // Get the YouTube video ID from the URL: youtube.com/watch?v=https://youtu.be/ZYQuFDlSg6E?si=fP9Ujq4SZK4Je6eg
  song: {
    title:      "Song Title",
    artist:     "Artist Name",
    youtubeId:  "ZYQuFDlSg6E",             // default: Love Story – Indila
    lyricQuote: '"A lyric or quote that captures why this is your song. 💕"',
  },

  // ─── Gallery ───────────────────────────────────────────────────────────────
  // Drop your files into assets/gallery/ and list them here.
  // Photos: any web-safe image (.jpg .jpeg .png .gif .webp)
  // Videos: .mp4 or .webm  (comment out the video section if you have none)
  photos: [
    { url: "assets/gallery/devanshi 1.jpeg", caption: "Every moment with you 🌸" },
    { url: "assets/gallery/devanshi 2.jpeg", caption: "My favourite smile 💕" },
    { url: "assets/gallery/devanshi 3.jpeg", caption: "You make life beautiful ✨" },
    { url: "assets/gallery/devanshi 4.jpeg", caption: "Golden hours with you 🌅" },
    { url: "assets/gallery/devanshi 5.jpeg", caption: " Favourite  💖" },
    { url: "assets/gallery/devanshi 6.jpeg", caption: "Charming Girl 🌍" },
  ],
  videos: [
    // { url: "assets/gallery/video1.mp4", caption: "A moment I never want to forget 🎥" },
  ],

  // ─── Poem ──────────────────────────────────────────────────────────────────
  // Each stanza is a string. Use <br> for line breaks inside a stanza.
  // Add or remove stanza strings freely.
  poem: {
    title:     "You Are charming girl💖",
    signature: "— Forever friends 💍",
    stanzas: [
      `In all the moments I have known,<br>
       no star shines brighter than your smile.<br>
       You turn every ordinary day<br>
       into something worth every mile.`,

      `You are the warmth inside the cold,<br>
       the calm that breaks the storm,<br>
       the voice that brings me back to peace,<br>
       the place that keeps me warm.`,

      `So on this day that's yours alone,<br>
       I want the whole world now to know:<br>
       that you are loved beyond all words —<br>
       more than I could ever show.`,

      `Happy Birthday, my Friend —<br>
       may every dream you hold come true,<br>
       and may every year that follows this<br>
       feel as beautiful as you.`,
    ],
  },

  // ─── Quiz ──────────────────────────────────────────────────────────────────
  quiz: {
    title:             "The Big Quiz! 🎀",
    completionText:    "You passed! 🎉",
    completionSubtext: "Already knew all the answers 💕",
    questions: [
      { text: "Do you feel deeply joyful today? 💕",      message: "You are — more than words can say! 💖" },
      { text: "Is today going to be amazing? 🎂",        message: "It absolutely is! 🎉" },
      { text: "Are you the most special person? ✨",      message: "Without a single doubt! ✨" },
      { text: "Are you loved this type of wish? 💖",    message: "Infinitely more! 💕" },
      { text: "Is this the best birthday wish ever? 🥺", message: "Made just for you! 🎁" },
    ],
  },

  // ─── Letter ────────────────────────────────────────────────────────────────
  // cls: 'letter-date'    → styled as the opening date line
  // cls: 'letter-closing' → styled as the sign-off
  // cls: ''               → regular body paragraph
  letter: {
    title: "A Letter Just For You 🌸",
    paragraphs: [
      { cls: "letter-date",    text: "Written with all my efforts, on your special day 🌸" },
      { cls: "",               text: "My dearest Devanshi," },
      { cls: "",               text: "Today is your birthday, and I want the whole world to know how much you mean to me." },
      { cls: "",               text: "You bring colour to every ordinary day. You make me laugh when nothing else can. You are the reason small moments feel worth remembering." },
      { cls: "",               text: "Thank you for being exactly who you are — never change." },
      { cls: "",               text: "May today be as beautiful as every day you have made for me. May every dream you carry quietly in your heart find its way to you." },
      { cls: "letter-closing", text: "Happy Birthday, my friend. You are a charming girl. 💕" },
    ],
  },

};
