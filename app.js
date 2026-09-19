(() => {
  const cfg = window.WEDDING_CONFIG;
  const $ = s => document.querySelector(s);
  const params = new URLSearchParams(location.search);
  const rawGuest = params.get("guest") || "";
  const guest = rawGuest ? decodeURIComponent(rawGuest).replace(/\+/g," ").trim() : "প্রিয় অতিথি";

  $("#guestName").textContent = guest;
  $("#welcomeGuest").textContent = guest === "প্রিয় অতিথি" ? "আপনাকে ও আপনার পরিবারকে" : `প্রিয় ${guest}, আপনাকে ও আপনার পরিবারকে`;

  // Apply replaceable assets and links from config.js
  $("#heroArtLink").href = cfg.links.heroLink;
  $("#heroArtLink img").src = cfg.assets.couple;
  $("#mapBtn").href = cfg.mapUrl;
  $("#bottomMap").href = cfg.mapUrl;
  document.querySelectorAll("[data-link-key]").forEach(el => {
    const key = el.dataset.linkKey;
    if (cfg.links[key]) el.href = cfg.links[key];
  });

  // Countdown
  const target = new Date(cfg.date).getTime();
  function countdown(){
    const now = Date.now(), d = Math.max(0, target-now);
    const days = Math.floor(d/86400000);
    const hrs = Math.floor(d%86400000/3600000);
    const mins = Math.floor(d%3600000/60000);
    const secs = Math.floor(d%60000/1000);
    $("#countdown").innerHTML = [["দিন",days],["ঘণ্টা",hrs],["মিনিট",mins],["সেকেন্ড",secs]]
      .map(([l,v])=>`<div class="unit"><b>${String(v).padStart(2,"0")}</b><small>${l}</small></div>`).join("");
  }
  countdown(); setInterval(countdown,1000);

  // Music
  const audio = $("#weddingMusic");
  const musicBtn = $("#musicBtn");
  let playing = false;
  async function toggleMusic(){
    try {
      if(audio.paused){ await audio.play(); playing=true; }
      else { audio.pause(); playing=false; }
      musicBtn.textContent = playing ? "🔊" : "♫";
    } catch(e) {
      musicBtn.textContent = "♫";
    }
  }
  musicBtn.addEventListener("click", toggleMusic);
  $("#enterBtn").addEventListener("click", async () => {
    $("#welcome").classList.add("hide");
    document.body.classList.remove("locked");
    await toggleMusic();
  });
  document.body.classList.add("locked");

  // Loader
  window.addEventListener("load",()=>setTimeout(()=>$("#loader").classList.add("hide"),350));

  // RSVP: demo localStorage. Replace this handler with Formspree / Google Apps Script / Supabase later.
  const form = $("#rsvpForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.createdAt = new Date().toISOString();
    data.guestLinkName = guest;
    const list = JSON.parse(localStorage.getItem("weddingRSVP") || "[]");
    list.push(data);
    localStorage.setItem("weddingRSVP", JSON.stringify(list));
    $("#formStatus").textContent = "ধন্যবাদ! আপনার উত্তরটি এই ডিভাইসে সংরক্ষিত হয়েছে।";
    form.reset();
  });

  // Smooth internal navigation
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if(id && id !== "#"){
        const el = document.querySelector(id);
        if(el){ e.preventDefault(); el.scrollIntoView({behavior:"smooth"}); }
      }
    });
  });
})();
