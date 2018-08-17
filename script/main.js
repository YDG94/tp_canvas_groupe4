"use strict";
import {svgItems, tabCategories, Project, Version, SvgElement} from './struct.js';

console.log("js loaded");
let myLeftDivSVG = document.querySelector("#svgContent");
let leftSVGList = null;
let planSVG = null;

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

        //select all images from left list and put them in an array
        let leftImages = leftSVGList.select('image');

        //add listener on click on all images of the list (list itself)
        leftImages.on("click", function (event) {
            //the image will be created and is chained to animation
            planSVG.image(this.attr("href"), "2vh", "2vh").attr({
                'x': 0
                , 'y': '50%'
            }).animate(1500, '<>').dmove('15%', 0).scale(3, 3);

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
