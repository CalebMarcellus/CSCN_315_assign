const username = document.getElementById('name');
const password = document.getElementById('password');
const email = document.getElementById('email');
const form = document.getElementById('profileform');
const errorElement = document.getElementById('error');
const mainContent = document.getElementById('profile-content');
const age = document.getElementById('age');
const errorMessage = document.getElementsByClassName('.error')


form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    validateinput();
});

function calculateDOB(currYear, userAge) {

let BirthYear = currYear - userAge;
return BirthYear;
}

 function setError(element, message)
{   const formcontrol = element.parentElement;
    const errorDisplay = formcontrol.querySelector('.error');
    

    errorDisplay.innerText = message;
    //formcontrol.classlist.add('error');
    //formcontrol.classlist.remove('success');
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innertext = '';
    errorDisplay.innerHTML = '';
    //inputControl.classlist.add('success');
    //inputControl.classlist.remove('error');
}

function validateinput() {
    const namevalue = username.value.trim();
    const passwordValue = password.value.trim();
    const emailValue = email.value.trim();
    const agevalue = age.value.trim();


    
    if (namevalue === ''){
        setError(password,'Password is a required field!');
        console.error("No input provided.");
        
        
    }
    else if (passwordValue.length <= 10 && passwordValue.length > 0)
    {
        console.error("Invalid input provided for password.");
        setError(password, 'Password must be at least 10 characters long');
    }
    else {
        setSuccess(password);
    }

    if (namevalue === '')
    {
        setError(username, 'UserName is a required field');
        console.error("No input provided.");
    }
    else {
        setSuccess(username);
    }

    if (emailValue === '')
    {   console.error("No input provided.");
        setError(email, 'Email is a Required field!');
    }
    else {
        setSuccess(email);
    }
    if (agevalue === '')
    {
        console.error("No input provided.");
        setError(age, 'Age is a required field!');
    }
    else{
        setSuccess(age);
    }

    
}