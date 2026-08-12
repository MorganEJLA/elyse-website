// Inquiry type selector

document.querySelectorAll(".inq-item").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".inq-item")
      .forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    document.getElementById("inquiry-type").value = item.textContent.trim();
  });
});
