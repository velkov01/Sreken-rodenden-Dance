"use strict";

// Text follows Plan_za_rodenden.txt. Paths match the actual files in pictures/.
const slides = [
  { chapter: "17 Juli · Pocetokot", text: "Na 17 Juli prv pat te videh, ne znaejki kolku ke mi se promene cel zivot" },
  { chapter: "25 Juli · Prvata poraka", text: "Na 25 Juli ti pisah, ne bese najkreativna porakata mozelo e i podobro ama sepak prv cekor prema nesto najubavo so mi se e slucilo vo zivotot", photos: [["screenshot_od_razogovor_1.jpg", "Nasata prva poraka"]] },
  { chapter: "Do 5 nautro", text: "Uste prvata vecer ka pisaame do 5 uspea da me vooduseves" },
  { chapter: "Sekoja sledna vecer", text: "Pocnaame da izlevame i ne mozaah da docekam sekoja vecer da te vidam, ka te pitaah samo cekaah dali ke mi odgovores so slobodna sum", photos: [["screenshot_od_razogovor_2.jpg", "Nasite dogovori za gledanje"]] },
  { chapter: "Pokraj Dojran", text: "Od razgovorto so gi vodiime setajki pokraj taa pateka brzo sfatih oti na sekoo grnce imalo i kapace a vo mojot slucaj toa si ti", photos: [["dojran.avif", "Dojran, pokraj nasata pateka"]] },
  { chapter: "22 — 23 Avgust · Nie", text: "Pa vecerta od 22 prema 23 Avgust tocno na parkingo pod taa crkva te pitah za da bides so mene, duri i iznenadna muzika ima ka potvrdi :D", photos: [["dojran_crkva.jpg", "Crkvata vo Dojran"]] },
  { chapter: "Samo ti", text: "Koga i da se vidaame ne mozah da ti nagledam i prv pat usepah taka da te slikam", photos: [["slika_Dance_1.jpg", "Prvata fotografija od tebe"]] },
  { chapter: "6 Septemvri", text: "Taka dojde i vecerta 6 Septemvri i ovoj moment megju nas", photos: [["monte_cristo.png", "Nas moment vo Monte Cristo"]] },
  { chapter: "Tebe cuvam za kraj", text: "Nogo pesni ti ispeah, ama taa so ne ja znajah sega ako me biva kako programer treba da ode u pozadina celo vreme :D", photos: [["dino.jpg", "Dino"], ["od_ovoj_den.jpg", "Od ovoj den"], ["zeljko.jpg", "Zeljko"]] },
  { chapter: "Nasite spomeni", text: "Prvite sliki od nas, gi gledam sekoj den", photos: [["slika_nas_1.jpg", "Nasata prva zaednicka slika"], ["slika_nas_2.jpg", "Uste eden nas spomen"], ["slika_nas_3.jpg", "Nie dvajca"]] },
  { chapter: "Mi fales", text: "Sega sme taka i zal mi e so ne mozam da te gusnam za da ti cestitam rodenden i mi fales nogo", photos: [["slika_nas_4.png", "Zaedno i koga sme daleku"]] },
  { chapter: "Sreken rodenden ♡", text: "Sreken rodenden Nibbles, ti posakuvam se najubavo, da si ziva zdrava i sekojpat srekna!!!", photos: [["happy_birthday.png", "Sreken rodenden, Nibbles!"]] },
  { photos: [["prague.jpg", "Praga"]] }
];

const cover = document.getElementById("cover");
const album = document.getElementById("album");
const slide = document.getElementById("slide");
const scrollArea = document.getElementById("slide-scroll");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const music = document.getElementById("music");
const photoDialog = document.getElementById("photo-dialog");
let current = 0;
let opened = false;

function renderSlide() {
  const data = slides[current];
  slide.replaceChildren();
  slide.className = `${data.photos ? "" : "text-only"} ${current === slides.length - 1 ? "finale" : ""}`;
  slide.setAttribute("aria-label", `Stranica ${current + 1} od ${slides.length}`);
  if (data.chapter) {
    const chapter = document.createElement("p");
    chapter.className = "chapter";
    chapter.textContent = data.chapter;
    slide.append(chapter);
  }
  if (!data.photos) {
    const heart = document.createElement("div");
    heart.className = "ornament";
    heart.setAttribute("aria-hidden", "true");
    heart.textContent = "♡";
    slide.append(heart);
  }
  if (data.text) {
    const text = document.createElement("h2");
    text.className = "slide-text";
    text.textContent = data.text;
    slide.append(text);
  }
  if (data.photos) {
    const gallery = document.createElement("div");
    gallery.className = `gallery ${data.photos.length > 1 ? "multiple" : ""}`;
    for (const [file, description] of data.photos) {
      const button = document.createElement("button");
      button.className = "photo";
      button.setAttribute("aria-label", `Otvori: ${description}`);
      const img = document.createElement("img");
      img.src = `pictures/${file}`;
      img.alt = description;
      img.decoding = "async";
      button.append(img);
      button.addEventListener("click", () => {
        const full = document.getElementById("full-photo");
        full.src = img.src;
        full.alt = description;
        photoDialog.showModal();
      });
      gallery.append(button);
    }
    slide.append(gallery);
    const hint = document.createElement("p");
    hint.className = "photo-hint";
    hint.textContent = "Dopri ja slikata za da ja vidis odblisku";
    slide.append(hint);
  }
  previous.disabled = current === 0;
  next.textContent = current === slides.length - 1 ? "↺" : "→";
  next.setAttribute("aria-label", current === slides.length - 1 ? "Od pocetok" : "Sledna stranica");
  document.getElementById("page-count").innerHTML = `${String(current + 1).padStart(2, "0")} <span>/ ${slides.length}</span>`;
  document.getElementById("progress-fill").style.width = `${(current + 1) / slides.length * 100}%`;
  document.getElementById("progress").setAttribute("aria-valuenow", current + 1);
  document.getElementById("swipe-hint").textContent = current === slides.length - 1 ? "So ljubov, za tebe ♡" : "Povleci za sledniot spomen ↔";
  scrollArea.scrollTop = 0;
  // Restart the entrance animation without removing the persistent audio element.
  void slide.offsetWidth;
  slide.classList.add("enter");
  slide.focus({ preventScroll: true });
  // Warm the next slide's images, including on slower phone connections.
  for (const [file] of slides[current + 1]?.photos || []) {
    const image = new Image();
    image.src = `pictures/${file}`;
  }
}

function move(direction) {
  const target = current + direction;
  if (target < 0 || target >= slides.length) return;
  current = target;
  renderSlide();
}

document.getElementById("open-album").addEventListener("click", () => {
  // This must happen directly inside her tap for iPhone audio permission.
  music.volume = 0.65;
  music.play().catch(() => { /* Missing audio must never block her album. */ });
  cover.hidden = true;
  album.hidden = false;
  opened = true;
  renderSlide();
});
previous.addEventListener("click", () => move(-1));
next.addEventListener("click", () => {
  if (current === slides.length - 1) { current = 0; renderSlide(); }
  else move(1);
});
document.addEventListener("keydown", (event) => {
  if (!opened || photoDialog.open || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
  if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
});

let touchStart = null;
scrollArea.addEventListener("touchstart", (event) => {
  touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
}, { passive: true });
scrollArea.addEventListener("touchmove", (event) => {
  if (event.touches.length !== 1) touchStart = null;
}, { passive: true });
scrollArea.addEventListener("touchcancel", () => { touchStart = null; }, { passive: true });
scrollArea.addEventListener("touchend", (event) => {
  if (!touchStart || !event.changedTouches.length) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  touchStart = null;
  if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.6) move(dx < 0 ? 1 : -1);
}, { passive: true });
document.getElementById("close-photo").addEventListener("click", () => photoDialog.close());
