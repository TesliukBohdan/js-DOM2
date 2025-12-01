const gallery = document.getElementById("gallery");
const loadMore = document.getElementById("loadMore");
const clearGallery = document.getElementById("clearGallery");
const removeLast = document.getElementById("removeLast");
const reverseGallery = document.getElementById("reverseGallery");
const shuffleGallery = document.getElementById("shuffleGallery");

let page = 1;
let photos = [];

function loadImages() {
  fetch(`https://picsum.photos/v2/list?page=${page}&limit=4`)
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        photos.push(data[i].download_url);
      }
      showImages();
      page++;
    });
}

function showImages() {
  gallery.innerHTML = "";
  for (let i = 0; i < photos.length; i++) {
    const img = document.createElement("img");
    img.src = photos[i];
    gallery.appendChild(img);
  }
}

loadMore.addEventListener("click", loadImages);

clearGallery.addEventListener("click", () => {
  photos = [];
  showImages();
});

removeLast.addEventListener("click", () => {
  photos.pop();
  showImages();
});

reverseGallery.addEventListener("click", () => {
  photos.reverse();
  showImages();
});

shuffleGallery.addEventListener("click", () => {
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = photos[i];
    photos[i] = photos[j];
    photos[j] = tmp;
  }
  showImages();
});

loadImages();
