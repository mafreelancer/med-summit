var button_open_menu = document.querySelector(".button__icon"),
    aside = document.querySelector(".aside");

button_open_menu.onclick = function() {
    aside.classList.toggle("aside--show");
    button_open_menu.classList.toggle("button__icon--open");
}
