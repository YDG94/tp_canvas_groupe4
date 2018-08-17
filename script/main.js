"use strict";
import {svgItems, tabCategories, Project, Version, SvgElement} from './struct.js';

console.log("js loaded");
let myLeftDivSVG = document.querySelector("#svgContent");
let rotationSliderDOM = document.querySelector("#degreeController");
let zoomSliderDom = document.querySelector("#sizeController");
//SVG.js peut adopter un element du DOM !!!
let rotationSliderSVG = SVG.adopt(rotationSliderDOM);
let zoomSliderSVG = SVG.adopt(zoomSliderDom);
let leftSVGList = null;
let planSVG = null;
let centerImages=null;
let leftImages=null;

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
            leftSVGList.image(`images/${tabElementsSvg[i].imgSrc}`, "100%", "15vh").move(0, `${15 * i}vh`);
        }
        leftSVGList.size("100%", `${tabElementsSvg.length * 15}vh`);
        myLeftDivSVG.height = `${tabElementsSvg.length * 15}vh`;

        //let myTestImage = planSVG.image("images/bureau01.svg", "5vw", "5vh");
        //myTestImage.animate({ ease: '<', delay: '1.5s' }).attr({ fill: '#f03' }).animate().dmove(50,50);

         //insert function with animation and DRAGGABLE ! =P
        insertFunction();

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
    if(cat == 0)
    {
        tabElementsSvg = svgItems;
    }else{
        for (let i = 0; i < svgItems.length; i++)
        {
            if(cat == svgItems[i].catValue){
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

let search  = document.getElementById("searchElement");
search.addEventListener("input", function () {
   let text = event.target.value;
   console.log(text);
   let tabRes = [];
   let j = 0;
   for (let i = 0; i < svgItems.length; i++){
       let test = svgItems[i].imgSrc.indexOf(text);
       if(test >= 0){
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
let insertFunction = function(){
    //select all images from left list and put them in an array
    leftImages = leftSVGList.select('image');
    //add listener on click on all images of the list (list itself)
    leftImages.on("click", function (event) {
        //the image will be created and is chained to animation
        planSVG.image(this.attr("href"), "5vh", "5vh").attr({
            'x': 0
            , 'y': '50%'
        }).animate(1500, '<>').dmove('15%', 0).scale(3, 3);

        //we'll immediately get all images and we'll make it DRAGGABLE!
        centerImages = planSVG.select('image');
        console.log(centerImages);
        centerImages.draggable({
            minX: 20
            , minY: 280
            , maxX: window.innerWidth*20.5/100
            , maxY: window.innerHeight - 400
            , snapToGrid: 5
        });
        //voir rotate function plus en bas pur le details!
        trasformationFunction(centerImages);
    });
};

//*** magic function for ROTATIION ***
let trasformationFunction = function (setArrayOfImages) {
    setArrayOfImages.on("click", function (event) {
        console.log(this);
        let _this = this;
        let resetWidth = _this.attr("width");
        let resetHeight = _this.attr("height");
        /* il faut debrancher le listener pour input sur tous les images
         pour le rebrancher seulment sur le "this" de ce click-ci */
        rotationSliderSVG.off("input");
        zoomSliderSVG.off("input");
        rotationSliderSVG.on("input", function (event) {
            let myDegree = event.target.value;
            console.log(myDegree);
            _this.rotate(myDegree);
        });
        zoomSliderSVG.on("input", function (event) {
            let scale = event.target.value;

            /*reset necessaire a chaque input sinon l'image va
             grandir a l'infinit!*/
            let width = resetWidth;
            let height = resetHeight;
            //slice necessaire pour garder le proportion en 'vh' et 'vw'
            let isolateWidth = width.slice(0, -2);
            let isolateHeight = height.slice(0, -2);
            //calculate new scale and apply!
            let newWidth = isolateWidth*scale;
            let newHeight = isolateHeight*scale;
            _this.size(newWidth+"vh", newHeight+"vh");
        })
    });
};

