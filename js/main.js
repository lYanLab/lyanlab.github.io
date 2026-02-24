// Simple lightbox
function createLightbox() {
  const lb = document.createElement("div");
  lb.id = "lightbox";
  lb.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,15,46,0.95);display:none;align-items:center;justify-content:center;z-index:1000;";
  lb.innerHTML = `<img id="lb-img" style="max-width:90%;max-height:90%;border:1px solid #C375FF;border-radius:4px;">`;
  document.body.appendChild(lb);

  lb.addEventListener("click", () => (lb.style.display = "none"));
}

createLightbox();

// Example: click any gallery img → open lightbox
document.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.closest("#gallery-grid")) {
    document.getElementById("lb-img").src = e.target.src;
    document.getElementById("lightbox").style.display = "flex";
  }
});
