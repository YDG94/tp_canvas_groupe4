"use strict";

/******************** Variables et autres DOM elements *********************/
let btn_save = document.getElementsByClassName('btn_icon')[0];
let btn_delete = document.getElementsByClassName('btn_icon')[3];
let div_plans = document.querySelector('#projectTree');
let tab_plans = [];

/****************************************************************************/

/****************************************************************************/

/******************* Fonction pour gerer les tableaux ********************/
function getArray() {
    for (let i = 0; i < tab_plans.length; i++) {
        let p = document.createElement('p');
        p.classList.add('list');
        p.innerText = tab_plans[i];
        div_plans.appendChild(p);
    }
}

/********************************************************************************/

/********************************************************************************/

/***************** Liste des fonctions de base pour gérer les sauvgardes et chargements *****************/
function save(nom_plan) {
    localStorage.setItem(nom_plan, JSON.stringify(document.querySelector('#plan').innerHTML));
    tab_plans.push(nom_plan);
}

function autoSave() {
    localStorage.setItem('auto_save', JSON.stringify(document.querySelector('#plan').innerHTML));
    tab_plans.push('auto_save');
}

function deleteSave(nom_plan) {
    localStorage.removeItem(nom_plan);
    tab_plans = tab_plans.filter(item => item !== nom_plan);
}

function getSave(nom_plan) {
    let myPlan_json = localStorage.getItem(nom_plan);
    if (myPlan_json !== null) {
        console.log(JSON.parse(myPlan_json));
        document.querySelector('#plan').innerHTML = "";
        document.querySelector('#plan').innerHTML = JSON.parse(myPlan_json);
        /* Brancher les listeners sur les images rechargees pour les transformations */
        /* centerImages = planSVG.select('image');
         console.log(centerImages);
         centerImages.draggable({
             minX: 20
             , minY: window.innerHeight * 30 /100
             , maxX: window.innerWidth * 20.5/100
             , maxY: window.innerHeight * 58/100
             , snapToGrid: 5
         });
         trasformationFunction(centerImages);
         */
    } else {
        document.querySelector('#plan').innerHTML = "<p>Aucun plan n'a été chargé.</p>";
    }
}

function getAutoSave() {
    let myPlan_json = localStorage.getItem('auto_save');
    if (myPlan_json !== null) {
        console.log(JSON.parse(myPlan_json));
        document.querySelector('#plan').innerHTML = "";
        document.querySelector('#plan').innerHTML = JSON.parse(myPlan_json);
        /* Brancher les listeners sur les images rechargees pour les transformations */
        /* centerImages = planSVG.select('image');
         console.log(centerImages);
         centerImages.draggable({
             minX: 20
             , minY: window.innerHeight * 30 /100
             , maxX: window.innerWidth * 20.5/100
             , maxY: window.innerHeight * 58/100
             , snapToGrid: 5
         });
         trasformationFunction(centerImages);
         */
    } else {
        document.querySelector('#plan').innerHTML = "<p>Aucun plan n'a été chargé.</p>";
    }
}

/***********************************************************************************************/

/***********************************************************************************************/

/********* Liste des fonctions pour mise en situation des fonctions précédentes ****************/

// Mise en place sauvegarde manuelle
function letSave() {
    let plan_name = window.prompt('Enter a blue-print name', 'plan');
    if (plan_name !== null && plan_name !== '') {
        console.log(plan_name);
        save(plan_name);
    }
}

// Chargement manuel d'un plan
function loadPlan() {
    let list_plans = document.getElementsByClassName('list');
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

// Branchement des listener sde type click sur les icones de sauvegarde et suppresion
btn_save.addEventListener('click', letSave);
btn_delete.addEventListener('click', deletePlan);

// Branchement du listener pour la sauvegarde auto au moment de la fermeture de la page
window.onunload = autoSave;

// Chargement de la sauvegarde auto
window.onload = getAutoSave;

// Chargement de la liste des plans au moment du chargement
window.onload = getArray;







