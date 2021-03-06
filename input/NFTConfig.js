const fs = require("fs");
const width = 1000;
const height = 1000;
const dir = __dirname;
const baseImageUri = "ipfs://Qmd7xutsttpxENjEbSSkdK8QgGEgWSVNL3G3i5WQS26hjt";
const startEditionFrom = 0;
const endEditionAt = 149;
const editionSize = 150;
const description = "";
const raceWeights = [
    {
        value: "KF",
        from: 0,
        to: editionSize,
    },
];

const races = {
    KF: {
        name: "KF",
        layers: [
            //-------------------------------------------// 
            {
                name: "background",
                elements: [
                    {
                        id: 0,
                        name: "grey.png",
                        path: `${dir}/part_image/4-background/background_1_grey.png`,
                    },
                    {
                        id: 1,
                        name: "red.png",
                        path: `${dir}/part_image/4-background/background_2_red.png`,
                    },
                    {
                        id: 2,
                        name: "pink.png",
                        path: `${dir}/part_image/4-background/background_3_pink.png`,
                    },
                    {
                        id: 3,
                        name: "yellow.png",
                        path: `${dir}/part_image/4-background/background_4_yellow.png`,
                    },
                    {
                        id: 4,
                        name: "orange.png",
                        path: `${dir}/part_image/4-background/background_5_orange.png`,
                    },
                    {
                        id: 5,
                        name: "green.png",
                        path: `${dir}/part_image/4-background/background_6_green.png`,
                    },
                    {
                        id: 6,
                        name: "blue.png",
                        path: `${dir}/part_image/4-background/background_7_blue.png`,
                    },
                    {
                        id: 7,
                        name: "cloud.png",
                        path: `${dir}/part_image/4-background/background_8_cloud.png`,
                    },
                    {
                        id: 8,
                        name: "purple.png",
                        path: `${dir}/part_image/4-background/background_9_purple.png`,
                    },
                ],
                position: { x: 0, y: 0 },
                size: { width: width, height: height },
                number: 9,
            },
            {
                name: "middlelogo",
                elements: [
                    {
                        id: 0,
                        name: "balloon.png",
                        path: `${dir}/part_image/3-middlelogo/middlelogo_1_balloon.png`,
                    },
                    {
                        id: 1,
                        name: "wine.png",
                        path: `${dir}/part_image/3-middlelogo/middlelogo_2_wine.png`,
                    },
                    {
                        id: 2,
                        name: "champagne.png",
                        path: `${dir}/part_image/3-middlelogo/middlelogo_3_champagne.png`,
                    },
                    {
                        id: 3,
                        name: "beer.png",
                        path: `${dir}/part_image/3-middlelogo/middlelogo_4_beer.png`,
                    },
                    {
                        id: 4,
                        name: "salute.png",
                        path: `${dir}/part_image/3-middlelogo/middlelogo_5_salute.png`,
                    },
                ],
                position: { x: 0, y: 0 },
                size: { width: width, height: height },
                number: 5,
            },
            {
                name: "congra",
                elements: [
                    {
                        id: 0,
                        name: "star.png",
                        path: `${dir}/part_image/2-congra/congra_1_star.png`,
                    },
                    {
                        id: 1,
                        name: "welldone.png",
                        path: `${dir}/part_image/2-congra/congra_2_welldone.png`,
                    },
                    {
                        id: 2,
                        name: "green.png",
                        path: `${dir}/part_image/2-congra/congra_3_green.png`,
                    },
                    {
                        id: 3,
                        name: "science.png",
                        path: `${dir}/part_image/2-congra/congra_4_science.png`,
                    },
                    {
                        id: 4,
                        name: "pink.png",
                        path: `${dir}/part_image/2-congra/congra_5_pink.png`,
                    },
                ],
                position: { x: 0, y: 0 },
                size: { width: width, height: height },
                number: 5,
            },
            {
                name: "logo",
                elements: [
                    {
                        id: 0,
                        name: "blue.png",
                        path: `${dir}/part_image/1-logo/logo_1_blue.png`,
                    },
                    {
                        id: 1,
                        name: "green.png",
                        path: `${dir}/part_image/1-logo/logo_2_green.png`,
                    },
                    {
                        id: 2,
                        name: "yellow.png",
                        path: `${dir}/part_image/1-logo/logo_3_yellow.png`,
                    },
                    {
                        id: 3,
                        name: "red.png",
                        path: `${dir}/part_image/1-logo/logo_4_red.png`,
                    },
                    {
                        id: 4,
                        name: "purple.png",
                        path: `${dir}/part_image/1-logo/logo_5_purple.png`,
                    },
                ],
                position: { x: 0, y: 0 },
                size: { width: width, height: height },
                number: 5,
            },
            //-------------------------------------------// 
        ],
    },
};

let Creater_Data = {
    LU: { "dna": ["00", "00", "00", "00"], "id": "0102" },
}

const Classes = ["A", "B", "C", "D"]

module.exports = {
    width,
    height,
    baseImageUri,
    editionSize,
    description,
    startEditionFrom,
    endEditionAt,
    races,
    raceWeights,
    Creater_Data,
    Classes
};
