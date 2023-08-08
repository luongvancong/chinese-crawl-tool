import benhTat from './data/benh-tat.json';
import tinhCach from './data/tinh-cach.json';
import ngheNghiep from './data/nghe-nghiep.json';
import tinhCam from './data/tinh-cam.json';
import coTheNguoi from './data/co-the-nguoi.json';

import fs from "fs";
import path from "path";

const data = {
    ...benhTat,
    ...tinhCach,
    ...ngheNghiep,
    ...tinhCam,
    ...coTheNguoi
}

const filePath = path.join(__dirname, './data/phrase.json');
fs.writeFile(filePath, JSON.stringify(data), function(error) {
    if (error) {
        throw error
    }
    console.log("Saved")
})

console.log(data)
