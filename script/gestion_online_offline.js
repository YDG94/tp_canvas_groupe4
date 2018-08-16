"use strict";

let status = document.getElementById("online_state");
let message = document.getElementById("msg");

function updateOnlineStatus(evt) {
    if(navigator.onLine){
        console.log("online");
        status.checked = true;
        getSave();
    }
    else{
        console.log("offline");
        status.checked = false;
        window.localStorage.getItem("");
    }
    message.innerText+=evt.type;
}

window.addEventListener("online",updateOnlineStatus);
window.addEventListener("offline",updateOnlineStatus);

document.addEventListener("DOMContentLoaded",function (evt) {
    updateOnlineStatus(evt);
});