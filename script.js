


const hamburger = document.querySelector(".hamburger-menu");
const navMenu = document.querySelector(".navbar ul");
const closeBtn = document.createElement("div");

closeBtn.classList.add("close-menu");
closeBtn.innerHTML = "&times;";
document.querySelector(".navbar").appendChild(closeBtn);

hamburger.addEventListener("click", () => {
    navMenu.classList.add("mobile-menu", "open");
});

closeBtn.addEventListener("click", () => {
    navMenu.classList.remove("open");
});
