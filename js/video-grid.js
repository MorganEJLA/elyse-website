// js/video-grid.js
(() => {
  // Handles ANY number of .video-grid sections on the page (one per project)
  const grids = document.querySelectorAll(".video-grid");
  if (!grids.length) return; // bail if none present

  grids.forEach((grid) => {
    const tiles = grid.querySelectorAll(".video-tile");

    tiles.forEach((tile) => {
      const videoId = tile.dataset.videoId;
      const caption = tile.dataset.caption;

      if (!videoId) return;

      const media = document.createElement("div");
      media.className = "video-media";

      const thumb = document.createElement("div");
      thumb.className = "video-thumb";
      thumb.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;

      const playBtn = document.createElement("button");
      playBtn.className = "video-play";
      playBtn.setAttribute("aria-label", "Play video");
      playBtn.innerHTML = "&#9658;";

      media.appendChild(thumb);
      media.appendChild(playBtn);
      tile.innerHTML = "";
      tile.appendChild(media);

      if (caption) {
        const captionEl = document.createElement("div");
        captionEl.className = "video-caption";
        captionEl.textContent = caption;
        tile.appendChild(captionEl);
      }

      media.addEventListener(
        "click",
        () => {
          const iframe = document.createElement("iframe");
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
          iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;

          media.innerHTML = "";
          media.appendChild(iframe);
          media.style.cursor = "default";
        },
        { once: true },
      );
    });
  });
})();
