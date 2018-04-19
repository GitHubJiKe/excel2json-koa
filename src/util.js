const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');


const JSONFULLPATH = path.join(__dirname, '../public/downloads/data.json');

const getWorkSheets = (fileFullPath) => {
  const { Sheets, SheetNames } = xlsx.readFile(fileFullPath);
  return { Sheets, SheetNames }
}

const getJSONBySheet = (worksheet) => {
  return xlsx.utils.sheet_to_json(worksheet);
}

const writeJson2File = (json, jsonFullPath = JSONFULLPATH) => {
  console.log('JSONFULLPATH :', jsonFullPath);
  fs.writeFile(jsonFullPath, JSON.stringify(json), (err) => {
    if (err) throw new Error('generate json file failed');
  })
}



module.exports = {
  getWorkSheets,
  getJSONBySheet,
  writeJson2File
}