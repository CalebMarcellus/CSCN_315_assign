"use strict";
let imgFiles = ["slideshow-1.webp", "slideshow-2.jpg", "Slideshow-3.jpg", "Slideshow-4.jpg",
    "slideshow-5.jpg", "slideshow-6.webp", "slideshow-7.jpg", "slideshow-8.jpg",
    "slideshow-9.jpg", "slideshow-10.jpg"]
    let imgCaptions = new Array(12);
    imgCaptions[0]="An Grocery aile of a Store.";
    imgCaptions[1]="Orange Juice is an item that could be found with Shop & Go."; 
    imgCaptions[2]="Walmart is multimillion dollar business chain which owns stores."; 
    imgCaptions[3]="Macy's is a clothing style store where all the latest fasion is available."; 
    imgCaptions[4]="Target is a similar store chain that sells quality projects.";
    imgCaptions[5]="Vegetables can be a good option to buy.";
    imgCaptions[6]="Using our app you can find any item you are looking for.";
    imgCaptions[7]="A demonstration of navigation using Shop & Go.";
    imgCaptions[8]="An item can be found as easily as this.";
    imgCaptions[9]="Cosco is a wholesell store that sells things in bulk.";
  
    let imgCount = imgFiles.length;

window.addEventListener("load", MakeSlideShow);

function MakeSlideShow() {
    let slideShow = document.getElementById("main-slideshow");

   let Title = document.createElement("h1");
   let Counter = document.createElement("div");
   let Prev = document.createElement("div");
   let Next = document.createElement("div");
   let Images = document.createElement("div");

   

   // Design the lightbox slide counter
   slideShow.appendChild(Counter);
   Counter.id = "Counter"; 
   let currentImg = 1;
   Counter.textContent = currentImg + " / " + imgCount;

   // Design the lightbox previous slide button
   slideShow.appendChild(Prev);
   Prev.id = "Prev"; 
   Prev.innerHTML = "&#9664;";
   Prev.onclick = showPrev;

   // Design the lightbox next slide button
   slideShow.appendChild(Next);
   Next.id = "Next";
   Next.innerHTML = "&#9654;";
   Next.onclick = showNext;

   // Design the lightbox images container
   slideShow.appendChild(Images);
   Images.id = "Images";
   // Add images from the imgFiles array to the container
   for (let i = 0; i < imgCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createOverlay;
      Images.appendChild(image);
   }
   function showPrev() {
    Images.insertBefore(Images.lastElementChild, Images.firstElementChild);
    (currentImg > 1) ? currentImg-- : currentImg = imgCount;
    Counter.textContent = currentImg + " / " + imgCount;
 }
 function showNext() {
    Images.appendChild(Images.firstElementChild);
    (currentImg < imgCount) ? currentImg++ : currentImg = 1;
    Counter.textContent = currentImg + " / " + imgCount;}
 function createOverlay() {
    let overlay = document.createElement("div");
    overlay.id = "Overlay";
    
    // Add the figure box to the overlay
    let figureBox = document.createElement("figure");
    overlay.appendChild(figureBox);
    
    // Add the image to the figure box
    let overlayImage = this.cloneNode("true");
    figureBox.appendChild(overlayImage);

    // Add the caption to the figure box
    let overlayCaption = document.createElement("figcaption");
    overlayCaption.textContent = this.alt;
    figureBox.appendChild(overlayCaption);
    
    // Add a close button to the overlay
    let closeBox = document.createElement("div");
    closeBox.id = "OverlayClose";
    closeBox.innerHTML = "&times;";
    closeBox.onclick = function() {
       document.body.removeChild(overlay);
    }      
    overlay.appendChild(closeBox);
    
    document.body.appendChild(overlay);
 }  
}