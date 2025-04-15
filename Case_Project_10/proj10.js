import "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js";

const fileInput = document.getElementById("fileInput")
const imageContainer = document.getElementById("imageContainer");
//project 7 code below 
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



window.addEventListener('DOMContentLoaded', () => {
    const middleOfUSA = [-100, 40];
    const middleOfLynchburg = [-79.162, 37.39]
    let lnglat = null;

    async function getLocation() {
      try {
        const response = await fetch("http://ip-api.com/json/");
        const json = await response.json();
        if (typeof json.lat === "number" && typeof json.lon === "number") {
          return [json.lon, json.lat];
        }
      } catch (error) {}
      return middleOfUSA;
    }
    
    async function init() {
      const map = new maplibregl.Map({
        style: "dark.json",
        // style: "https://tiles.openfreemap.org/styles/liberty",
        center: middleOfUSA, // default location to look at.
        zoom: 2, // how close the map is
        container: "map-box", //uses the div in map.html called map-box
        interactive: false, // This disables all mouse/touch/keyboard interaction
      });
    
      //const location = await getLocation();
      //The coordinates of lynchburg is stored here
      const location = middleOfLynchburg;
      if (location !== middleOfUSA) {
        map.flyTo({ center: location, zoom: 11});
        
        let marker = new maplibregl.Marker({ draggable: true })
            .setLngLat(location)
            .addTo(map)
            
        marker.on("dragend", () => {
            
            let lngLat = marker.getLngLat();
            let lng = lngLat.lng;
            let lat = lngLat.lat;

            const params = new URLSearchParams({
            longitude: lngLat.lng,
            latitude: lngLat.lat
            }).toString();

            window.location.search = params;
            //window.history.replaceState({}, "", params); // No reload
            
            
           
            console.log("New marker position:", lngLat.lng, lngLat.lat);});
           
        new maplibregl.Popup({
          closeOnClick: false,
        })
          .setLngLat(location)
          .setHTML("<h3>You are approximately here!</h3>")
          .addTo(map);

        return marker;
      }

      
    }
    
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
      
        selectedImages.forEach((src) => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "Store image";
          img.style.width = "200px";
          img.style.margin = "10px";
          container.appendChild(img);
        });
      }
      
      // Initial call
      displayImages();
      
      // Repeat at interval
      setInterval(displayImages, rotationInterval);
      
});
function makeGuess() {
    const lnglat = new URLSearchParams(window.location.search);
    alert(lnglat.get('longitude'));
    if (lnglat) {
        alert(`You guessed: ${lnglat.lng}, ${lnglat.lat}`);
      } else {
        alert("No marker position yet.");
      }
}



