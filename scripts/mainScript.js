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

function displayDatabase(){
    places = Object.keys(localStorage)
    for(place in places){
        headerEl = document.createElement('h4')
        headText = document.createTextNode(places[place])
        headerEl.appendChild(headText)
        document.body.appendChild(headerEl)
        
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
        document.body.appendChild(pElement)
    }
}

function addPlace(){
    nameValue = document.getElementById("field").value
    document.body.innerHTML += nameValue
    if(localStorage.getItem(nameValue) == null){
        localStorage.setItem(nameValue, "")
    }

}

function addRoom(){
    place = prompt("Which place are you adding this room to?")
    roomName = document.getElementById("field").value

    allPlaces = Object.keys(localStorage)

    if(allPlaces.includes(place)){
        if(localStorage.getItem(place) != ""){
        placeData = JSON.parse(localStorage.getItem(place))
        }else{
           placeData = {}
        }
        placeData[roomName] = ""
        localStorage.setItem(place, JSON.stringify(placeData))
    }else{

        window.alert("The place " + place + " doesn't exist")

    }
}

function addFurniture(){
    
    allPlaces = Object.keys(localStorage)

    place = prompt("Which place would you like to add this piece of furniture?")

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

    room = prompt("Which room in " + place + " would you like to add this piece of furniture?")
    if(allRooms.includes(room)){
    furnitureName = document.getElementById("field").value
    placeData[room] = {}
    placeData[room][furnitureName] = ""

    localStorage.setItem(place, JSON.stringify(placeData))
    window.alert("Furniture successfuly added.")

    }else{
        window.alert("That room doesn't exist.")
    }


}

function addItem(){
    allPlaces = Object.keys(localStorage)
    itemName = document.getElementById("field").value

    place = prompt("Which place would you like to add this item to?")

    if(allPlaces.includes(place)){
        data = JSON.parse(localStorage.getItem(place))
        allRooms = Object.keys(data)
        room = prompt("Which room would you like to add your item to?")

        if(allRooms.includes(room)){
            allFurniture = Object.keys(data[room])
            furniture = prompt("Which piece of furniture will store " + itemName +" ?")
            if(allFurniture.includes(furniture)){
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