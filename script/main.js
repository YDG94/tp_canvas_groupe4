"use strict";
console.log("js loaded");
let myLeftDivSVG = document.querySelector("#svgContent");

//testing click on left list
myLeftDivSVG.addEventListener("click", function (evt) {
    console.log(evt.target);
});

let myItems =['bureau01.svg', 'bureau02.svg','bureau03.svg','canape01.svg','canape02.svg','canape03.svg','plante01.svg','plante02.svg','plante03.svg', 'table01.svg','table02.svg', 'table03.svg'];

//test if browser siupports SVG!
if (SVG.supported) {
    //if supported we move ahead and do our dirty jon on DOM loaded!
    SVG.on(document, 'DOMContentLoaded', function() {
        console.log("DOM loaded!");
    let leftSVGList = SVG('svgContent');
        for (let i = 0; i < myItems.length; i++) {
            leftSVGList.image(`images/${myItems[i]}`, "100%", "15vh").move(0, `${15*i}vh`);
        }
        leftSVGList.size("100%",`${myItems.length*15}vh`);
        myLeftDivSVG.height= `${myItems.length*15}vh`;

    });


} else {
    alert('SVG not supported');
}

