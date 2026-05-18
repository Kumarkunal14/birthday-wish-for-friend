/* ============================================================
   CONFIG.JS — The only file you need to edit!
   ============================================================
   Personalise every section below, then follow README.md
   to deploy your site free on GitHub Pages.
   ============================================================ */

const CONFIG = {

  // ─── Names ─────────────────────────────────────────────────────────────────
  senderName:  "Your Name",      // Your name — shown in the poem signature & letter closing
  partnerName: "Her Name",       // Her full name — typed on the landing screen
  nickname:    "Sweetheart",     // Nickname — used in headings across the site

  // ─── Song ──────────────────────────────────────────────────────────────────
  // Get the YouTube video ID from the URL: youtube.com/watch?v=PASTE_ID_HERE
  song: {
    title:      "Song Title",
    artist:     "Artist Name",
    youtubeId:  "WikAeXGsmHY",             // default: Love Story – Indila
    lyricQuote: '"A lyric or quote that captures why this is your song. 💕"',
  },

  // ─── Gallery ───────────────────────────────────────────────────────────────
  // Drop your files into assets/gallery/ and list them here.
  // Photos: any web-safe image (.jpg .jpeg .png .gif .webp)
  // Videos: .mp4 or .webm  (comment out the video section if you have none)
  photos: [
    { url: "assets/gallery/photo1.svg", caption: "Every moment with you 🌸" },
    { url: "assets/gallery/photo2.svg", caption: "My favourite smile 💕" },
    { url: "assets/gallery/photo3.svg", caption: "You make life beautiful ✨" },
    { url: "assets/gallery/photo4.svg", caption: "Golden hours with you 🌅" },
    { url: "assets/gallery/photo5.svg", caption: "Together is my favourite place 💖" },
    { url: "assets/gallery/photo6.svg", caption: "My whole world 🌍" },
  ],
  videos: [
    // { url: "assets/gallery/video1.mp4", caption: "A moment I never want to forget 🎥" },
  ],

  // ─── Poem ──────────────────────────────────────────────────────────────────
  // Each stanza is a string. Use <br> for line breaks inside a stanza.
  // Add or remove stanza strings freely.
  poem: {
    title:     "You Are My World",
    signature: "— Forever yours 💍",
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

      `Happy Birthday, my love —<br>
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
      { text: "Do you feel deeply loved today? 💕",      message: "You are — more than words can say! 💖" },
      { text: "Is today going to be amazing? 🎂",        message: "It absolutely is! 🎉" },
      { text: "Are you the most special person? ✨",      message: "Without a single doubt! ✨" },
      { text: "Are you loved more than you know? 💖",    message: "Infinitely more! 💕" },
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
      { cls: "letter-date",    text: "Written with all my love, on your special day 🌸" },
      { cls: "",               text: "My dearest Sweetheart," },
      { cls: "",               text: "Today is your birthday, and I want the whole world to know how much you mean to me." },
      { cls: "",               text: "You bring colour to every ordinary day. You make me laugh when nothing else can. You are the reason small moments feel worth remembering." },
      { cls: "",               text: "Thank you for being exactly who you are — never change." },
      { cls: "",               text: "May today be as beautiful as every day you have made for me. May every dream you carry quietly in your heart find its way to you." },
      { cls: "letter-closing", text: "Happy Birthday, my love. You are my whole world. 💕" },
    ],
  },

};
