"use strict";
import {svgItems, tabCategories, Project, Version, SvgElement} from './struct.js';

console.log("js loaded");
let myLeftDivSVG = document.querySelector("#svgContent");
let rotationSliderDOM = document.querySelector("#degreeController");
let zoomSliderDom = document.querySelector("#sizeController");
let libelle = document.querySelector("#libelle");
let deleteElem = document.getElementById("removeElem");
let deletePlan = document.getElementById("removePlan");
let viderStand = document.getElementById("viderStand");
//SVG.js peut adopter un element du DOM !!!
let rotationSliderSVG = SVG.adopt(rotationSliderDOM);
let zoomSliderSVG = SVG.adopt(zoomSliderDom);
let libelleSVG = SVG.adopt(libelle);
let dElemSVG = SVG.adopt(deleteElem);
let leftSVGList = null;
let planSVG = null;
let centerImages = null;
let leftImages = null;
const imgSize = 15;
let tabElementsSvg = svgItems;


let categories = document.querySelector("#catElement");
for (let i = 0; i < tabCategories.length; i++) {
    let opt = document.createElement("option");
    let text = document.createTextNode(tabCategories[i].name);
    opt.appendChild(text);
    opt.setAttribute("value", tabCategories[i].value);
    categories.appendChild(opt);
}


//test if browser supports SVG!
if (SVG.supported) {
    //if supported we move ahead and do our dirty jon on DOM loaded!
    SVG.on(document, 'DOMContentLoaded', function () {
        console.log("DOM loaded!");

        //creation of SVGs
        leftSVGList = SVG('svgContent');
        planSVG = SVG('plan');

        for (let i = 0; i < tabElementsSvg.length; i++) {
            leftSVGList.image(`images/${tabElementsSvg[i].imgSrc}`, "100%", `${imgSize}vh`).move(0, `${imgSize * i}vh`);
        }
        leftSVGList.size("100%", `${tabElementsSvg.length * imgSize}vh`);
        myLeftDivSVG.height = `${tabElementsSvg.length * imgSize}vh`;

        //insert function with animation and DRAGGABLE ! =P
        insertFunction();

        let images = leftSVGList.select('image');
        images.on("mouseenter", function (evt) {

            this.animate(700, '<>', 0).scale(1.1, 1.1).reverse().loop();

            this.filter(function (add) {
                let blur = add.offset(0, 3).in(add.sourceAlpha).gaussianBlur(3);
                add.blend(add.source, blur);
            });
        });

        images.on("mouseleave", function (evt) {
            this.unfilter();
            this.finish();
        });

    });
} else {
    alert('SVG not supported');
}

let cat = null;
categories.addEventListener("change", function (evt) {
    console.log(evt.target.value);
    myLeftDivSVG.firstElementChild.innerHTML = "";
    tabElementsSvg = [];
    switch (evt.target.value) {
        case "0":
            cat = 0;
            break;
        case "1":
            cat = 1;
            break;
        case "2":
            cat = 2;
            break;
        case "3":
            cat = 3;
            break;
        case "4":
            cat = 4;
            break;
        default:
            cat = 0;
            break;
    }
    console.log(cat);
    let j = 0;
    if (cat == 0) {
        tabElementsSvg = svgItems;
    } else {
        for (let i = 0; i < svgItems.length; i++) {
            if (cat == svgItems[i].catValue) {
                console.log(svgItems[i].imgSrc);
                tabElementsSvg[j] = svgItems[i];
                j++;
            }
        }
    }

    for (let i = 0; i < tabElementsSvg.length; i++) {
        leftSVGList.image(`images/${tabElementsSvg[i].imgSrc}`, "100%", "15vh").move(0, `${15 * i}vh`);
    }
    leftSVGList.size("100%", `${tabElementsSvg.length * 15}vh`);
    myLeftDivSVG.height = `${tabElementsSvg.length * 15}vh`;
    insertFunction();
});

let search = document.getElementById("searchElement");
search.addEventListener("input", function () {
    let text = event.target.value;
    console.log(text);
    let tabRes = [];
    let j = 0;
    for (let i = 0; i < svgItems.length; i++) {
        let test = svgItems[i].imgSrc.indexOf(text);
        if (test >= 0) {
            tabRes[j] = svgItems[i];
            j++;
        }
    }
    console.log(tabRes);
    myLeftDivSVG.firstElementChild.innerHTML = "";
    for (let i = 0; i < tabRes.length; i++) {
        leftSVGList.image(`images/${tabRes[i].imgSrc}`, "100%", "15vh").move(0, `${15 * i}vh`);
    }
    leftSVGList.size("100%", `${tabRes.length * 15}vh`);
    myLeftDivSVG.height = `${tabRes.length * 15}vh`;
    insertFunction();
});

// ****  INSERT FUNCTION **** //
let insertFunction = function () {
    //select all images from left list and put them in an array
    leftImages = leftSVGList.select('image');
    //add listener on click on all images of the list (list itself)
    leftImages.on("click", function (event) {
        let group = planSVG.group();
        let plan = document.getElementById("plan");
        //the image will be created and is chained to animation
        group.x(0).y(plan.offsetHeight/2)
        group.image(this.attr("href"), "4vh", "4vh");
        group.text(function(add) {
            add.tspan('');
        });

        group.animate(1500, '<>').dmove(plan.offsetWidth/2, 0).scale(3, 3);

        //we'll immediately get all images and we'll make it DRAGGABLE!
        centerImages = planSVG.select('image');
        console.log(centerImages);
        group.draggable();
        //voir rotate function plus en bas pur le details!
        trasformationFunction(centerImages);
    });
};

//*** magic function for ROTATIION ***
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

        dElemSVG.on("click", function (event) {
            let g = _this.parent();
            g.remove();
        });
    });
};
