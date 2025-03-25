const fileInput = document.getElementById("fileInput")
const imageContainer = document.getElementById("imageContainer");

fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageContainer.innerHTML = ""; // Clear previous image
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            imageContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select a valid image file.");
    }
});



