"use strict";

// input de type file
let inputUpload = document.querySelector('#upload');

// Fonction pour lire le contenu du fichier uploade
function readUrl() {
    let file = document.querySelector('#upload').files[0];
    let reader = new FileReader();

    reader.onloadend = function () {

        $('#plan').css({
            'background-image': `url(${reader.result})`,
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%',
        });
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
    }

}

// Branchement du listener onchange
inputUpload.addEventListener('change', readUrl, true);
