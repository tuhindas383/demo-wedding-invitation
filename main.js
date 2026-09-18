/* ===== সব তথ্য এখানে বদলান — EDIT ALL CONTENT HERE ===== */
const weddingData={
  groomName:"[বরের নাম]", brideName:"[কনের নাম]",
  guestTitle:"শ্রীমান", guestName:"তুহিন",
  guests:{tuhin:"তুহিন", paritosh:"পরিতোষ"},          // ?guest=tuhin  /  ?guest=paritosh
  bengaliDate:"[বাংলা তারিখ]",
  groomFamily:"[বরের পিতা-মাতার নাম ও ঠিকানা]",
  brideFamily:"[কনের পিতা-মাতার নাম ও ঠিকানা]",
  hostFamily:"[নিমন্ত্রণকর্তার নাম]",
  events:{
    haldi:{name:"গায়ে হলুদ",date:"[তারিখ]",time:"[সময়]",place:"[স্থান]"},
    biye:{name:"শুভ বিবাহ",date:"[তারিখ]",time:"[লগ্ন / সময়]",place:"[স্থান]"},
    boubhaat:{name:"বৌভাত",date:"[তারিখ]",time:"[সময়]",place:"[স্থান]"},
    other:{name:"[অন্যান্য অনুষ্ঠান]",date:"[তারিখ]",time:"[সময়]",place:"[স্থান]"}
  },
  venueName:"[অনুষ্ঠানস্থলের নাম]", venueAddress:"[পূর্ণ ঠিকানা]",
  mapUrl:"https://www.google.com/maps/search/?api=1&query=EDIT+VENUE+NAME",
  musicUrl:"assets/music/wedding-music.mp3"
};
/* ===== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const g=new URLSearchParams(location.search).get('guest');
const guest=g?(weddingData.guests[g.toLowerCase()]||g):weddingData.guestName;
$$('[data-t]').forEach(e=>e.textContent=weddingData[e.dataset.t]);
$$('[data-guest]').forEach(e=>e.textContent=weddingData.guestTitle+' '+guest+',');
$$('.ev').forEach(e=>{const v=weddingData.events[e.dataset.ev];e.innerHTML=`<b>${v.date}</b><span>${v.time}</span><em>${v.place}</em>`});
$('#map').href=weddingData.mapUrl;
$$('.orn').forEach(e=>e.innerHTML='<svg viewBox="-50 -50 100 100"><use href="#fl"/></svg>');
$('#mnp').innerHTML=[...Array(12)].map((_,i)=>`<ellipse cy="-58" rx="9" ry="22" transform="rotate(${i*30})"/><circle cy="-88" r="2.5" transform="rotate(${i*30+15})" fill="currentColor"/>`).join('');
$('#sp').innerHTML=[...Array(7)].map((_,i)=>{const a=i*51.43*Math.PI/180;return`<use href="#fl" x="${Math.sin(a)*105-11}" y="${-Math.cos(a)*105-11}" width="22" height="22" style="color:#f3c65a"/>`}).join('');
/* torana: mango-leaf & marigold garland */
$$('.torana').forEach(el=>{let s='<svg viewBox="0 0 430 96"><path d="M0 8Q215 46 430 8" fill="none" stroke="#c9a24a" stroke-width="2"/>';
 for(let i=0;i<=10;i++){const t=i/10,x=t*430,y=(1-t)**2*8+2*t*(1-t)*46+t*t*8;
  s+=i%2?`<use href="#fl" x="${x-12}" y="${y-2}" width="24" height="24" style="color:#f08a1c" class="sw" />`:`<use href="#lf" x="${x-8}" y="${y}" width="16" height="42" style="color:#4f6b3a" class="sw" />`}
 el.innerHTML=s+'</svg>'});
/* petals */
$$('.petals').forEach(c=>{const cols=c.dataset.c.split(',');c.style.setProperty('--h',(c.parentElement.offsetHeight+40)+'px');
 for(let i=0;i<14;i++){const p=document.createElement('span'),z=7+Math.random()*7;
  p.style.cssText=`left:${Math.random()*100}%;width:${z}px;height:${z*1.4}px;--c:${cols[i%cols.length]};--dx:${(Math.random()-.5)*120}px;animation-duration:${8+Math.random()*8}s;animation-delay:-${Math.random()*14}s`;c.appendChild(p)}});
/* timeline */
$('#tl').innerHTML='<svg class="vine draw" viewBox="0 0 40 400" preserveAspectRatio="none"><path pathLength="1000" d="M20 0C40 50 0 100 20 150S0 250 20 300S40 350 20 400"/></svg>'+
 ['haldi','biye','boubhaat','other'].map((k,i)=>{const v=weddingData.events[k];return`<div class="ti rv" style="--i:${i}"><div class="tt"><strong>${v.name}</strong><small>${v.date}<br>${v.time}</small></div><div class="tm"><svg viewBox="-50 -50 100 100"><use href="#fl"/><circle r="22" fill="#8f1d16"/></svg><b>${'১২৩৪'[i]}</b></div></div>`}).join('');
/* scroll reveal + parallax */
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.2});
$$('.scene').forEach(s=>io.observe(s));
const px=$$('[data-p]');let tick=0;
addEventListener('scroll',()=>{if(tick)return;tick=requestAnimationFrame(()=>{tick=0;px.forEach(e=>{const r=e.getBoundingClientRect();e.style.transform=`translateY(${(r.top+r.height/2-innerHeight/2)*e.dataset.p}px)`})})},{passive:true});
/* music */
const au=new Audio(weddingData.musicUrl);au.loop=true;au.volume=.6;
const mb=$('#music'),setM=on=>mb.classList.toggle('play',on);
const startM=()=>au.play().then(()=>setM(1)).catch(()=>setM(0));
mb.onclick=()=>au.paused?startM():(au.pause(),setM(0));
/* entry seal */
$('#seal').onclick=()=>{$('#seal').classList.add('open');startM();
 setTimeout(()=>{$('#gate').classList.add('gone');document.body.classList.remove('locked');scrollTo(0,0)},1000);
 setTimeout(()=>$('#gate').remove(),2600)};
