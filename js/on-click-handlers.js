let currentImage = null;

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

