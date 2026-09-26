function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function soundcloudEmbed(url) {
  const clean = new URL(url);
  const track = clean.origin + clean.pathname; // drops ?utm_source=... etc
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(track)}&auto_play=true&visual=true`;
}

function renderVideoTile(item) {
  if (item.type === "divider") {
    return el("div", "sec-h", item.label);
  }

  const tile = el("div", "video-tile");
  tile.dataset.caption = item.caption || "";

  if (item.type === "youtube") {
    tile.dataset.videoId = item.id;
  } else if (item.type === "bandcamp") {
    tile.dataset.type = "bandcamp";
    tile.dataset.embedSrc = item.embedSrc;
    tile.dataset.thumb = item.thumb;
  } else if (item.type === "soundcloud") {
    tile.dataset.type = "soundcloud";
    tile.dataset.embedSrc = soundcloudEmbed(item.url);
    tile.dataset.thumb = item.thumb;
  }

  const thumb = el("div", "video-thumb");
  const playBtn = el("button", "video-play");
  playBtn.setAttribute(
    "aria-label",
    item.caption ? `Play ${item.caption}` : "Play",
  );
  playBtn.innerHTML = "&#9658;";

  tile.appendChild(thumb);
  tile.appendChild(playBtn);
  return tile;
}

const blockRenderers = {
  text: (block) => el("p", "", block.text),

  videoGrid: (block) => {
    const grid = el("div", "video-grid");
    block.items.forEach((item) => grid.appendChild(renderVideoTile(item)));
    return grid;
  },

  featured: (block) => {
    const wrap = el("div", "work-featured");

    const iframe = document.createElement("iframe");
    iframe.style.border = "0";
    iframe.style.width = `${block.width || 350}px`;
    iframe.style.height = `${block.height || 470}px`;
    iframe.src = block.embedSrc;
    iframe.setAttribute("seamless", "");

    const link = el("a", "", block.linkText);
    link.href = block.linkUrl;
    iframe.appendChild(link); // fallback content for the iframe

    const caption = el("div", "work-featured-caption");
    caption.appendChild(el("h2", "", block.title));
    caption.appendChild(document.createTextNode(block.description));

    wrap.appendChild(iframe);
    wrap.appendChild(caption);
    return wrap;
  },
};

async function renderProjects() {
  const mount = document.getElementById("projects");
  if (!mount) return;

  try {
    const res = await fetch("data/projects.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const projects = await res.json();

    projects.forEach((project) => {
      const tapeWrap = el("div", "tape-wrap");
      const shadowWrap = el("div", "tape-shadow-wrap");
      const header = el("div", "sec-h-subheader", project.name);
      header.appendChild(el("span", "sec-h-date", project.date));
      shadowWrap.appendChild(header);
      tapeWrap.appendChild(shadowWrap);
      mount.appendChild(tapeWrap);

      project.blocks.forEach((block) => {
        const render = blockRenderers[block.kind];
        if (render) mount.appendChild(render(block));
      });
    });

    initVideoGrids();
  } catch (err) {
    console.error("Could not load projects:", err);
    mount.textContent =
      "Projects couldn't load right now. Please try again later.";
  }
}

renderProjects();
