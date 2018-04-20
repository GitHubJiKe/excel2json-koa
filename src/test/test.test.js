const { getJSONBySheet, getHTMLBySheet, getWorkSheets, writeJson2File, writeHTML2File } = require('../util');
const path = require('path');
const fileFullPath = path.join(__dirname, '../../public/uploads/0905.xlsx');

console.log('fileFullPath :', fileFullPath);

const worksheet = getWorkSheets(fileFullPath);
const { Sheets, SheetNames } = worksheet;

SheetNames.forEach(n => {
  let sheet = Sheets[n];
  let html = getHTMLBySheet(sheet);
  writeHTML2File(html, n);
})



