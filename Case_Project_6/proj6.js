//All the references to objects in my html that I need from the form inputs
const username = document.forms["profileform"]["username"];
const password = document.forms["profileform"]["password"];
const email = document.forms["profileform"]["email"];
const fullName = document.forms["profileform"]["full_name"];
const confirmPassword = document.forms["profileform"]["confirm_pswd"];
const DOB = document.forms["profileform"]["DOB"];
const phoneNumber = document.forms["profileform"]["phone_number"];

const form = document.forms["profileform"];
const errorElement = document.getElementById('error');
const mainContent = document.getElementById('profile-content');
const errorMessage = document.getElementsByClassName('error');

//looks for the submit button to be pressed
form.addEventListener("submit", function(event) {
    //stops reload of window
    event.preventDefault();
    //this try block will catch any errors that show up and then display an error message.
    try { 
        //goes to profile page if all fields are filled out.
        if (validateinput()){
        
            window.location.href = "Profile.html";
        }
    }
    catch (error) {
        console.error("An error was found:", error.message);
       
    }
   
   
});
function calculateAge(currYear, dateOfBirth) {
//calculates year of birth
BirthYear = new Date(dateOfBirth);
let userAge = currYear - BirthYear.getFullYear();

console.log("Age calculated.");
return userAge;
}

 function setError(element, message)
{   //goes into the div element in html then searches p tag to 
    // add a message to it. 
    const formcontrol = element.parentElement;
    const errorDisplay = formcontrol.querySelector('.error');
    

    errorDisplay.innerText = message;
    errorDisplay.innerHTML = message;
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
    const fullNamevalue = fullName.value;
    const Confirmvalue = confirmPassword.value.trim();
    const DOBvalue = DOB.value.trim();
    const phonevalue = phoneNumber.value.trim();
    //These are the regex i used to error check
    let emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,20}$/gm;
    let usernameRegex = /^[A-Za-z][A-Za-z0-9]{5,14}$/gm;
    let fullNameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/gm;
    let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gmi;
    //used to keep track of errors
    let isvalid = true;

    if (fullNamevalue === ''){
        //checks to see if name field is not put in
        setError(fullName,"Full name field must not be empty!");
        //log error to console
        console.error("No input provided.");
        isvalid = false;
        
    } //I see if the regex matches with the user string than I not it because if it does not match then execute the below statments
    else if (!fullNameRegex.test(fullNamevalue))
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

    if (emailValue === '')
    {   console.error("No input provided.");
        setError(email, 'Email is a Required field!');
        isvalid = false;
    }
    else if (!emailRegex.test(emailValue)){
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

            if (calculateAge(2025, DOBvalue) < 18){
                //checks to see if name field is not put in
                setError(DOB,'User must be at least 18 years old.');
                //log error to console
                console.error("User is underage.");
                isvalid = false;
                
            }else if (DOBvalue === ""){
                setError(DOB,'The Date of Birth field must be filled!');
                //log error to console
                console.error("No input provided.");
                isvalid = false;
            }
            else {
                setSuccess(DOB);
            }

    if (phonevalue === ''){
        //checks to see if name field is not put in
        setError(phoneNumber,'phone number field must not be empty!');
        //log error to console
        console.error("No input provided.");
        isvalid = false;
        
    }
    else if (!phoneRegex.test(phonevalue))
    {
        setError(phoneNumber, 'Full name must not contain any special characters!');
        isvalid = false;
    }
    else {
        setSuccess(phoneNumber);
    }
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
