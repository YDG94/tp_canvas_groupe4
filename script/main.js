"use strict";
import {svgItems} from 'struct';

console.log("js loaded");
let myLeftDivSVG = document.querySelector("#svgContent");

//testing click on left list
myLeftDivSVG.addEventListener("click", function (evt) {
    console.log(evt.target);
});

//test if browser siupports SVG!
if (SVG.supported) {
    //if supported we move ahead and do our dirty jon on DOM loaded!
    SVG.on(document, 'DOMContentLoaded', function () {
        console.log("DOM loaded!");
        let leftSVGList = SVG('svgContent');
        for (let i = 0; i < svgItems.length; i++) {
            leftSVGList.image(`images/${svgItems[i].imgSrc}`, "100%", "15vh").move(0, `${15 * i}vh`);
        }
        leftSVGList.size("100%", `${svgItems.length * 15}vh`);
        myLeftDivSVG.height = `${svgItems.length * 15}vh`;
    });
} else {
    alert('SVG not supported');
}

