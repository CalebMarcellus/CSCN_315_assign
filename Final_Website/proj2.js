import {user,task} from "./objects.js";

//All the references to objects in my html that I need
const username = document.getElementById('name');
const password = document.getElementById('password');
const email = document.getElementById('email');
const form = document.getElementById('profileform');
const errorElement = document.getElementById('error');
const mainContent = document.getElementById('profile-content');
const age = document.getElementById('age');
const errorMessage = document.getElementsByClassName('.error')

//looks for the submit button to be pressed
form.addEventListener("submit", function(event) {
    //stops reload of window
    event.preventDefault();
    
    
    //if the input from the user is good then display account
    if (validateinput()){
       
        window.location.href = "Profile.html"; // or any target page
    } else {
      alert("Please enter a valid username.");
    }
});
// Function to login a user
function loginUser(username, password) {
    let users = JSON.parse(localSession.getItem('users')) || {};
    
    if (users[username] && users[username] === password) {
        console.log('Login successful!');
        return true;
    } else {
        console.log('Invalid username or password.');
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
    const emailValue = email.value.trim();
    const agevalue = age.value.trim();
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
    else {
        setSuccess(password);
    }

    if (namevalue === '')
    {
        setError(username, 'UserName is a required field');
        console.error("No input provided.");
        isvalid = false;
    }
    else {
        setSuccess(username);
        isvalid = true;
    }

    if (emailValue === '')
    {   console.error("No input provided.");
        setError(email, 'Email is a Required field!');
        isvalid = false;
    }
    else {
        setSuccess(email);
    }
    if (agevalue === '')
    {
        console.error("No input provided.");
        setError(age, 'Age is a required field!');
        isvalid = false;
    }
    else{
        setSuccess(age);
    }

    console.log(agevalue);
    console.log(namevalue);
    console.log(emailValue);
    console.log(passwordValue);
    return isvalid;
}



