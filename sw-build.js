const fs = require('fs');
const path = require('path');

const filesFromDist=[];
fs.readdirSync('./dist/').forEach(file => {
    filesFromDist.push(`"/${file}"`);
});
fs.readdirSync('./dist/fonts/').forEach(file => {
    filesFromDist.push(`"/fonts/${file}"`);
});
fs.readdirSync('./dist/images/').forEach(file => {
    filesFromDist.push(`"/images/${file}"`);
});

const template = fs.readFileSync(path.resolve(process.cwd(), 'sw-template.js'), { encoding: 'UTF-8' });
const data = template.replace('\'{{FILES_FROM_DIST}}\'', `[${String(filesFromDist)}]`)

fs.writeFileSync(path.resolve(process.cwd(), './dist/sw.js'), data)