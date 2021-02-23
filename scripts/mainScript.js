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
}else{
    document.write("db loaded")
    db = localStorage.getItem("myHouse")
    parsd = JSON.parse(db)
    for (x in parsd){
        document.write(x)
        for(y in parsd[x]){
            document.write(y)
        }
    }
}

if(!window.indexedDB) {

    document.write("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
}

var db
request = indexedDB.open("Jenga")

request.onerror = function(event){
    console.log("How dare you not allow me to make a base of data")
}

request.onsuccess = function(event){
    db = event.target.result;
    document.body.innerHTML +="hah"
}

db.onerror = function(event) {
    console.error("Database error: " + event.target.errorCode);
}