"use strict";

// input de type file
let inputUpload=document.querySelector('#upload');

// Fonction pour lire le contenu du fichier uploade
function readUrl() {
    let file=document.querySelector('#upload').files[0];
    let reader=new FileReader();

    reader.onloadend=function () {
        document.querySelector('#plan>svg').attr('fill',`url(${reader.result})`);
    };

if (file){
    reader.readAsDataURL(file);
}else{}

}
