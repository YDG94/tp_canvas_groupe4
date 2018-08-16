"use strict";
import {svgItems, tabCategories, Project, Version, SvgElement} from './struct.js';

console.log("js loaded");
let myLeftDivSVG = document.querySelector("#svgContent");
let leftSVGList = null;
let tabElementsSvg = svgItems;
//testing click on left list
myLeftDivSVG.addEventListener("click", function (evt) {
    console.log(evt.target);
});

let categories = document.querySelector("#catElement");
for (let i = 0; i < tabCategories.length; i++) {
    let opt = document.createElement("option");
    let text = document.createTextNode(tabCategories[i].name);
    opt.appendChild(text);
    opt.setAttribute("value", tabCategories[i].value);
    categories.appendChild(opt);
}


//test if browser siupports SVG!
if (SVG.supported) {
    //if supported we move ahead and do our dirty jon on DOM loaded!
    SVG.on(document, 'DOMContentLoaded', function () {
        console.log("DOM loaded!");
        leftSVGList = SVG('svgContent');
        for (let i = 0; i < tabElementsSvg.length; i++) {
            leftSVGList.image(`images/${tabElementsSvg[i].imgSrc}`, "100%", "15vh").move(0, `${15 * i}vh`);
        }
        leftSVGList.size("100%", `${tabElementsSvg.length * 15}vh`);
        myLeftDivSVG.height = `${tabElementsSvg.length * 15}vh`;
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

});
