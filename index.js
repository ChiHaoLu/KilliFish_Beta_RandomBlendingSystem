const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const {
    width,
    height,
    baseImageUri,
    startEditionFrom,
    endEditionAt,
    races,
    raceWeights,
    description,
    Creater_Data,
    editionSize,
    Classes
} = require("./input/NFTConfig.js");
const console = require("console");
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");
var metadataList = [];
var attributesList = [];
var dnaList = [];

///////////////////////////////
// For Drawing
///////////////////////////////

const saveImage = (_editionCount) => {
    fs.writeFileSync(
        `./output/${_editionCount}.png`,
        canvas.toBuffer("image/png")
    );
};

const signImage = (_sig) => {
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 30pt Verdana";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText(_sig, 900, 40);
};

const loadLayerImg = async (_layer) => {
    return new Promise(async (resolve) => {
        const image = await loadImage(`${_layer.selectedElement.path}`);
        resolve({ layer: _layer, loadedImage: image });
    });
};

const drawElement = (_element) => {
    ctx.drawImage(
        _element.loadedImage,
        _element.layer.position.x,
        _element.layer.position.y,
        _element.layer.size.width,
        _element.layer.size.height
    );
    addAttributes(_element);
};

const constructLayerToDna = (_dna = [], _races = [], _race) => {
    let mappedDnaToLayers = _races[_race].layers.map((layer, index) => {
        let selectedElement = layer.elements.find((e) => e.id == parseInt(_dna[index]));
        return {
            name: layer.name,
            position: layer.position,
            size: layer.size,
            number: layer.number,
            selectedElement: selectedElement,
        };
    });

    return mappedDnaToLayers;
};

const getRace = (_editionCount) => {
    let race = "No Race";
    raceWeights.forEach((raceWeight) => {
        // if (_editionCount >= raceWeight.from && _editionCount <= raceWeight.to) {
        race = raceWeight.value;
        // }
    });
    return race;
};

///////////////////////////////
// For Shuffle and Random
///////////////////////////////

function shuffle(array) {
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const Randomize = (layer) => {
    let total = layer.number;
    let considerList = [];
    for (let i = 0; i < total; i++) {
        let now_pos = "3.1~4.9";
        now_pos = now_pos.split("~");
        now_pos = Math.floor(Math.random() * (now_pos[1] - now_pos[0] + 1)) + now_pos[1];
        for (let j = 0; j < now_pos; j++) {
            considerList.push(layer.elements[i].id);
        }
    }
    shuffle(considerList);
    return considerList;
}

///////////////////////////////
// For DNA
///////////////////////////////

const createDna = (_races, _race) => {
    let randNum = [];
    _races[_race].layers.forEach((layer) => {
        let consider = Randomize(layer);
        let index = Math.floor(Math.random() * parseInt(consider.length));
        let randElementNum = consider[index];

        if (randElementNum < 10) {
            randElementNum = "0" + randElementNum.toString();
        }
        else {
            randElementNum = randElementNum.toString();
        }

        randNum.push(randElementNum);
    });
    return randNum;
};

const isDnaUnique = (_DnaList = [], _dna = []) => {
    let foundDna = _DnaList.find((i) => i.join("") === _dna.join(""));
    return foundDna == undefined ? true : false;
};

///////////////////////////////
// For MetaData
///////////////////////////////

const addMetadata = (_dna, _edition) => {
    let tempMetadata = {
        image: `${baseImageUri}/${_edition}.png`,
        description: description,
        name: `#${_edition}`,
        id: _edition,
        dna: _dna.join(""),
        Classes: Born_Location(_dna),
        attributes: attributesList,
    };
    metadataList.push(tempMetadata);
    attributesList = [];
};

const addAttributes = (_element) => {
    let selectedElement = _element.layer.selectedElement;
    attributesList.push({
        trait_type: _element.layer.name,
        type_name: selectedElement.name,
    });
};

const writeMetaData = (_data) => {
    fs.writeFileSync("./output/_metadata.json", _data);
};

const saveMetaDataSingleFile = (_editionCount) => {
    fs.writeFileSync(
        `./output/${_editionCount}.json`,
        JSON.stringify(metadataList.find((meta) => meta.id == _editionCount))
    );
};

function Born_Location(arr) {
    var born = 0;
    for (var i = 0; i < arr.length; i++) {
        born += parseInt(arr[i]);
    };
    return Classes[born % 4];
}

///////////////////////////////
// For Static
///////////////////////////////

let Static = {
    Logo: {
        "blue": 0, "green": 0, "yellow": 0, "red": 0, "purple": 0
    },
    Congra: { "star": 0, "welldone": 0, "green": 0, "science": 0, "pink": 0 },
    BackGround: {
        "grey": 0, "red": 0, "pink": 0, "yellow": 0, "orange": 0, 
        "green": 0, "blue": 0, "cloud": 0, "purple": 0
    },
    Classes: { "A": 0, "B": 0, "C": 0, "D": 0 },
    MiddleLogo: { "balloon": 0, "wine": 0, "champagne": 0, "beer": 0, "salute": 0 },
}

function ReviseStatic(_layer) {
    let name = _layer.selectedElement.name;
    name = name.split('.')[0]
    if (_layer.name == "logo") {
        Static.Logo[name] += 1;
    }
    if (_layer.name == "congra") {
        Static.Congra[name] += 1;
    }
    if (_layer.name == "background") {
        Static.BackGround[name] += 1;
    }
    if (_layer.name == "middlelogo") {
        Static.MiddleLogo[name] += 1;
    }
}

const PrintStatic = () => {
    let _static = `
    - Produce ${editionSize} KF
    - Version: Beta_1.0
    --------------------Logo STATIC----------------------------
    There are ${Static.Logo.blue} Blue
              ${Static.Logo.green} Green
              ${Static.Logo.yellow} Yellow
              ${Static.Logo.red} Red
              ${Static.Logo.purple} Purple
    --------------------Congra STATIC-------------------------------
    There are ${Static.Congra.star} Star
              ${Static.Congra.welldone} WellDone 
              ${Static.Congra.green} Green 
              ${Static.Congra.science} Science 
              ${Static.Congra.pink} Pink 
    --------------------MiddleLogo STATIC-------------------------------
    There are ${Static.MiddleLogo.balloon} Balloon
              ${Static.MiddleLogo.wine} Wine
              ${Static.MiddleLogo.champagne} Champagne
              ${Static.MiddleLogo.beer} Beer
              ${Static.MiddleLogo.salute} Salute
    --------------------BACKGROUND_COLOR STATIC--------------------
    There are ${Static.BackGround.grey} Grey Background
              ${Static.BackGround.red} Red Background
              ${Static.BackGround.pink} Pink Background
              ${Static.BackGround.yellow} Yellow Background
              ${Static.BackGround.orange} Orange Background
              ${Static.BackGround.green} Green Background
              ${Static.BackGround.blue} Blue Background
              ${Static.BackGround.cloud} Cloud Background
              ${Static.BackGround.purple} Purple Background
    --------------------Classes STATIC------------------------------
    There are ${Static.Classes.A} Certificate born at A
              ${Static.Classes.B} Certificate born at B
              ${Static.Classes.C} Certificate born at C
              ${Static.Classes.D} Certificate born at D`

    fs.writeFileSync("./output/_Static.txt", _static);
}

///////////////////////////////
// startCreating
///////////////////////////////

const startCreating = async () => {
    writeMetaData("");
    let editionCount = startEditionFrom;
    while (editionCount <= endEditionAt) {
        let race = getRace(editionCount);
        let newDna = [];
        if (editionCount === parseInt(Creater_Data.LU.id)) {
            newDna = Creater_Data.LU.dna;
        }
        else {
            newDna = createDna(races, race);
        }

        if (isDnaUnique(dnaList, newDna)) {
            let results = constructLayerToDna(newDna, races, race);
            let loadedElements = []; //promise array
            results.forEach((layer) => {
                loadedElements.push(loadLayerImg(layer));
                ReviseStatic(layer);
                // console.log(layer.selectedElement.name)
            });

            await Promise.all(loadedElements).then((elementArray) => {
                ctx.clearRect(0, 0, width, height);
                // drawBackground();
                attributesList.push({
                    "display_type": "date",
                    "trait_type": "birthday",
                    "value": Date.now()
                });
                elementArray.forEach((element) => {
                    drawElement(element);
                });

                signImage(`#${editionCount}`);
                saveImage(editionCount);
                addMetadata(newDna, editionCount);
                saveMetaDataSingleFile(editionCount);
                // Classes = Born_Location(newDna);
                let is = Born_Location(newDna);
                Static.Classes[is] += 1;
                console.log(
                    `Created Certificate-ID: ${editionCount}, Race: ${race} with DNA: ${newDna} at Classes: ${is}`
                );
            });
            dnaList.push(newDna);
            editionCount++;
        } else {
            console.log("DNA exists!");
        }
    }
    writeMetaData(JSON.stringify(metadataList));
    PrintStatic();
};

startCreating();