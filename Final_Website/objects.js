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



export class task {
    constructor() {
        
    }
    
    registerUser(name, passwd) {
        let user = JSON.parse(sessionStorage.getItem(name));
        
        if (sessionStorage.getItem(name)) {
            console.log('Username already exists. Choose a different one.');
            return false;
        }
    
       
        
    
        sessionStorage.setItem(name, JSON.stringify(passwd));
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