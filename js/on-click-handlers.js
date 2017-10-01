let currentImage = null;

function toBlackAndWhite(image) {
    for (let i = 0; i < image.height; i++) {
        for (let j = 0; j < image.width; j++) {
            let idx = (4 * i) * image.width + (4 * j);

            let red = image.data[idx];
            let green = image.data[idx + 1];
            let blue = image.data[idx + 2];
            let alpha = image.data[idx + 3];
            let average = (red + green + blue) / 3;

            image.data[idx] = average;
            image.data[idx + 1] = average;
            image.data[idx + 2] = average;
            image.data[idx + 3] = alpha;
        }
    }

    return image;
}

function repaint() {
    console.log(currentImage);

    if (currentImage === null) {
        return;
    }

    let canvas = document.getElementById("content");

    canvas.width = document.getElementById("image-width").value;
    let coof = currentImage.height / currentImage.width;
    canvas.height = canvas.width * coof;

    let ctx = canvas.getContext("2d");

    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

    if (document.getElementById("image-bw").value === "1") {
        let fromCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.putImageData(toBlackAndWhite(fromCanvas), 0, 0);
    }
}

function onFilesSelected(e) {
    console.log("File selected: ", e);

    let selectedFile = e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = function (e) {
        let image = new Image();
        image.src = e.target.result;

        currentImage = image;
        image.onload = repaint;
    }
}

let fileInput = document.getElementById("file-input");
fileInput.onchange = onFilesSelected;

let imageWidth = document.getElementById("image-width");
imageWidth.oninput = repaint;

document.getElementById("image-bw").addEventListener("change", function () {
    this.value ^= 1;
    repaint();
});