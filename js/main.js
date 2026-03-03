// Lightbox for images AND videos
function createLightbox() {
  const lb = document.createElement("div");
  lb.id = "lightbox";
  lb.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.96);display:none;align-items:center;justify-content:center;z-index:2000;backdrop-filter:blur(8px);";
  lb.innerHTML = `
    <div style="position:relative;max-width:92%;max-height:92%;">
      <div id="lb-content"></div>
      <div onclick="document.getElementById('lightbox').style.display='none'" style="position:absolute;top:-20px;right:-20px;color:#fff;font-size:32px;cursor:pointer;">×</div>
    </div>
  `;
  document.body.appendChild(lb);
}

createLightbox();

document.addEventListener("click", (e) => {
  if (
    e.target.tagName === "IMG" &&
    e.target.closest(".gallery-grid, .pinned-hero")
  ) {
    const src = e.target.src;
    const content = document.getElementById("lb-content");
    content.innerHTML = `<img src="${src}" style="max-width:100%;max-height:90vh;border-radius:8px;">`;
    document.getElementById("lightbox").style.display = "flex";
  }

  if (
    e.target.tagName === "VIDEO" &&
    e.target.closest(".gallery-grid, .pinned-hero")
  ) {
    const src = e.target.src;
    const content = document.getElementById("lb-content");
    content.innerHTML = `<video src="${src}" controls autoplay style="max-width:100%;max-height:90vh;border-radius:8px;"></video>`;
    document.getElementById("lightbox").style.display = "flex";
  }
});
