const profilePicture = document.querySelector("#profile-picture");
let isClicked = false;
let primaryRed = "#FF3434";
let primaryBlue = "#2697FF";


const onPicClick = () => {
    console.log(profilePicture);
    if (isClicked) {
        // profilePicture.style.width = "400px";
        // profilePicture.style.height = "400px";
        profilePicture.style.border = "12px solid rgb(75, 143, 232)";
        profilePicture.style.backgroundColor = "rgb(217, 233, 247)";
    }
    else {
        // profilePicture.style.width = "600px";
        // profilePicture.style.height = "600px";
        profilePicture.style.border = "12px solid rgb(242, 83, 65)";
        profilePicture.style.backgroundColor = "rgb(247, 189, 183)";
    }
    isClicked = !isClicked;
}

const headlineTextUpper = document.getElementById("upperheadline");
const headlineTextLower = document.getElementById("lowerheadline");

var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent &&
               navigator.userAgent.indexOf('CriOS') == -1 &&
               navigator.userAgent.indexOf('FxiOS') == -1;

if (isSafari) {
    headlineTextUpper.style.webkitTextFillColor = "black";
    headlineTextLower.style.webkitTextFillColor = primaryBlue;

}
