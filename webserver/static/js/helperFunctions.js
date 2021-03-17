// Just plays the button click sound
function playBtnClick() {
    document.getElementById("btn_press_sound").play();
}


// Disables buttons
function lockBtn(btnID) {
    document.getElementById(btnID).classList.add("btn-locked");
}


// Unlocks buttons
function unlockBtn(btnID) {
    document.getElementById(btnID).classList.remove("btn-locked");
}