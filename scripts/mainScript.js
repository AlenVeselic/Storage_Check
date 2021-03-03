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

// localStorage.setItem("places", "Treehouse,Garage,myHouse,Fort")

function displayDatabaseObs(){
    places = Object.keys(localStorage)
    divEl = document.createElement('div')
    divEl.setAttribute('id',"display")
    for(place in places){
        headerEl = document.createElement('h4')
        headText = document.createTextNode(places[place])
        headerEl.appendChild(headText)
        divEl.appendChild(headerEl)
        
        if(localStorage.getItem(places[place]) == "") continue

        data = JSON.parse(localStorage.getItem(places[place]))
        keysOne = Object.keys(data)
        pElement = document.createElement('p')
        for (item in keysOne){
            pElement.appendChild(document.createTextNode(keysOne[item]))
            pElement.appendChild(document.createElement('br'))
            roomObjects = Object.keys(data[keysOne[item]])
            listElement = document.createElement("ul")
            for (objectNum in roomObjects){
                listItem = document.createElement("li")
                listItem.appendChild(document.createTextNode(roomObjects[objectNum]))

                storedItems = data[keysOne[item]][roomObjects[objectNum]]
                storedItemList = document.createElement('ul')
                if(storedItems.length != undefined ){
                    for (object in storedItems){
                        objectItem = document.createElement('li')
                        objectItem.appendChild(document.createTextNode(storedItems[object]))
                        storedItemList.appendChild(objectItem)
                    }
                }else{
                    allItems = Object.keys(storedItems)

                    for(item in allItems){
                        objectItem = document.createElement('li')
                        objectItem.appendChild(document.createTextNode(allItems[item] + ": " + storedItems[allItems[item]]))
                        storedItemList.appendChild(objectItem)
                    }
                }
                
                listItem.appendChild(storedItemList)

                listElement.appendChild(listItem)

                
            }
            pElement.appendChild(listElement)
            pElement.appendChild(document.createElement('br'))
        }

        divEl.appendChild(pElement)


        prevDisplay = document.getElementById('display')

        if(prevDisplay == null){
            document.body.appendChild(divEl)
        }else if(prevDisplay != null){
            document.body.replaceChild(divEl, prevDisplay)
        }
        
    }
}

function displayDatabase(){
    allPlaces = []
    allPlaces = localStorage.getItem('places').split(',')
    divEl = document.createElement('div')
    divEl.setAttribute('id',"display")

    tableEl = document.createElement("table")
    tBodyEl = document.createElement("tbody")

    for(place in allPlaces){
        placeRow = document.createElement("tr")
        placeCell = document.createElement("td")
        placeText = document.createTextNode(allPlaces[place])

        hrRow = document.createElement('tr')
        i = 4
        while(i != 0){

            hrEl= document.createElement('hr')
            hrCell = document.createElement('td')
            hrCell.appendChild(hrEl)
            hrRow.appendChild(hrCell)

            i -= 1

        }

        

        placeCell.appendChild(placeText)
        placeRow.appendChild(placeCell)
        tBodyEl.appendChild(hrRow)
        tBodyEl.appendChild(placeRow)
        

        

        if(localStorage.getItem(allPlaces[place]) == "") continue

        data = JSON.parse(localStorage.getItem(allPlaces[place]))
        allRooms = Object.keys(data)
        emptyRow = document.createElement('tr')
        tBodyEl.appendChild(emptyRow)

        


        for(room in allRooms){
            newRow = document.createElement("tr")
            emptyCell = document.createElement("td")
            roomCell = document.createElement("td")
            roomName = document.createTextNode(allRooms[room])
            
            
            roomCell.appendChild(roomName)
            newRow.appendChild(emptyCell)
            newRow.appendChild(roomCell)

            tBodyEl.appendChild(newRow)

            allObjects = Object.keys(data[allRooms[room]])
            freshRow = document.createElement("tr")
            tBodyEl.appendChild(freshRow)

            for(object in allObjects){

                objectRow = document.createElement("tr")
                i = 2
                while(i != 0){

                    emptyCell = document.createElement('td')
                    objectRow.appendChild(emptyCell)

                    i -= 1;

                }

                objectCell = document.createElement('td')
                objectText = document.createTextNode(allObjects[object])

                objectCell.appendChild(objectText)
                objectRow.appendChild(objectCell)

                tBodyEl.appendChild(objectRow)

                if(data[allRooms[room]][allObjects[object]] == undefined){
                allItems = Object.keys(data[allRooms[room]][allObjects[object]])
                }else{
                    allItems = data[allRooms[room]][allObjects[object]]
                }



                for(item in allItems){
                    itemRow = document.createElement('tr')
                    i = 3
                    while(i != 0){

                        emptyCell = document.createElement('td')
                        itemRow.appendChild(emptyCell)

                        i -= 1

                    }

                    itemCell = document.createElement('td')
                    
                    if(allItems[item].length == undefined && !Array.isArray(allItems[item])){
                        itemText = document.createTextNode(item + ": " + allItems[item])
                    }else{
                        itemText = document.createTextNode(allItems[item])
                    }

                    
                    itemCell.appendChild(itemText)
                    itemRow.appendChild(itemCell)
                    tBodyEl.appendChild(itemRow)
                    

                    

                }






            }




         
        }
        
        
    }
    
    tableEl.appendChild(tBodyEl)
    document.body.appendChild(tableEl)

}

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
            if(document.getElementById("placeButtons") == null){
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
        }
        break;
        case "Rooms":

            

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


function generateFreshDiv(caseType, dataObj){

    buttons = document.createElement('div')

    buttons.id = caseType + "Buttons"

    functionName = "setChosen" + capitalizeWord(caseType)


    for(item in dataObj){
        newButton = document.createElement('button')
        newButton.onclick = function() {window[functionName](this.innerHTML); cycleDivs("Items") }
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

