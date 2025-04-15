
let correctLocation = [-79.188, 37.3537]; // Target coordinates (lat, lng)
const snapThreshold = 0.01; // How close (in degrees) counts as "correct"
const pointCounter = document.getElementById("point-counter"); // pointer to keep track of score
let startTime;
let timerInterval;
let points = 0; //global variable so I can access it multiple times in functions.
//project 7 code below
const fileInput = document.getElementById("fileInput");
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
//un used function. Purpose was to center the map around current position by fetching a API
async function getLocation() {
    try {
      const response = await fetch("http://ip-api.com/json/");
      const json = await response.json();
      if (typeof json.lat === "number" && typeof json.lon === "number") {
        return [json.lon, json.lat];
      }
    } catch (error) {}
    return middleOfLynchburg;
  }
// The function below initializes the map displayed through maplibregl
async function init() {
    //variables have coordinates in them.
    const middleOfUSA = [-100, 40];
    const middleOfLynchburg = [-79.162, 37.39]
    let lnglat = null;
    
    const map = new maplibregl.Map({
      style: "dark.json", // A style sheet that I imported that styles the entire map.
      // style: "https://tiles.openfreemap.org/styles/liberty",
      center: middleOfUSA, // default location to look at.
      zoom: 2, // how close the map is
      container: "map-box", //uses the div in map.html called map-box
      interactive: false, // This disables all mouse/touch/keyboard interaction
    });
  
    //const location = await getLocation();
    //The coordinates of lynchburg is stored here longitude/latitude
    const location = middleOfLynchburg;
    if (location !== middleOfUSA) {
        //centers the camera at coordinates provided.
      map.flyTo({ center: location, zoom: 11});
      //create a pin on the map that can be draged by the player.
      let marker = new maplibregl.Marker({ draggable: true })
          .setLngLat(location)
          .addTo(map)
          // at the end of a user dragging the marker then store coords and check if it in
          // the correct store location.
      marker.on("dragend", () => {
          const lngLat = marker.getLngLat();
          const distanceLng = Math.abs(lngLat.lng - correctLocation[0]);
          const distanceLat = Math.abs(lngLat.lat - correctLocation[1]);
            //Threshold allows the pin to snap to correct location so it doesn't have to be precise
          if (distanceLng < snapThreshold && distanceLat < snapThreshold) {
              // Snap into place
              marker.setLngLat(correctLocation);

              // Disable dragging by recreating the marker
              const element = marker.getElement();
              marker.remove();

              new maplibregl.Marker({ element, draggable: false })
              .setLngLat(correctLocation)
              .addTo(map);
              
              

            //add to the points if correct
              points += 1;
              pointCounter.textContent = points;
              alert("Correct! Marker locked in.");
              stopTimer();
          }
          //store coords in url 
          const params = new URLSearchParams({
          longitude: lngLat.lng,
          latitude: lngLat.lat
          }).toString();

          //window.location.search = params;
          window.history.replaceState({}, "", params); // No reload
          
          
         
          console.log("New marker position:", lngLat.lng, lngLat.lat);});
         
      

      return marker;
    }

    
  }

window.addEventListener('DOMContentLoaded', () => {
    //start the map
    init();
    
    
    
    
});
const startbutton = document.getElementById('StartButton');
startbutton.addEventListener('click',  function (e)
{   e.preventDefault();
    

    const imagePool = [
        "storeimage1.png",
        "storeimage2.png",
        "storeimage3.png",
        
      ];
      
      const container = document.getElementById("Shop-images");
      const displayCount = 1; // How many images to show at a time
      const rotationInterval = 3000; // How often to update (in ms)
      
      function getRandomImages(pool, count) {
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      }
      
      function displayImages() {
        container.innerHTML = ""; // Clear current images
      
        const selectedImages = getRandomImages(imagePool, displayCount);
        if (selectedImages == "storeimage1.png")
        {   //wards road walmart
            correctLocation = [-79.188, 37.3537];
        }
        else if (selectedImages == "storeimage2.png") {
            //walmart off towards downtown.
            correctLocation = [-79.210, 37.4107];
        }
        else if (selectedImages == "storeimage3.png") {
            //kroger wards road
            correctLocation = [-79.1797, 37.3757];
        }
        selectedImages.forEach((src) => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "Store image";
          img.style.width = "680px";
          img.style.margin = "10px";
          container.appendChild(img);
        });
        startTimer();
      }
      
      // Initial call
      displayImages();
      init()
      
      
      
});





// Start the timer when the page loads or game starts
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    //the difference between when timer started and now. convert to seconds from miliseconds.
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = `Time: ${elapsed}s`;
  }, 1000);
}

// Stop the timer when puzzle is solved
function stopTimer() {
  clearInterval(timerInterval);
}
