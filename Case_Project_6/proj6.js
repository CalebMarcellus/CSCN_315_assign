//All the references to objects in my html that I need
const username = document.getElementById('name');
const password = document.getElementById('password');
const email = document.getElementById('email');
const fullName = document.getElementById('full_name');
const confirmPassword = document.getElementById('confirm_pswd');
const DOB = document.getElementById('DOB');
const phoneNumber = document.getElementById('phone_number');

const form = document.getElementById('profileform');
const errorElement = document.getElementById('error');
const mainContent = document.getElementById('profile-content');
const errorMessage = document.getElementsByClassName('error');

//looks for the submit button to be pressed
form.addEventListener("submit", function(event) {
    //stops reload of window
    event.preventDefault();
    
    
    //if the input from the user is good then display account
    if (validateinput()){
        registerUser(username.value, password.value)
        window.location.href = "Profile.html";
    }
});
function calculateDOB(currYear, userAge) {
//calculates year of birth
let BirthYear = currYear - userAge;
console.log("Date of Birth calculated.");
return BirthYear;
}

 function setError(element, message)
{   //goes into the div element in html then searches p tag to 
    // add a message to it. 
    const formcontrol = element.parentElement;
    const errorDisplay = formcontrol.querySelector('error');
    

    errorDisplay.innerText = message;
    //formcontrol.classlist.add('error');
    //formcontrol.classlist.remove('success');
}

function setSuccess(element) {
    //same thing as above but gets rid of error string
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('error');

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
    const fullNamevalue = fullName.value;
    const Confirmvalue = confirmPassword.value.trim();
    const DOBvalue = DOB.value.trim();
    const phonevalue = phoneNumber.value.trim();
    let emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,20}$/gm;
    let usernameRegex = /^[A-Za-z][A-Za-z0-9]{5,14}$/gm;
    let fullNameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/gm;
    //used to keep track of errors
    let isvalid = true;

    if (fullNamevalue === ''){
        //checks to see if name field is not put in
        setError(fullName,'Full name field must not be empty!');
        //log error to console
        console.error("No input provided.");
        isvalid = false;
        
    }
    else if (fullNameRegex.test(fullNamevalue))
    {
        setError(fullName, 'Full name must not contain any special characters!');
        isvalid = false;
    }
    else {
        setSuccess(fullName);
    }

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
    else if (passwordRegex.test(passwordValue)){
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
    else if (usernameRegex.test(namevalue)) {
        setError(username, 'UserName must be between 6 and 16 characters and cannot start with a number!');
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
    else if (emailRegex.test(emailValue)){
        setError(email, 'Please enter a correct email address!');
        isvalid = false;
    }
    else {
        setSuccess(email);
    }

    
    
    if (Confirmvalue === '')
        {
            console.error("No input provided.");
            setError(confirmPassword, 'You must enter your password twice!');
            isvalid = false;
        }
        else if (Confirmvalue != passwordValue)
        {
            setError(confirmPassword, 'Your passwords have to match!');
            isvalid = false;
        }
        else{
            setSuccess(confirmPassword);
        }

        if (Confirmvalue === '')
            {
                console.error("No input provided.");
                setError(confirmPassword, 'You must enter your password twice!');
                isvalid = false;
            }
            else if (Confirmvalue != passwordValue)
            {
                setError(confirmPassword, 'Your passwords have to match!');
                isvalid = false;
            }
            else{
                setSuccess(confirmPassword);
            }
    console.log(agevalue);
    console.log(namevalue);
    console.log(emailValue);
    console.log(passwordValue);
    return isvalid;
}

function displayprofile() {
    

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
// Function to register a user
function registerUser(username, password) {
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (users[username]) {
        console.log('Username already exists. Choose a different one.');
        return false;
    }
    let user = {
        name: "John Doe",
        email: "johndoe@example.com",
        age: 30
    };
    
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    console.log('User registered successfully!');
    return true;
}


// Example usage:
// registerUser('testUser', 'password123');
// loginUser('testUser', 'password123');
