# OurSanctuary

A sanctuary I made for her 💜

A small website: plain HTML, CSS and JavaScript. Nothing to install and no build step.
Open `index.html` in a browser, or host the folder on any static host (GitHub Pages, Netlify, Vercel…).

## Folders

```
index.html            Home: greeting, page hub, counters, special dates, hidden note
story.html            Our Story: chapters with secret thoughts
gallery.html          Gallery: polaroids + photo viewer + "View my heart"
music.html            Music: Iris player, playlists, dedicate a song
open-when.html        Open When letters
plans.html            Our Future: bucket list, future home, date decider
vouchers.html         Love vouchers
garden.html           The Garden (full-screen day/night scene)
bouquet.html          Bouquet: the real bouquet + tulips with notes
cycle.html            Your Cycle

css/
  base.css            Colours, fonts, spacing (change the look of the whole site here)
  components.css      Shared pieces: top bar, cards, buttons, pop-ups, home hub
  pages/<page>.css    Styles used by only one page

js/
  common.js           Shared code: the list of pages, top bar, "Next" links, notifications
  pages/<page>.js     Code used by only one page

assets/
  images/             All photos (resized .jpg)
  audio/iris.mp3
```

## How do I…

**Change the words on a page?** Open the page's `.html` file and edit the text.
Some text lives in the page's script instead:
- Open When letters: `js/pages/open-when.js` (the `letters` object)
- Garden notes: `js/pages/garden.js`
- Bouquet notes and photo caption: top of `js/pages/bouquet.js` (look for `TODO`)
- Home greetings and special-date messages: `js/pages/home.js`
- Date ideas: `js/pages/plans.js`

**Add a photo to the gallery?** Put the `.jpg` in `assets/images/`, then copy one
`<div class="polaroid">…</div>` line in `gallery.html` and change the file name and caption.
Try to keep photos under ~1600px wide so the site stays fast on her phone.

**Add, rename or reorder a page?** Edit the `PAGES` list at the top of `js/common.js`.
It builds the home hub, every page's top bar and the "Next" link. A new page needs
`<body data-page="its-id">` and the same `<head>` lines as the other pages.

**Change the colours or fonts?** Edit the variables at the top of `css/base.css`.

**Change the anniversary, birthday or cycle dates?** `anniversary` and `birthDate` in
`js/pages/home.js`; `HARDCODED_START` and `CYCLE_LENGTH` in `js/pages/cycle.js`.

## Saved on her device

A few things are remembered in the browser on the device she uses
(they don't sync between phone and laptop): dedicated songs, bucket-list ticks,
and which Open When letters she has already opened.
