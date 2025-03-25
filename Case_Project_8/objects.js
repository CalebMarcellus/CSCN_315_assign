export class user {
    
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
function getUserFromLocal() {
    const userData = localStorage.getItem("user");
    if (userData) {
        const parsedData = JSON.parse(userData);
        return new user(parsedData.name, parsedData.age, parsedData.email);
    }
    return null; // Return null if no user data is found
}

function storeLocal(user) {
    localStorage.setItem("user", JSON.stringify(user));
}
// Create a user instance
const user = new user("John Doe", "john@example.com", 30);

// Store it in localStorage
storeLocal(user);

// Retrieve and display the stored user
const retrievedUser = getUserFromLocal();
console.log(retrievedUser); // User { name: "John Doe", age: 30, email: "john@example.com" }
