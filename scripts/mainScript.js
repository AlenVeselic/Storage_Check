/*
This script holds most of the web app code. Thinking wether I want to separate this script which is mostly
database interaction and the future grocery list assembly code for greater readability, since this one is already
almost 600 lines long. I also have to move the display methods to cssScript eventually.
*/


/*
This check wether a database already exists, if it doesn't it establishes an example base.
*/
if (localStorage.getItem("myHouse") == null){
    document.write("The db is empty")
    db = {
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
This gets each div in traversal and assigns the appropriate listeners with functions for each
*/
traversalDivs = document.getElementById("traversal").getElementsByTagName('div')

for(elNum = 0; elNum < traversalDivs.length; elNum ++){
    if(traversalDivs[elNum].hasAttribute('id')){
    switch(traversalDivs[elNum].id){
        case "Places":

        buttonEl = traversalDivs[elNum].getElementsByClassName('back')[0]
        buttonEl.onclick = function () {

                                        setChosenPlace("");
                                        cycleDivs('modifyTab')

                                        }

        break;
        case "Rooms":

            buttonEl = traversalDivs[elNum].getElementsByClassName('back')[0]
            buttonEl.onclick = function () {
    
                                            setChosenRoom("");
                                            cycleDivs('Places')
    
                                            }


        break;
        case "Objects":

            buttonEl = traversalDivs[elNum].getElementsByClassName('back')[0]
            buttonEl.onclick = function () {
    
                                            setChosenObject("");
                                            cycleDivs('Rooms')
    
                                            }
        
        break;
        case "Items":
            buttonEl = traversalDivs[elNum].getElementsByClassName('back')[0]
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



    allPlaces = [] // save an empty array to store places in
    //get all the places from the "places" key in localstorage and split them by commas
    allPlaces = localStorage.getItem('places').split(',')
    // create the div that would hold the entire database display and give it the appropriate id value
    divEl = document.createElement('div') 
    divEl.setAttribute('id',"display")

    //empty table creation
    tableEl = document.createElement("table")
    tBodyEl = document.createElement("tbody")

    for(place in allPlaces){ // loop through each place
        placeRow = document.createElement("tr") // create a row for each place
        placeCell = document.createElement("td") // create a cell for each place
        placeText = document.createTextNode(allPlaces[place]) // create the current places text node

        hrRow = document.createElement('tr') //create a row specifically to put a horizontal line in


        /*
        This loop divides the contents of the table by filling up a row with horizontal lines.
        TODO: This could also be done by assigning a border to the bottom of each place row.
        */
        i = 4
        while(i != 0){

            hrEl= document.createElement('hr')
            hrCell = document.createElement('td')
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
        data = JSON.parse(localStorage.getItem(allPlaces[place]))
        allRooms = Object.keys(data)
        emptyRow = document.createElement('tr')
        tBodyEl.appendChild(emptyRow)

        


        for(room in allRooms){ // loops through each room displaying it's data
            //creates a row for the current room, a cell instance for then first empty cell, and a cell instance for the room's name
            newRow = document.createElement("tr")
            emptyCell = document.createElement("td")
            roomCell = document.createElement("td")
            roomName = document.createTextNode(allRooms[room])
            
            //appends the aforementioned cells to the row and the row to the table
            roomCell.appendChild(roomName)
            newRow.appendChild(emptyCell)
            newRow.appendChild(roomCell)

            tBodyEl.appendChild(newRow)

            //gets the rooms object keys and creates a new row, appending it to the table
            allObjects = Object.keys(data[allRooms[room]])
            freshRow = document.createElement("tr")
            tBodyEl.appendChild(freshRow)

            for(object in allObjects){ // loops through each object in the room

                //creates a row for the object and adds two empty spaces in front of it's name cell
                objectRow = document.createElement("tr")
                i = 2
                while(i != 0){

                    emptyCell = document.createElement('td')
                    objectRow.appendChild(emptyCell)

                    i -= 1;

                }

                /*
                Creates and appends the objects name cell
                */
                objectCell = document.createElement('td')
                objectText = document.createTextNode(allObjects[object])

                objectCell.appendChild(objectText)
                objectRow.appendChild(objectCell)

                tBodyEl.appendChild(objectRow)

                // checks wether the object is an array or a json object
                if(data[allRooms[room]][allObjects[object]] == undefined){ //if it's json it gets its keys
                allItems = Object.keys(data[allRooms[room]][allObjects[object]])
                }else{
                    allItems = data[allRooms[room]][allObjects[object]]// otherwise it gets its value
                }



                for(item in allItems){ // loops through every item in the object
                    //creates the row for the item and similarly to all previous rows adds 3 spaces in front of the value this time
                    itemRow = document.createElement('tr')
                    i = 3
                    while(i != 0){

                        emptyCell = document.createElement('td')
                        itemRow.appendChild(emptyCell)

                        i -= 1

                    }

                    itemCell = document.createElement('td')

                    // here we check wether the item is a simple value or a key value pair and display it
                    
                    if(allItems[item].length == undefined && !Array.isArray(allItems[item])){
                        itemText = document.createTextNode(item + ": " + allItems[item])
                    }else{
                        itemText = document.createTextNode(allItems[item])
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


//TODO: Continue comment addition


function modifyPlace(modType){
    nameValue = document.getElementById("placeName").value
    document.body.innerHTML += nameValue
    
        switch(modType){
            case "Add":
                if(localStorage.getItem(nameValue) == null){
                    localStorage.setItem(nameValue, "")
                    places = localStorage.getItem('places').split(',')
                    places.push(nameValue)
                    localStorage.setItem('places', places.join())
                    
                }else{
                    document.body.innerHTML += "Place already exists."
                }
            break;
            case "Del":
                if(localStorage.getItem(nameValue) != null){
                localStorage.removeItem(nameValue)
                document.body.innerHTML += "Storage structure " + nameValue + " has been removed."
                }else{
                    document.body.innerHTML += "This place doesn't exist"
                }
            break;
        }
    }



function modifyRoom(modType){
    place = document.getElementById("roomPlace").value
    roomName = document.getElementById("roomName").value

    allPlaces = Object.keys(localStorage)
    
    if(allPlaces.includes(place)){

        if(localStorage.getItem(place) != ""){
        placeData = JSON.parse(localStorage.getItem(place))
        }else{
           placeData = {}
        }
        switch(modType){
            case "Add":
                placeData[roomName] = ""
                localStorage.setItem(place, JSON.stringify(placeData))
            break;
            case "Del":
                allRooms = Object.keys(placeData)
                if(allRooms.includes(roomName)){
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
    
    allPlaces = Object.keys(localStorage)

    place = document.getElementById('furniturePlace').value

    if(allPlaces.includes(place)){
        if(localStorage.getItem(place) != ""){
        placeData = JSON.parse(localStorage.getItem(place)) 
        }else{
            placeData = {}
        }

    }
    if(Object.keys(placeData) != 0){
        allRooms = Object.keys(placeData)
    }else{
        window.alert("This place doesn't have any rooms.")
    }

    room = document.getElementById('furnitureRoom').value
    if(allRooms.includes(room)){
        

        furnitureName = document.getElementById("furnitureName").value
        switch(modType){
            case "Add":
                placeData[room] = {}
                placeData[room][furnitureName] = ""

                localStorage.setItem(place, JSON.stringify(placeData))
                window.alert("Furniture successfuly added.")
            break;
            case "Del":
                delete placeData[room][furnitureName]

                localStorage.setItem(place, JSON.stringify(placeData))
                window.alert(furnitureName + " removed.")
            
            break;
        }
        

    }else{
        window.alert("That room doesn't exist.")
    }


}

function modifyItem(modType){
    allPlaces = Object.keys(localStorage)
    itemName = document.getElementById("itemName").value

    place = document.getElementById("itemPlace").value

    if(allPlaces.includes(place)){
        data = JSON.parse(localStorage.getItem(place))
        allRooms = Object.keys(data)
        room = document.getElementById("itemRoom").value

        if(allRooms.includes(room)){
            allFurniture = Object.keys(data[room])
            furniture = document.getElementById('itemObject').value
            if(allFurniture.includes(furniture)){

                switch(modType){

                    case "Add":

                if(data[room][furniture].length != undefined){
                data[room][furniture]={}
                }
                if(data[room][furniture][itemName] == null){
                data[room][furniture][itemName] = 1
                }else{
                data[room][furniture][itemName] += 1    
                }

                document.body.innerHTML += "ITEM STORED!"
                localStorage.setItem(place, JSON.stringify(data))
                break;
                case "Del":

                if(data[room][furniture][itemName] != null || data[room][furniture][itemName] > 0 ){
                    if(data[room][furniture][itemName] - 1 != 0){
                    data[room][furniture][itemName] -= 1
                    }else{
                        delete data[room][furniture][itemName]
                    }

                }else if(data[room][furniture][itemName] == undefined){
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

document.getElementById('traversal').onload = cycleDivs('modifyTab')

function cycleDivs(currentDiv){

    showDiv = document.getElementById(currentDiv)

    allDivs = document.getElementsByClassName("dbDivs")

    for(divNum = 0; divNum < allDivs.length; divNum ++){

        allDivs[divNum].classList.add('modifyOptionsOff')
    }

    showDiv.classList.remove('modifyOptionsOff')

    switch(currentDiv){
        case "Places":

            generateFreshDiv("place", localStorage.getItem('places').split(','))

           /* if(document.getElementById("placeButtons") == null){
            buttons = document.createElement('div')
            buttons.id = "placeButtons"
            allPlaces = localStorage.getItem('places').split(',')

            
            for(place in allPlaces){
                newButton = document.createElement('button')
                newButton.onclick = function() {setChosenPlace(this.innerHTML); cycleDivs("Rooms");}
                newButton.appendChild(document.createTextNode(allPlaces[place]))
                buttons.appendChild(newButton)
            }


            showDiv.appendChild(buttons)
        } */
        break;
        case "Rooms":

            data = JSON.parse(localStorage.getItem(getChosenPlace()))

            generateFreshDiv("room", Object.keys(data))
            
        /*
                buttons = document.createElement('div')
                buttons.id = "roomButtons"

                if(localStorage.getItem(getChosenPlace()) != ""){
                    data = JSON.parse(localStorage.getItem(getChosenPlace()))
                
                    allRooms = Object.keys(data)

                    for(room in allRooms){
                        newButton = document.createElement('button')
                        newButton.onclick = function() {setChosenRoom(this.innerHTML); cycleDivs("Objects") }
                        newButton.appendChild(document.createTextNode(allRooms[room]))
                        buttons.appendChild(newButton)
                    }
                }else{
                    buttons.innerHTML += "This place is empty"
                }
            if(document.getElementById("roomButtons") == null){
                showDiv.appendChild(buttons)
            }else{
                showDiv.replaceChild(buttons, document.getElementById('roomButtons'))
            }
            */
        break;

        case "Objects":

            data = JSON.parse(localStorage.getItem(getChosenPlace()))

            generateFreshDiv("object", Object.keys(data[getChosenRoom()]))
    
        break;

        case "Items":
            data = JSON.parse(localStorage.getItem(getChosenPlace()))

            if(data[getChosenRoom()][getChosenObject()].length == undefined){

            items = Object.keys(data[getChosenRoom()][getChosenObject()])
            }else{
                items = data[getChosenRoom()][getChosenObject()]
            }

            listEl = document.createElement('ul')
            listEl.id ="itemList"
            

            for(itemName in items){

                itemEl = document.createElement('li')

                if(data[getChosenRoom()][getChosenObject()].length != undefined){
                    itemEl.appendChild(document.createTextNode(items[itemName]))
                }else{
                    itemEl.appendChild(document.createTextNode(items[itemName] + ": " + data[getChosenRoom()][getChosenObject()][items[itemName]]))
                }
                listEl.appendChild(itemEl)
            }


            prevItemList = document.getElementById("itemList")

            if(prevItemList == null){
                document.getElementById('Items').appendChild(listEl)
            }else{
                document.getElementById('Items').replaceChild(listEl, prevItemList)
            }
    }
}

function capitalizeWord(theWord){
    return theWord.replace(/^\w/, (c) => c.toUpperCase());
}

function getNextState(currentState){
    states = ["Places", "Rooms", "Objects", "Items"]
    currentIndex = states.indexOf(currentState)

    return states[currentIndex + 1]

}


function generateFreshDiv(caseType, dataObj){

    buttons = document.createElement('div')

    buttons.id = caseType + "Buttons"

    capitalizedCase = capitalizeWord(caseType)
    functionName = "setChosen" + capitalizedCase


    for(item in dataObj){
        newButton = document.createElement('button')
        newButton.onclick = function() {window[functionName](this.innerHTML); cycleDivs(getNextState(capitalizedCase + "s")) }
        newButton.appendChild(document.createTextNode(dataObj[item]))
        buttons.appendChild(newButton)
    }


    addButton = document.createElement('button')
    addText = document.createTextNode('+')
    addButton.appendChild(addText)
    buttons.appendChild(addButton)


    if(document.getElementById(caseType + "Buttons") == null){
        showDiv.appendChild(buttons)
    }else{
        showDiv.replaceChild(buttons, document.getElementById(caseType + 'Buttons'))
    }



}

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

