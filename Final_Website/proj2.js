class user {
    
    constructor(fullname, email, age, psswd, uName, dateOfBirth, phonedigits) {
        this.name = fullname;
        this.email = email;
        this.age = age;
        this.password = psswd;
        this.username = uName;
        this.dob = dateOfBirth;
        this.phone = phonedigits;
    }

    printInformation() {
        console.log("Full Name:", this.name);
        console.log("Email:", this.email);
        console.log("User Age:", this.age);
        console.log("Password:", this.password);
        console.log("Username:", this.username);
        console.log("Date of Birth:", this.dob);
        console.log("Phone Number:", this.phone);
    }
   

}



class task {
    constructor() {
        
    }
    
    registerUser(userObject) {
        let user = JSON.parse(localStorage.getItem(userObject.uName));
        
        if (username === user.uName) {
            console.log('Username already exists. Choose a different one.');
            return false;
        }

        localStorage.setItem(user.uName, JSON.stringify(userObject));
        console.log('User registered successfully!');
        return true;
    }
    getUserFromLocal(userName) {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedData = JSON.parse(userData);
            return new user(parsedData.name, parsedData.age, parsedData.email);
        }
        return null; // Return null if no user data is found
    }
 }

//All the references to objects in my html that I need
const username = document.getElementById('name');
const password = document.getElementById('password');
const form = document.getElementById('profileform');
const errorElement = document.getElementById('error');
const mainContent = document.getElementById('profile-content');

const errorMessage = document.getElementsByClassName('.error')

//looks for the submit button to be pressed
form.addEventListener("submit", function(event) {
    //stops reload of window
    event.preventDefault();
    
    
    //if the input from the user is good then display account
    if (validateinput()){
       
        window.location.href = "Profile.html"; // or any target page
    } else {
      
    }
});
// Function to login a user
function loginUser(username, passwd) {
    let user = JSON.parse(sessionStorage.getItem(username)) || {};
    
    if (user == passwd) {
        console.log('Login successful!');
        setSuccess(password)
        return true;
    } else {
        console.log('Invalid username or password.');
        setError(password, "There is no user of this name please make an account first.")
        return false;
    }
}


 function setError(element, message)
{   //goes into the div element in html then searches p tag to 
    // add a message to it. 
    const formcontrol = element.parentElement;
    const errorDisplay = formcontrol.querySelector('.error');
    

    errorDisplay.innerText = message;
    //formcontrol.classlist.add('error');
    //formcontrol.classlist.remove('success');
}

function setSuccess(element) {
    //same thing as above but gets rid of error string
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innertext = '';
    errorDisplay.innerHTML = '';
    //inputControl.classlist.add('success');
    //inputControl.classlist.remove('error');
}

function validateinput() {
    //gets the value the user put in
    const namevalue = username.value.trim();
    const passwordValue = password.value.trim();
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,20}$/gm;
    let usernameRegex = /^[A-Za-z][A-Za-z0-9]{5,14}$/gm;
    //used to keep track of errors
    let isvalid = true;

    if (passwordValue === ''){
        //checks to see if name field is not put in
        setError(password,'Password is a required field!');
        //log error to console
        console.error("No input provided.");
        isvalid = false;
        
    }
    else if (passwordValue.length < 10 && passwordValue.length > 0)
    {
        //passwords must be larger than 10 characters
        console.error("Invalid input provided for password.");
        setError(password, 'Password must be at least 10 characters long');
        isvalid = false;
    }
    else if (!passwordRegex.test(passwordValue)){
        setError(password, 'Password must at least one upper case English letter, one lower case English letter, one number and one special character');
        isvalid = false;
    }
    else {
        setSuccess(password);
    }

    if (namevalue === '')
        {
            setError(username, 'UserName is a required field');
            console.error("No input provided.");
            isvalid = false;
        }
        else if (!usernameRegex.test(namevalue)) {
            setError(username, 'UserName must be between 6 and 16 characters and cannot start with a number!');
            isvalid = false;
        }
        else {
            setSuccess(username);
            isvalid = true;
        }
        isvalid = loginUser(namevalue, passwordValue);
    return isvalid;
}



