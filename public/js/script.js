document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (!hamburger || !navLinks) {
    console.error("Navigation elements not found:", {
      hamburger: !!hamburger,
      navLinks: !!navLinks
    });
    return;
  }

  console.log("Hamburger menu script initialized");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    console.log("Hamburger clicked, active state:", hamburger.classList.contains("active"));
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      console.log("Nav link clicked, menu closed");
    });
  });
});
