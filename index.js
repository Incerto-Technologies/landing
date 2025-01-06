// initialization

const RESPONSIVE_WIDTH = 1024;

let headerWhiteBg = false;
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH;
const collapseBtn = document.getElementById("collapse-btn");
const collapseHeaderItems = document.getElementById("collapsed-header-items");

function onHeaderClickOutside(e) {
  if (!collapseHeaderItems.contains(e.target)) {
    toggleHeader();
  }
}

function toggleHeader() {
  if (isHeaderCollapsed) {
    // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
    collapseHeaderItems.classList.add("opacity-100");
    collapseHeaderItems.style.width = "60vw";
    collapseBtn.classList.remove("bi-list");
    collapseBtn.classList.add("bi-x", "max-lg:tw-fixed");
    isHeaderCollapsed = false;

    setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1);
  } else {
    collapseHeaderItems.classList.remove("opacity-100");
    collapseHeaderItems.style.width = "0vw";
    collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed");
    collapseBtn.classList.add("bi-list");
    isHeaderCollapsed = true;
    window.removeEventListener("click", onHeaderClickOutside);
  }
}

function responsive() {
  if (window.innerWidth > RESPONSIVE_WIDTH) {
    collapseHeaderItems.style.width = "";
  } else {
    isHeaderCollapsed = true;
  }
}

window.addEventListener("resize", responsive);

async function handleContactSubmit() {
  const email = document.getElementById("contact-email").value;

  await fetch("https://incerto.in/api/contact", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// Video modal functionality
const videoThumbnails = document.querySelectorAll(".video-thumbnail");
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");

videoThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    const videoSrc = thumbnail.querySelector("video").src;
    const title = thumbnail.parentElement
      .querySelector("h3")
      .textContent.trim();
    modalVideo.src = videoSrc;
    modalTitle.textContent = title;
    openVideoModal();
  });
});

function openVideoModal() {
  videoModal.classList.remove("tw-hidden");
  // Trigger animation after unhiding
  setTimeout(() => {
    videoModal.classList.add("tw-opacity-100");
    videoModal.querySelector("div").classList.add("!tw-scale-100");
  }, 10);
  modalVideo.play();
}

function closeVideoModal() {
  videoModal.classList.remove("tw-opacity-100");
  videoModal.querySelector("div").classList.remove("!tw-scale-100");
  // Wait for animation to complete before hiding
  setTimeout(() => {
    modalVideo.pause();
    modalVideo.src = "";
    modalTitle.textContent = "";
    videoModal.classList.add("tw-hidden");
  }, 300);
}

// Close modal when clicking outside the video
videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    closeVideoModal();
  }
});

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeVideoModal();
  }
});
