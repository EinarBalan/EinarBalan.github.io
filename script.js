const profilePicture = document.querySelector("#profile-picture");
let isClicked = false;

const onPicClick = () => {
    console.log(profilePicture);
    if (isClicked) {
        // profilePicture.style.width = "400px";
        // profilePicture.style.height = "400px";
        profilePicture.style.border = "8px solid rgb(75, 143, 232)";
        profilePicture.style.backgroundColor = "rgb(217, 233, 247)";
    }
    else {
        // profilePicture.style.width = "600px";
        // profilePicture.style.height = "600px";
        profilePicture.style.border = "8px solid rgb(242, 83, 65)";
        profilePicture.style.backgroundColor = "rgb(247, 189, 183)";
    }
    isClicked = !isClicked;
}

profilePicture.addEventListener("click", onPicClick);