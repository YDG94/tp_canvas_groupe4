export class SvgElement {
    constructor(elemId, elemName, elemDom, versId) {
        this.elemId = elemId;
        this.elemName = elemName;
        this.elemDom = elemDom;
        this.versId = versId;
    }
}

export class Version {
    constructor(numVers, dateCreation, projectId) {
        this.numVers = numVers;
        this.dateCreation = dateCreation;
        this.projectId = projectId;
    }
}

export class Project {
    constructor(projetId, dateCreation, standImg, userId) {
        this.projetId = projetId;
        this.dateCreation = dateCreation;
        this.standImg = standImg;
        this.userId = userId;
    }
}

export let tabCategories = [
    {name: "All elements", value: "0"},
    {name: "Bureau", value: "1"},
    {name: "Canape", value: "2"},
    {name: "Plante", value: "3"},
    {name: "table", value: "4"}
];

export let svgItems = [
    {imgSrc: "bureau01.svg", catValue: "1"},
    {imgSrc: "bureau02.svg", catValue: "1"},
    {imgSrc: "bureau03.svg", catValue: "1"},
    {imgSrc: "canape01.svg", catValue: "2"},
    {imgSrc: "canape02.svg", catValue: "2"},
    {imgSrc: "canape03.svg", catValue: "2"},
    {imgSrc: "plante01.svg", catValue: "3"},
    {imgSrc: "plante02.svg", catValue: "3"},
    {imgSrc: "plante03.svg", catValue: "3"},
    {imgSrc: "table01.svg", catValue: "4"},
    {imgSrc: "table02.svg", catValue: "4"},
    {imgSrc: "table03.svg", catValue: "4"}
];