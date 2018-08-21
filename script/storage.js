"use strict";

/******************** Variables et autres DOM elements *********************/
let btn_save = document.querySelector('#btn_save');
let btn_load = document.querySelector('#btn_load');
let btn_delete = document.querySelector('#btn_delete');
/****************************************************************************/

/****************************************************************************/

/******************* Fonction pour generer la liste des plans ********************/
function getArray() {
    let div_plans = document.querySelector('#projectTree');
    for (let i = 0; i < localStorage.length; i++) {
        let p = document.createElement('p');
        p.classList.add('list');
        p.innerText = localStorage.key(i);
        div_plans.appendChild(p);
    }
}

function displayArray() {
    for (let i = 0; i < localStorage.length; i++) {
        console.log(`dans le tableau : ${localStorage.key(i)}`);
    }
}

/********************************************************************************/

/********************************************************************************/

/***************** Liste des fonctions de base pour gérer les sauvgardes et chargements *****************/
function save(nom_plan) {
    localStorage.setItem(nom_plan, JSON.stringify(document.querySelector('#plan').innerHTML));
}

function autoSave() {
    if (localStorage.includes('auto_save')) {
        deleteSave('auto_save');
        localStorage.setItem('auto_save', JSON.stringify(document.querySelector('#plan').innerHTML));
    } else {
        localStorage.setItem('auto_save', JSON.stringify(document.querySelector('#plan').innerHTML));
    }
}

function deleteSave(nom_plan) {
    localStorage.removeItem(nom_plan);
}

function getSave(nom_plan) {
    let myPlan_json = localStorage.getItem(nom_plan);
    if (myPlan_json !== null) {
        console.log(JSON.parse(myPlan_json));
        document.querySelector('#plan').innerHTML = "";
        document.querySelector('#plan').innerHTML = JSON.parse(myPlan_json);
        // Brancher les listeners sur les images rechargees pour les transformations
        let planSVG = SVG('#SvgjsSvg1008');
        let centerImages = planSVG.select('image');
        console.log(centerImages);
        centerImages.draggable();
        trasformationFunction(centerImages);

    } else {
        if (localStorage.getItem('auto_save') !== null) {
            document.querySelector('#plan').innerHTML = getAutoSave;
        }
    }
}

function getAutoSave() {
    let myPlan_json = localStorage.getItem('auto_save');
    if (myPlan_json !== null) {
        console.log(JSON.parse(myPlan_json));
        document.querySelector('#plan').innerHTML = "";
        document.querySelector('#plan').innerHTML = JSON.parse(myPlan_json);
        // Brancher les listeners sur les images rechargees pour les transformations
        let planSVG = SVG('#SvgjsSvg1008');
        let centerImages = planSVG.select('image');
        console.log(centerImages);
        centerImages.draggable();
        trasformationFunction(centerImages);
    } else {
        document.querySelector('#plan').innerHTML = "<p>Aucun plan n'a été chargé.</p>";
    }
}

/***********************************************************************************************/

/***********************************************************************************************/

/********* Liste des fonctions pour mise en situation des fonctions précédentes ****************/
// Sauvegarde manuelle d'un plan
function letSave() {
    let plan_name = window.prompt('Enter a blue-print name', 'plan');
    if (plan_name !== null && plan_name !== "") {
        console.log(plan_name);
        save(plan_name);
    }
}

// Chargement manuel d'un plan
function loadPlan() {
    let list_plans = document.getElementsByClassName('list');
    console.log(list_plans);
    for (let plan of list_plans) {
        plan.addEventListener('click', function () {
            getSave(plan.innerText);
        });
    }
}

// Suppresion d'un plan
function deletePlan() {
    let list_plans = document.getElementsByClassName('list');
    for (let plan of list_plans) {
        plan.addEventListener('dblclick', function () {
            if (window.confirm('You are going to delete your blue-print, are you sure ?')) {
                deleteSave(plan.innerText);
            }
        });
    }
}

/********************************************************************************************************/

/********************************************************************************************************/

// Branchement des listeners de type click sur les icones de sauvegarde , chargement et suppresion
btn_save.addEventListener('click', function () {
    letSave();
    //getArray();

});

btn_load.addEventListener('click',loadPlan);

btn_delete.addEventListener('click', function () {
    deletePlan();
    //getArray();
});

// Branchement du listener pour la sauvegarde auto au moment de la fermeture de la page
//window.onunload = autoSave;

// Branchement du listener pour le chargement de la sauvegarde auto
//window.onload = getAutoSave;

// Branchement du listener pour le chargement de la liste des plans
window.addEventListener('change', getArray);
window.addEventListener('load', getArray);




