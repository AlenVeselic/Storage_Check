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
                for (object in storedItems){
                    objectItem = document.createElement('li')
                    objectItem.appendChild(document.createTextNode(storedItems[object]))
                    storedItemList.appendChild(objectItem)
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
