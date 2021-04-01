
/**
 * Description
 * @authors Alen Veselič ()
 * @version 1.0.0
 */

/*
This script's purpose is visual dom manipulation. At this point it's empty save for the toggling mechanism in 
the debug way of modifying the database.
*/

function toggleOptions(elementId){
    toggledEl = document.getElementById(elementId)

    toggledEl.classList.toggle("modifyOptionsOn")
}

