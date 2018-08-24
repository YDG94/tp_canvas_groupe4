"use strict";

/******************** Variables et autres DOM elements *********************/
let btn_save = document.querySelector('#btn_save');
let btn_delete = document.querySelector('#btn_delete');
let deleteElem = document.getElementById("removeElem");

let rotationSliderDOM = document.querySelector("#degreeController");
let zoomSliderDom = document.querySelector("#sizeController");
let libelle = document.querySelector("#libelle");

let rotationSliderSVG = SVG.adopt(rotationSliderDOM);
let zoomSliderSVG = SVG.adopt(zoomSliderDom);
let libelleSVG = SVG.adopt(libelle);
let dElemSVG = SVG.adopt(deleteElem);
/****************************************************************************/

/****************************************************************************/

/******************* Fonction pour generer la liste des plans ********************/
function getArray() {
    let div_plans = document.querySelector('#projectTree');
    div_plans.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        let div = document.createElement('div');
        div.classList.add('list');
        div.innerText = localStorage.key(i);
        div_plans.appendChild(div);
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
        if (document.querySelector('#plan filter') != null) {
            this.parent().attr({
                filter: "url(#" + document.querySelector('#plan filter').getAttribute("id") + ")"
            });
        } else {
            document.querySelector('#plan defs').innerHTML = '<filter id="SvgjsFilter1039"><feOffset id="SvgjsFeOffset1040" dx="0" dy="3" result="SvgjsFeOffset1040Out" in="SourceAlpha"></feOffset><feGaussianBlur id="SvgjsFeGaussianBlur1041" stdDeviation="3 3" result="SvgjsFeGaussianBlur1041Out" in="SvgjsFeOffset1040Out"></feGaussianBlur><feBlend id="SvgjsFeBlend1042" in="SourceGraphic" in2="SvgjsFeGaussianBlur1041Out" mode="normal" result="SvgjsFeBlend1042Out"></feBlend></filter>';
            this.parent().attr({
                filter: "url(#" + document.querySelector('#plan filter').getAttribute("id") + ")"
            });
        }

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

        dElemSVG.on("click", function (event) {
            console.log(_this.parent());
            let g = _this.parent();
            g.remove();
        });
    });
};
/*************************************************************************************************************/

/************************************************************************************************************/

/***************** Liste des fonctions de base pour gérer les sauvgardes et chargements *****************/
function save(nom_plan) {
    let p = {
        backgroundImage: document.querySelector("#plan>svg").style.backgroundImage,
        plan: document.querySelector('#plan>svg').innerHTML
    };
    localStorage.setItem(nom_plan, JSON.stringify(p));
}

function autoSave() {
    let p = {
        backgroundImage: document.querySelector("#plan>svg").style.backgroundImage,
        plan: document.querySelector('#plan>svg').innerHTML
    };
    localStorage.setItem('auto_save', JSON.stringify(p));
}

function deleteSave(nom_plan) {
    alert(`${nom_plan} is deleted`);
    localStorage.removeItem(nom_plan);
}

function getSave(nom_plan) {
    let myPlan_json = localStorage.getItem(nom_plan);
    if (myPlan_json !== null) {
        alert(`${nom_plan} is loaded`);
        console.log("get Save: " + JSON.parse(myPlan_json).plan);
        document.querySelector('#plan>svg').innerHTML = "";
        document.querySelector('#plan>svg').style.backgroundImage = "";
        let planSVG = SVG.adopt(document.querySelector('#plan>svg'));
        let obj = JSON.parse(myPlan_json);
        planSVG.svg(obj.plan);
        console.log((obj.backgroundImage));
        document.querySelector('#plan>svg').style.backgroundImage = obj.backgroundImage;
        document.querySelector('#plan>svg').style.backgroundRepeat = "no-repeat";
        document.querySelector('#plan>svg').style.backgroundSize = "100% 100%";
        let centerImages = planSVG.select('image');
        console.log(centerImages);
        planSVG.select('g').draggable();
        trasformationFunction(centerImages);
    } else {
        if (localStorage.getItem('auto_save') !== null) {
            document.querySelector('#plan>svg').innerHTML = getAutoSave;
        }
    }
}

function getAutoSave() {
    let myPlan_json = localStorage.getItem('auto_save');
    if (myPlan_json !== null) {
        console.log(JSON.parse(myPlan_json));
        document.querySelector('#plan>svg').innerHTML = "";
        let planSVG = SVG.adopt(document.querySelector('#plan>svg'));
        planSVG.add(JSON.parse(myPlan_json));
    } else {
        document.querySelector('#plan>svg').innerHTML = "<p>Aucun plan n'a été chargé.</p>";
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
        getArray();
    }
}


/********************************************************************************************************/

/********************************************************************************************************/

// Branchement des listeners de type click sur les icones de sauvegarde , chargement et suppresion
btn_save.addEventListener('click', letSave);

let tree = document.querySelector("#projectTree");

//chargement de plan on double click
tree.addEventListener("dblclick", function (evt) {
    getSave(evt.target.innerText.toLowerCase());
});

// Suppresion d'un plan
btn_delete.addEventListener("click", function (evt) {
    console.log(this.children[0]);
    btn_delete.classList.add("listClick");
    tree.addEventListener("click", function (evt) {
        if (window.confirm('You are going to delete your blue-print, are you sure ?')) {
            console.log(evt.target.innerText.toLowerCase());
            deleteSave(evt.target.innerText.toLowerCase());
        }
        getArray();
        btn_delete.classList.remove("listClick");
    });

});


// Branchement du listener pour la sauvegarde auto au moment de la fermeture de la page
window.onunload = autoSave;

// Branchement du listener pour le chargement de la sauvegarde auto
//window.onload = getAutoSave;

// Branchement du listener pour le chargement de la liste des plans
loadArray();




