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