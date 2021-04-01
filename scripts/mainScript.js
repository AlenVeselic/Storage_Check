/**
 * Description
 * @authors Alen Veselič ()
 * @version 1.0.0
 */


/*
This script holds most of the web app code. Thinking wether I want to separate this script which is mostly
database interaction and the future grocery list assembly code for greater readability, since this one is already
almost 600 lines long. I also have to move the display methods to cssScript eventually.
*/


/*
This checks whether a database already exists, if it doesn't it establishes an example base.
*/
if (localStorage.getItem("myHouse") == null){
    document.write("The db is empty")
    var db = {
        "kitchen": {
            "drawer":["glass", "plate", "plate"],
            "fridge":["yogurt", "fish", "meat"]
        },
        "living room":{
            "snack drawer":["ketchup chips", "strawberry milka", "penut mnms"]
        }

    }
    document.write(JSON.stringify(db))
    localStorage.setItem("myHouse", JSON.stringify(db))
    document.write("Db initialized.")
}


/*
This gets each div in traversal and assigns the appropriate behaviour for the back button in each
(going to the previous windows/div and resetting the previously chosen value)
*/
var traversalDivs = document.getElementById("traversal").getElementsByTagName('div')

for(elNum = 0; elNum < traversalDivs.length; elNum ++){
    if(traversalDivs[elNum].hasAttribute('id')){ 
    switch(traversalDivs[elNum].id){
        case "Places":

        var buttonEl = traversalDivs[elNum].getElementsByClassName('back')[0]
        buttonEl.onclick = function () {

                                        setChosenPlace("");
                                        cycleDivs('modifyTab')

                                        }

        break;
        case "Rooms":

            var buttonEl = traversalDivs[elNum].getElementsByClassName('back')[0]
            buttonEl.onclick = function () {
    
                                            setChosenRoom("");
                                            cycleDivs('Places')
    
                                            }


        break;
        case "Objects":

            var buttonEl = traversalDivs[elNum].getElementsByClassName('back')[0]
            buttonEl.onclick = function () {
    
                                            setChosenObject("");
                                            cycleDivs('Rooms')
    
                                            }
        
        break;
        case "Items":
            var buttonEl = traversalDivs[elNum].getElementsByClassName('back')[0]
            buttonEl.onclick = function () {
                                        cycleDivs('Objects')

                                        }

        break;
    }

    }
}

/*

Under here is the basic display method used when you press the display button.

It is assembled by creating a table and either entering empty spaces or values into their appropriate cells
by looping through the entire database.

*/

function displayDatabase(){



    var allPlaces = [] // save an empty array to store places in

    //get all the places from the "places" key in localstorage and split them by commas
    var allPlaces = localStorage.getItem('places').split(',')
    // create the div that would hold the entire database display and give it the appropriate id value
    var divEl = document.createElement('div') 
    divEl.setAttribute('id',"display")

    //empty table creation
    var tableEl = document.createElement("table")
    var tBodyEl = document.createElement("tbody")

    for(place in allPlaces){ // loop through each place
        var placeRow = document.createElement("tr") // create a row for each place
        var placeCell = document.createElement("td") // create a cell for each place
        var placeText = document.createTextNode(allPlaces[place]) // create the current places text node

        var hrRow = document.createElement('tr') //create a row specifically to put a horizontal line in


        /*
        This loop divides the contents of the table by filling up a row with horizontal lines.
        TODO: This could also be done by assigning a border to the bottom of each place row.
        */
        var i = 4
        while(i != 0){

            var hrEl= document.createElement('hr')
            var hrCell = document.createElement('td')
            hrCell.appendChild(hrEl)
            hrRow.appendChild(hrCell)

            i -= 1

        }

        /*
        Appends the text to the cell, the cell to the row and the row to the table.
        Also appends the line row to the table     
        */   
        placeCell.appendChild(placeText)
        placeRow.appendChild(placeCell)
        tBodyEl.appendChild(hrRow)
        tBodyEl.appendChild(placeRow)
        

        if(localStorage.getItem(allPlaces[place]) == "") continue
        // If the current place is an empty string, the rest of the code is skipped and we move on to the next place

        /*
        Gets the all data for the current place
        Saves all room keys to allRooms
        and
        creates an empty row, appending it to the table's body
        */
        var data = JSON.parse(localStorage.getItem(allPlaces[place]))
        allRooms = Object.keys(data)
        var emptyRow = document.createElement('tr')
        tBodyEl.appendChild(emptyRow)

        


        for(room in allRooms){ // loops through each room displaying it's data
            //creates a row for the current room, a cell instance for then first empty cell, and a cell instance for the room's name
            var newRow = document.createElement("tr")
            var emptyCell = document.createElement("td")
            var roomCell = document.createElement("td")
            var roomName = document.createTextNode(allRooms[room])
            
            //appends the aforementioned cells to the row and the row to the table
            roomCell.appendChild(roomName)
            newRow.appendChild(emptyCell)
            newRow.appendChild(roomCell)

            tBodyEl.appendChild(newRow)

            //gets the rooms object keys and creates a new row, appending it to the table
            var allObjects = Object.keys(data[allRooms[room]])
            var freshRow = document.createElement("tr")
            tBodyEl.appendChild(freshRow)

            for(object in allObjects){ // loops through each object in the room

                //creates a row for the object and adds two empty spaces in front of it's name cell
                var objectRow = document.createElement("tr")
                var i = 2
                while(i != 0){

                    var emptyCell = document.createElement('td')
                    objectRow.appendChild(emptyCell)

                    i -= 1;

                }

                /*
                Creates and appends the objects name cell
                */
                var objectCell = document.createElement('td')
                var objectText = document.createTextNode(allObjects[object])

                objectCell.appendChild(objectText)
                objectRow.appendChild(objectCell)

                tBodyEl.appendChild(objectRow)

                // checks wether the object is an array or a json object
                if(data[allRooms[room]][allObjects[object]] == undefined){ //if it's json it gets its keys
                    var allItems = Object.keys(data[allRooms[room]][allObjects[object]])
                }else{
                    var allItems = data[allRooms[room]][allObjects[object]]// otherwise it gets its value
                }



                for(item in allItems){ // loops through every item in the object
                    //creates the row for the item and similarly to all previous rows adds 3 spaces in front of the value this time
                    var itemRow = document.createElement('tr')
                    var i = 3
                    while(i != 0){

                        var emptyCell = document.createElement('td')
                        itemRow.appendChild(emptyCell)

                        i -= 1

                    }

                    var itemCell = document.createElement('td')

                    // here we check wether the item is a simple value or a key value pair and display it
                    
                    if(allItems[item].length == undefined && !Array.isArray(allItems[item])){
                        var itemText = document.createTextNode(item + ": " + allItems[item])
                    }else{
                        var itemText = document.createTextNode(allItems[item])
                    }

                    //appending the item to the table

                    itemCell.appendChild(itemText)
                    itemRow.appendChild(itemCell)
                    tBodyEl.appendChild(itemRow)
                    
                }
            }
        }   
    }
    // finally append the entire table to the body
    tableEl.appendChild(tBodyEl)
    document.body.appendChild(tableEl)

}


// DATABASE MODIFICATION //

/*
    Here are all the operations that are linked to database modification located in the local storage.

    This mostly consists of:
    - parsing and stringifying the json object that is the database
    - checking if certain values exist
    - adding or deleting said value


    With each item deeper in a given tree, the program gets more complex and nested.
    TODO: Write each check as a separate component instead of having a big megalofunction for item modification 
*/

/*
    Modify place
 Adds or deletes a place from local storage

*/

// TODO: case sensitivity validation for both

function modifyPlace(modType){
    var nameValue = document.getElementById("placeName").value
    document.body.innerHTML += nameValue
    
        switch(modType){
            case "Add":
                if(localStorage.getItem(nameValue) == null){ // checks if the place being added is a duplicate
                    localStorage.setItem(nameValue, "")
                    let places = localStorage.getItem('places').split(',')
                    places.push(nameValue)
                    localStorage.setItem('places', places.join())
                    
                }else{
                    document.body.innerHTML += "Place already exists." 
                }
            break;
            case "Del":
                if(localStorage.getItem(nameValue) != null){ // if the place being deleted even exists
                localStorage.removeItem(nameValue)
                document.body.innerHTML += "Storage structure " + nameValue + " has been removed."
                }else{
                    document.body.innerHTML += "This place doesn't exist"
                }
            break;
        }
    }









function modifyRoom(modType){
    // receives the place and room values from the DOM
    var place = document.getElementById("roomPlace").value
    var roomName = document.getElementById("roomName").value

    var allPlaces = Object.keys(localStorage)
    
    if(allPlaces.includes(place)){ //checks if the place exists

        if(localStorage.getItem(place) != ""){ // checks if the place is empty/string, if so replaces the empty place with an empty json object
            var placeData = JSON.parse(localStorage.getItem(place))
        }else{
            var placeData = {}
        }
        switch(modType){
            case "Add": // creates an empty room and saves changes
                placeData[roomName] = "" 
                localStorage.setItem(place, JSON.stringify(placeData))
            break;
            case "Del": // checks if the room exists
                var allRooms = Object.keys(placeData)
                if(allRooms.includes(roomName)){
                    // deletes the room and saves changes
                    delete placeData[roomName];
                    localStorage.setItem(place, JSON.stringify(placeData))
                }else{
                    document.body.innerHTML += "This room doesn't exist"
                }
            break;
        }
    }else{

        window.alert("The place " + place + " doesn't exist")

    }
}

function modifyFurniture(modType){
    
    var allPlaces = Object.keys(localStorage) 
    /*
    this line needs to be replaced replaced with localStorage.getItem('places'),
     since using this removes the chance of getting other saved variables as places
    */

    var place = document.getElementById('furniturePlace').value // receives the place's name

    // TODO: this could be it's own function, or better yet, make initial empty branches objects instead of empty strings
    if(allPlaces.includes(place)){
        if(localStorage.getItem(place) != ""){
            var placeData = JSON.parse(localStorage.getItem(place)) 
        }else{
            var placeData = {}
        }

    }

    if(Object.keys(placeData) != 0){ // checks if the chosen place has any rooms
        var allRooms = Object.keys(placeData)
    }else{
        window.alert("This place doesn't have any rooms.") // TODO: replace window alerts with a better method of informing the user of their actions
    }

    var room = document.getElementById('furnitureRoom').value // receives the room name
    if(allRooms.includes(room)){ // proceeds if the room exists
        
        var furnitureName = document.getElementById("furnitureName").value // receives the furniture value
        switch(modType){
            case "Add":
                placeData[room] = {} // changes the room into a json object
                placeData[room][furnitureName] = "" // creates the empty furniture object

                // updates database and informs the user that the action had succeeded
                localStorage.setItem(place, JSON.stringify(placeData))
                window.alert("Furniture successfuly added.")
            break;
            case "Del":
                //deletes the furniture object and updates the database
                delete placeData[room][furnitureName]

                localStorage.setItem(place, JSON.stringify(placeData))
                window.alert(furnitureName + " removed.")
            
            break;
        }
        

    }else{
        window.alert("That room doesn't exist.")
    }


}

// adds or deletes an item from local storage
function modifyItem(modType){

    var allPlaces = Object.keys(localStorage)
    var itemName = document.getElementById("itemName").value

    var place = document.getElementById("itemPlace").value

    // checks all the needed values( place -> room -> furniture ) before adding or deleting an item

    if(allPlaces.includes(place)){
        var data = JSON.parse(localStorage.getItem(place))
        var allRooms = Object.keys(data)
        var room = document.getElementById("itemRoom").value

        if(allRooms.includes(room)){
            var allFurniture = Object.keys(data[room])
            var furniture = document.getElementById('itemObject').value

            if(allFurniture.includes(furniture)){

                switch(modType){

                    case "Add":

                        if(data[room][furniture].length != undefined){ // if the furniture anything but an object, turns it into one
                            data[room][furniture]={}
                        }

                        if(data[room][furniture][itemName] == null){ // checks if the item exists
                            data[room][furniture][itemName] = 1 
                            // if it doesn't, there is now one of this item in this particular furniture object
                        }else{
                            data[room][furniture][itemName] += 1 //if it does we add another to the count 
                        }
                        
                        document.body.innerHTML += "ITEM STORED!"
                        // TODO: This is also a bad way of notifying the user of a completed task
                        localStorage.setItem(place, JSON.stringify(data))

                    break;
                    case "Del":

                        if(data[room][furniture][itemName] != null || data[room][furniture][itemName] > 0 ){ // if the item exists and isn't empty
                            if(data[room][furniture][itemName] - 1 != 0){ // and if there is more than one of it
                            data[room][furniture][itemName] -= 1 // subtract one of that item
                            }else{
                                delete data[room][furniture][itemName] 
                                // if the item fully depletes with this operation, remove it from the furniture object altogether
                                // TODO: Make persistent items, that stay in the furniture object after depletion and remind the user to replenish them
                            }

                        }else if(data[room][furniture][itemName] == undefined){ // if the item exists and is empty, delete it
                            delete data[room][furniture][itemName]
                        }
                        localStorage.setItem(place, JSON.stringify(data))

                    break;
            }
            }else{
                document.body.innerHTML += "Storage object doesn't exist"
            }


        }else{
            document.body.innerHTML += "Room doesn't exist"
        }
    
    }else{
        document.body.innerHTML += "Place doesn't exist"
    }



}


document.getElementById('traversal').onload = cycleDivs('modifyTab') // sets the base tab for traversal


/*

Cycle divs is the main function in charge of visual database traversal using the "traversal" divset.
It accepts with which it can decide which state to move on to. (Either back, or deeper into the current tree)

*/

function cycleDivs(currentDiv){

    var showDiv = document.getElementById(currentDiv) // the div that is displayed next

    // gets and hides the rest of the divs, unhiding the current one
    var allDivs = document.getElementsByClassName("dbDivs")

    for(divNum = 0; divNum < allDivs.length; divNum ++){

        allDivs[divNum].classList.add('modifyOptionsOff')
    }

    showDiv.classList.remove('modifyOptionsOff')

    switch(currentDiv){
        case "Places":
            // displays all places in the database
            generateFreshDiv("place", localStorage.getItem('places').split(','), showDiv)

        break;
        case "Rooms":
            //displays all rooms in a chosen place
            var data = JSON.parse(localStorage.getItem(getChosenPlace()))

            generateFreshDiv("room", Object.keys(data), showDiv)
            
        break;

        case "Objects":
            // displays all storage objects/furniture in a chosen place's chosen room
            var data = JSON.parse(localStorage.getItem(getChosenPlace()))

            generateFreshDiv("object", Object.keys(data[getChosenRoom()]), showDiv)
    
        break;

        case "Items":
            //displays all items from a chosen furniture piece

            var data = JSON.parse(localStorage.getItem(getChosenPlace()))

            if(data[getChosenRoom()][getChosenObject()].length == undefined){ 
            /* 
            checks if the item list is an object or an array
            TODO: Make all item lists object lists and allow the ability to add attributes to items
            */

                var items = Object.keys(data[getChosenRoom()][getChosenObject()])
            }else{
                var items = data[getChosenRoom()][getChosenObject()]
            }
            // creates the unordered list element that displays the items
            var listEl = document.createElement('ul')
            listEl.id ="itemList"
            

            for(itemName in items){

                var itemEl = document.createElement('li')
                /* checks the item list type again, at this point the only difference between list items is that one counts the items, 
                    while the other is only a string array, merely displaying the items presence*/
                if(data[getChosenRoom()][getChosenObject()].length != undefined){ 
                    itemEl.appendChild(document.createTextNode(items[itemName]))
                }else{
                    itemEl.appendChild(document.createTextNode(items[itemName] + ": " + data[getChosenRoom()][getChosenObject()][items[itemName]]))
                }
                listEl.appendChild(itemEl)
            }


            var prevItemList = document.getElementById("itemList")

            // appends or replaces the unordered list
            if(prevItemList == null){
                document.getElementById('Items').appendChild(listEl)
            }else{
                document.getElementById('Items').replaceChild(listEl, prevItemList)
            }
    }
}

// capitalizes a given word
function capitalizeWord(theWord){
    return theWord.replace(/^\w/, (c) => c.toUpperCase());
}

//Returns the next state of navigation
function getNextState(currentState){
    var states = ["Places", "Rooms", "Objects", "Items"]
    var currentIndex = states.indexOf(currentState)

    return states[currentIndex + 1]

}

/*
generateFreshDiv
Refreshes a traversal div's information
*/

function generateFreshDiv(caseType, dataObj, dumpDiv){

    //initializes the div that will hold the value buttons
    var buttons = document.createElement('div')

    buttons.id = caseType + "Buttons" // TODO: change this to .classList.add('')

    // Capitalizes the given case type and sets it up as a function name
    var capitalizedCase = capitalizeWord(caseType)
    var functionName = "setChosen" + capitalizedCase

    /* iterates through the items and assigns them:
            -their value from the database
            -their onclick function that sets the chosen variable for the given cases and
             has the user move on to the next traversal div
    */

    for(item in dataObj){
        newButton = document.createElement('button')
        newButton.onclick = function() {window[functionName](this.innerHTML); cycleDivs(getNextState(capitalizedCase + "s")) }
        newButton.appendChild(document.createTextNode(dataObj[item]))
        buttons.appendChild(newButton)
    }

    /* adds an "add" button to the end of the generated list
        TODO: implement these add buttons*/

    addButton = document.createElement('button')
    addText = document.createTextNode('+')
    addButton.appendChild(addText)
    buttons.appendChild(addButton)


    //chooses if it replaces or add the buttons div
    if(document.getElementById(caseType + "Buttons") == null){
        dumpDiv.appendChild(buttons)
    }else{
        dumpDiv.replaceChild(buttons, document.getElementById(caseType + 'Buttons'))
    }



}

// Setters and getters for each traversal variable choice

function setChosenPlace(placeName){
    localStorage.setItem("chosenPlace", placeName)
}

function getChosenPlace(){
    return localStorage.getItem("chosenPlace")
}

function setChosenRoom(roomName){
    localStorage.setItem("chosenRoom", roomName)
}

function getChosenRoom(){
    return localStorage.getItem("chosenRoom")
}

function setChosenObject(objectName){
    localStorage.setItem("chosenObject", objectName)
}

function getChosenObject(){
    return localStorage.getItem("chosenObject")
}

