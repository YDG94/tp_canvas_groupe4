"use strict";

/******************** Variables et autres DOM elements *********************/
let btn_save = document.querySelector('#btn_save');
let btn_load = document.querySelector('#btn_load');
let btn_delete = document.querySelector('#btn_delete');

let rotationSliderDOM = document.querySelector("#degreeController");
let zoomSliderDom = document.querySelector("#sizeController");
let libelle = document.querySelector("#libelle");

let rotationSliderSVG = SVG.adopt(rotationSliderDOM);
let zoomSliderSVG = SVG.adopt(zoomSliderDom);
let libelleSVG = SVG.adopt(libelle);
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

function loadArray() {
    window.addEventListener('load', getArray);
}

/********************************************************************************/

/********************************************************************************/

/********************** Fonctions pur les transformations ************************/
let trasformationFunction = function (setArrayOfImages) {
    setArrayOfImages.on("click", function (evt) {

        setArrayOfImages.each(function (i) {
            this.parent().unfilter();
        });

        this.parent().filter(function (add) {
            let blur = add.offset(0, 3).in(add.sourceAlpha).gaussianBlur(3);

            add.blend(add.source, blur);
        });
        //rect.move('5%', 0);
        let _this = this;
        /* il faut debrancher le listener pour input sur tous les images
         pour le rebrancher seulment sur le "this" de ce click-ci */
        rotationSliderSVG.off("input");
        zoomSliderSVG.off("input");
        libelleSVG.off("keyup");
        rotationSliderSVG.on("input", function (event) {
            let myDegree = event.target.value;
            console.log(myDegree);
            _this.rotate(myDegree);
        });
        zoomSliderSVG.on("input", function (event) {
            let scale = event.target.value;
            //calculate new scale and apply!
            _this.size(scale + "vh", scale + "vh");
        });

        libelleSVG.on("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                console.log("Libelle: " + event.target.value);
                let g = _this.parent();
                g.children()[1].clear();
                g.children()[1].text(event.target.value).fill(document.getElementById("couleur").value).y(-25);
            }

        });
    });
};
/*************************************************************************************************************/

/************************************************************************************************************/

/***************** Liste des fonctions de base pour gérer les sauvgardes et chargements *****************/
function save(nom_plan) {
    localStorage.setItem(nom_plan, JSON.stringify(document.querySelector('#plan').innerHTML));
}

function autoSave() {
    localStorage.setItem('auto_save', JSON.stringify(document.querySelector('#plan').innerHTML));
}

function deleteSave(nom_plan) {
    alert(`${nom_plan} is deleted`);
    localStorage.removeItem(nom_plan);
}

function getSave(nom_plan) {
    let myPlan_json = localStorage.getItem(nom_plan);
    if (myPlan_json !== null) {
        alert(`${nom_plan} is loaded`);
        console.log(JSON.parse(myPlan_json));
        document.querySelector('#plan').innerHTML = "";
        document.querySelector('#plan').innerHTML = JSON.parse(myPlan_json);
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
        alert(`${plan_name} is saved`);
        save(plan_name);
        location.reload(true);
    }
}

// Chargement manuel d'un plan
function loadPlan() {
    let list_plans = document.getElementsByClassName('list');
    console.log(list_plans);
    for (let plan of list_plans) {
        plan.addEventListener('click', function () {
            getSave(plan.innerText);
            // Brancher les listeners sur les images rechargees pour les transformations
            let planSVG=document.querySelector('#SvgjsSvg1008');
            let centerImages = planSVG.select('image');
            console.log(centerImages);
            centerImages.draggable();
            trasformationFunction(centerImages);
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
                location.reload(true);
            }
        });
    }
}

/********************************************************************************************************/

/********************************************************************************************************/

// Branchement des listeners de type click sur les icones de sauvegarde , chargement et suppresion
btn_save.addEventListener('click', letSave);
btn_load.addEventListener('click', loadPlan);
btn_delete.addEventListener('click', deletePlan);

// Branchement du listener pour la sauvegarde auto au moment de la fermeture de la page
window.onunload = autoSave;

// Branchement du listener pour le chargement de la sauvegarde auto
//window.onload = getAutoSave;

// Branchement du listener pour le chargement de la liste des plans
loadArray();




