function calculateDOB(currYear, userAge) {
    //calculates year of birth
    let BirthYear = currYear - userAge;
    console.log("Date of Birth calculated.");
    return BirthYear;
    }

function displayUserpreferences() {
    const name = document.getElementById('display_name');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const emailDisplay = document.getElementById('display_email');
    const AgeDisplay = document.getElementById('display_age');

    let BirthYear = calculateDOB(2025,age.value.trim());
    
    welcomeMessage.innerHTML = `Hi ${username.value},
    Congratulations on creating your new account with Shop and Go! We're excited to have you on board and look forward to helping you find everything you need with ease. 
    We noticed that you were born in ${BirthYear}—that's awesome! Its always great to have people of all ages shopping with us. Whether you're here to explore the latest gadgets, fashion, or home goods, we've got something for everyone."`;

    name.innerHTML = "<strong>Username: </strong>" + username.value;
    emailDisplay.innerHTML = "<strong>Email: </strong>" + email.value;
    AgeDisplay.innerHTML = "<strong>Age: </strong>" + age.value;
    }

    document.getElementById("preference_form").addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent page reload
  
        const bgColor = document.getElementById("bgColor").value;
        const textColor = document.getElementById("textColor").value;
        const fontSize = document.getElementById("fontSize").value;
        
        const body = document.getElementById("profile-body");
        
        

        const form = e.target;
        const params = new URLSearchParams(new FormData(form)).toString();

        // Change the URL query string
        window.location.search = params;
        //set cookies to remeber the custom page load out
        setCookie('bgColor', bgColor);
        setCookie('textColor', textColor);
        setCookie('fontSize', fontSize);

        body.style.backgroundColor = `${bgColor}`;
        body.style.color = `${textColor}`;
        body.style.fontSize = `${fontSize}`;
      });

      function setCookie(name, value, days = 30) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/`;
      }
  
      // Helper to get a cookie
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

    window.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
  
        const bgColor = params.get('bgColor') || getCookie('bgColor');
        const textColor = params.get('textColor') || getCookie('textColor');
        const fontSize = params.get('fontSize') || getCookie('fontSize');
  
        if (bgColor) {
          document.body.style.backgroundColor = bgColor;
        
        }
        if (textColor) {
          document.body.style.color = textColor;
        
        }
        if (fontSize) {
          document.body.style.fontSize = fontSize;
          
        }
      });