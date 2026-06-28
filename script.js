// =========================
// Image Compressor UI
// =========================

const fileInput = document.getElementById("fileInput");
const previewImg = document.getElementById("previewImg");
const quality = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");
const downloadBtn = document.getElementById("downloadBtn");

let originalImage = null;

// =========================
// Load Image
// =========================

fileInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        originalImage = new Image();
        originalImage.src = e.target.result;

        originalImage.onload = function () {

            previewImg.src = originalImage.src;
            previewImg.style.display = "block";

        };

    };

    reader.readAsDataURL(file);
});

// =========================
// Quality Update
// =========================

quality.addEventListener("input", () => {
    qualityValue.textContent = quality.value;
});

// =========================
// Compress & Download
// =========================

downloadBtn.addEventListener("click", () => {

    if (!originalImage) {
        alert("Please upload an image first.");
        return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = originalImage.width;
    canvas.height = originalImage.height;

    ctx.drawImage(originalImage, 0, 0);

    const compressedData = canvas.toDataURL(
        "image/jpeg",
        quality.value / 100
    );

    const link = document.createElement("a");
    link.href = compressedData;
    link.download = "compressed-image.jpg";
    link.click();
});