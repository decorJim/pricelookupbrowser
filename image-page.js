

function handleImages() {
    const selectedImagesDiv = document.getElementById("selectedImages");
    const images = document.getElementById("myInput").files;
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageURL = URL.createObjectURL(image);
        const imageTag = document.createElement("img");
        imageTag.src = imageURL;
        selectedImagesDiv.appendChild(imageTag);
    }
}

function gomainpage() {
    window.location.href = 'main.html';
}