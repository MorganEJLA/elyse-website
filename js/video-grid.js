(() => {
  const grids = document.querySelectorAll(".video-grid");
  if (!grids.length) return;

  const modal = document.getElementById("video-modal");
  const modalFrame = modal ? modal.querySelector(".video-modal-frame") : null;

  function openModal(type, videoId, embedSrc) {
    if (!modal || !modalFrame) return;

    modalFrame.innerHTML = ""; // clear any leftover iframe before adding a new one

    const iframe = document.createElement("iframe");

    if (type === "bandcamp") {
      iframe.src = embedSrc;
      iframe.style.border = "0";
      iframe.setAttribute("seamless", "");
    } else {
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
    }

    modalFrame.appendChild(iframe);
    modal.hidden = false;
  }

  function closeModal() {
    if (!modal || !modalFrame) return;
    modalFrame.innerHTML = "";
    modal.hidden = true;
  }

  if (modal) {
    modal
      .querySelector(".video-modal-close")
      ?.addEventListener("click", closeModal);
    modal
      .querySelector(".video-modal-backdrop")
      ?.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }

  grids.forEach((grid) => {
    const tiles = grid.querySelectorAll(".video-tile");

    tiles.forEach((tile) => {
      const type = tile.dataset.type || "youtube"; // default keeps old behavior untouched
      const videoId = tile.dataset.videoId;
      const embedSrc = tile.dataset.embedSrc;
      const thumbUrl = tile.dataset.thumb;
      const caption = tile.dataset.caption;

      if (type === "youtube" && !videoId) return;
      if (type === "bandcamp" && !embedSrc) return;

      const media = document.createElement("div");
      media.className = "video-media";

      const thumb = document.createElement("div");
      thumb.className = "video-thumb";
      thumb.style.backgroundImage =
        type === "bandcamp"
          ? `url(${thumbUrl})`
          : `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;

      const playBtn = document.createElement("button");
      playBtn.className = "video-play";
      playBtn.setAttribute("aria-label", "Play");
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

      media.addEventListener("click", () => {
        openModal(type, videoId, embedSrc);
      });
    });
  });
})();
