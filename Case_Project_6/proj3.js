const addItemButton = document.getElementById('addList');

//I make two list to carry the price and name of grocery item could make a dictionary
let GroceryData = [];
let GroceryPrices = [];

addItemButton.addEventListener('click', function() {
    //The only valid grocery items are milk,flour, cheddar cheese, and 
addItem(GroceryData);
addPrice(GroceryData, GroceryPrices)
console.log(GroceryPrices)
});

function addItem(dataArray) {
    
    var item = document.getElementById("item").value.trim();
    if (item === "") {
        //makes error message
        const divcontrol = addItemButton.parentElement;
        const listError = divcontrol.querySelector('p');
        listError.innerText = "Not a valid grocery item.";
        listError.classList.add('error');
        listError.classList.remove('success');
        return;
    }
    else if (validateItem(item)){
        //makes error message
        const divcontrol = addItemButton.parentElement;
        const listError = divcontrol.querySelector('p');
        listError.innerText = "Not a valid grocery item.";
        listError.classList.add('error');
        listError.classList.remove('success');
        return;
    }
    else{
        //adds the data to an Array 
        dataArray.push(item);
        //gets rid of error message
        const divcontrol = addItemButton.parentElement;
        const listError = divcontrol.querySelector('p');
        listError.innerText = "";
        listError.classList.add('success');
        listError.classList.remove('error');

        console.log(dataArray);
    }
    var ul = document.getElementById("groceryList");
    var li = document.createElement("li");
    li.textContent = item;
    
    // Create remove button
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function() {
        //removes element. I should include the 
        ul.removeChild(li);
        dataArray.pop();
    };
    //puts the elements in the correct spot
    li.appendChild(removeButton);
    ul.appendChild(li);

    // Clear the input field
    document.getElementById("item").value = "";
}

function addPrice(dataArray, priceArray){
    let index = 0;
    //A for loop that ineffectively loops through every item and assigns a price to it
for(let item of dataArray){
    
    switch(item) {
        case "milk":
            priceArray[index] = 6.45;
            break;
        case "eggs":
            priceArray[index] = 9.57;
            break;
        case "flour":
            priceArray[index] = 5.99;
            break;
        case "cheddar cheese":
            priceArray[index] = 8.75;
            break;
        case "onions" || "onion":
            priceArray[index] = 4.99;
            break;
        default:
            console.error("No existing price reference.");
            


    }
    index++;
}
}
function validateItem(item){

        console.log(item);

        //checks if its a valid item listed below
        switch(item) {
            case "milk":
                break;
            case "eggs":
                break;
            case "flour":
                break;
            case "cheddar cheese":
                break;
            case "onions" || "onion":
                break;
            default:
                console.error("Not a Grocery item");
                let notItem = true;
                return notItem;
        }
        return false;
}
    
    