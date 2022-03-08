"use strict";

const fs = require("fs");
const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

const { baseImageUri } = require("../input/NFTConfig.js");
const baseUri = baseImageUri;

// read json data
let rawdata = fs.readFileSync(`${basePath}/output/json/_metadata.json`);
let data = JSON.parse(rawdata);

data.forEach((item) => {
    item.image = `${baseUri}/${item.id}.png`;
    fs.writeFileSync(
        `${basePath}/output/json/${item.id}.json`,
        JSON.stringify(item, null, 2)
    );
});

fs.writeFileSync(
    `${basePath}/output/json/_metadata.json`,
    JSON.stringify(data, null, 2)
);

console.log(`Updated baseUri for images to ===> ${baseUri}`);