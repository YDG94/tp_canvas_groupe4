"use strict";

/* Variables et autres DOM elements */
let btn_save = document.getElementsByClassName('btn_icon')[0];
let div_plans = document.querySelector('#projectTree');
let tab_plans = [];

/* Initialise la zone de liste avec un tableau */
function populate() {
    for (let i = 0; i < localStorage.length; i++) {
        let p = document.createElement('p');
        p.classList.add('list');
        p.innerText = localStorage.key(i);
        div_plans.appendChild(p);
    }
}

/* Liste des fonctions pour gérer les sauvgardes et chargements*/
function save(nom_plan) {
    localStorage.setItem(nom_plan, JSON.stringify(document.querySelector('#plan').innerHTML));
}

function autoSave() {
    localStorage.setItem('auto_save', JSON.stringify(document.querySelector('#plan').innerHTML));
}

function deleteSave(nom_plan) {
    localStorage.removeItem(nom_plan);
}

function getSave(nom_plan) {
    let myPlan_json = localStorage.getItem(nom_plan);
    if (myPlan_json !== null) {
        console.log(JSON.parse(myPlan_json));
        document.querySelector('#plan').innerHTML ="";
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
        document.querySelector('#plan').innerHTML ="";
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

/* Mise en place sauvegarde manuelle */
function msg() {
    let plan_name = window.prompt('Enter a blue-print name', 'plan');
    if (plan_name.toString() !== null || plan_name !== '') {
        if (tab_plans !== null || tab_plans.length > 0) {
            for (let i = 0; i < tab_plans.length; i++) {
                div_plans.removeChild(document.getElementsByClassName('list')[i]);
            }
        }
        tab_plans.push(plan_name);
        console.log(plan_name);
        save(plan_name);
    }
}

/* Chargement de la liste des plans avant le chargement */
window.beforeunload = populate();

// Chargement manuel d'un plan
let list_plans = document.getElementsByClassName('list');
for (let plan of list_plans) {
    plan.addEventListener('click', function () {
        getSave(plan.innerText);
    });
}

//Suppresion d'un plan
for (let plan of list_plans) {
    plan.addEventListener('dblclick', function () {
        let choix = window.alert('You are going to delete tour blue-print');
        //deleteSave(plan.innerText);
    });
}

//localStorage.clear();





