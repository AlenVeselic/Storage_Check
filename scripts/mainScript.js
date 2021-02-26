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
    allPlaces = Object.keys(localStorage)
    divEl = document.createElement('div')
    divEl.setAttribute('id',"display")

    tableEl = document.createElement("table")

    for(place in allPlaces){
        placeRow = document.createElement("tr")
        placeCell = document.createElement("td")
        placeText = document.createTextNode(allPlaces[place])

        placeCell.appendChild(placeText)
        placeRow.appendChild(placeCell)

        if(localStorage.getItem(places[place]) == "") continue

        data = JSON.parse(localStorage.getItem(places[place]))
        allRooms = Object.keys(data)
        newRow = document.createElement("tr")
        roomCell = document.createElement("td")

        for(room in allRooms){
            
        }





    }

}

function modifyPlace(modType){
    nameValue = document.getElementById("placeName").value
    document.body.innerHTML += nameValue
    
        switch(modType){
            case "Add":
                if(localStorage.getItem(nameValue) == null){
                    localStorage.setItem(nameValue, "")
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

