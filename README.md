# Bengali Traditional Wedding Invitation — GitHub Pages Ready

এটি একটি mobile-first Bengali traditional digital wedding invitation starter project.

## Folder structure
- `index.html` — main page
- `css/style.css` — all UI/animation styling
- `js/config.js` — **সবচেয়ে গুরুত্বপূর্ণ edit file**: নাম, তারিখ, Maps link, image paths, hyperlinks
- `js/app.js` — interactions, countdown, music, RSVP demo
- `assets/` — প্রতিটি visual আলাদা ফাইল; যেকোনো SVG/PNG/JPG দিয়ে replace করা যাবে
- `assets/wedding-music.wav` — original lightweight instrumental demo

## Guest personalization
WhatsApp link example:
`https://YOUR-USERNAME.github.io/YOUR-REPO/?guest=Rahul%20Saha`

বাংলায়:
`?guest=রাহুল%20সাহা`

## Image replacement
`js/config.js`-এ asset path বদলান, অথবা একই filename-এর নতুন image বসিয়ে দিন।

Example:
```js
assets: {
  couple: "assets/my-couple.jpg"
}
```

HTML-এর individual `<a class="art-link">...</a>` wrappers থাকার কারণে প্রতিটি visual আলাদাভাবে hyperlink করা যায়।

## RSVP
বর্তমান version-এ RSVP browser `localStorage`-এ demo হিসেবে save হয়। GitHub Pages static হওয়ায় সব guest-এর response এক জায়গায় জমাতে পরে Formspree, Google Apps Script, Supabase বা Firebase backend লাগবে।

## GitHub Pages
1. Repository তৈরি করুন
2. এই project-এর সব file upload করুন
3. Settings → Pages → Deploy from branch
4. Branch: `main`, folder: `/root`
5. Save

তারপর GitHub একটি public URL দেবে।

## Important
Reference screenshot-এর layout/feeling থেকে inspiration নেওয়া হয়েছে, কিন্তু bundled illustrations নতুন করে তৈরি করা editable vector assets। Production launch-এর আগে নিজের couple photos, exact venue, dates, music এবং real RSVP backend বসিয়ে নিন.
