const username = document.getElementById('name');
const password = document.getElementById('password');
const email = document.getElementById('email');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');
const mainContent = document.getElementById('profile-content');
const age = document.getElementById('age');

form.addEventListener('submit', function() {
    let messages = [];
    if (password.Value.length <= 10){
        messages.push('Please make a password at least 10 characters long');
    }
    else if ( password.Value === '')
    {

    }

    if (username.Value === '')
    {

    }

    if (email.Value === '')
    {

    }
    if (messages.length > 0)
    {   
        
        form.preventdefault();
        let YearOfBirth = calculateDOB(2025, age);
        errorElement.innerHTML = messages.join(', ');
        mainContent.innerHTML = `
        
        `;
    }
    
})

function calculateDOB(currYear, userAge) {

let BirthYear = currYear - userAge;
return BirthYear;
}

 const setError = (element, message) =>
{   const inputControl = element.parentElement;
    const errorDisplay = inputControl.querSelector('.error');

    errorDisplay.innertext = '';
    inputControl.classlist.add('error');
    inputControl.classlist.remove('success');
}