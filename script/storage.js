"use strict";

/* Liste des fonctions pour gérer les sauvgardes */

function save(nom_plan) {
    localStorage.setItem(nom_plan,JSON.stringify(document.querySelector('#plan').innerHTML));
}

function autoSave() {
    localStorage.setItem('auto_save',JSON.stringify(document.querySelector('#plan').innerHTML));
}

function deleteSave(nom_plan) {
    localStorage.removeItem(nom_plan);
}

function getSave(nom_plan) {
    let myPlan_json=localStorage.getItem(nom_plan);
    if (myPlan_json!==null){

        console.log(JSON.parse(myPlan_json));
        document.querySelector('#plan').innerHTML=JSON.parse(myPlan_json);
    } else{
        document.querySelector('#plan').innerHTML="<p>Aucun plan n'a été chargé.</p>";
    }
}

function getAutoSave() {
    let myPlan_json=localStorage.getItem('auto_save');
    if (myPlan_json!==null){

        console.log(JSON.parse(myPlan_json));
        document.querySelector('#plan').innerHTML=JSON.parse(myPlan_json);
    } else{
        document.querySelector('#plan').innerHTML="<p>Aucun plan n'a été chargé.</p>";
    }
}
