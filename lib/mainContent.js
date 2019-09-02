const fs = require('fs');
const path = require('path');

const calculateSizeD = require('./calculateSizeD.js')

const buildMainContent = (fullStaticPath,pathname) => {
let mainContent = '';
let items;
//loop through anything in the folder
//display the name (linked), size and last modified
//also inlude the icon
try{
items = fs.readdirSync(fullStaticPath);
console.log(items)
}catch(err){
console.log(`readdirSync error: ${err}`);
return `<div class="alert alert-danger">Internal Server Error</div>`;
}

items.forEach(item => {
    let itemDetails = {};
    let icon,stats;
    
    //link
    const link = path.join(pathname, item);

//icon
const itemFullStaticPath = path.join(fullStaticPath, item);
try{
    itemDetails.stats = fs.statSync(itemFullStaticPath);
}catch(err){
console.log(`statSync erro: ${err}`);
mainContent = '<div class= "alert alert-danger">Internal Server Error</div>';
return false;
}

if(itemDetails.stats.isDirectory()){
    itemDetails.icon='<ion-icon name="folder"></ion-icon>';
[itemDetails.size,itemDetails.sizeBytyes]= calculateSizeD(itemFullStaticPath);
}
else if(itemDetails.stats.isFile()){
    itemDetails.icon='<ion-icon name="document"></ion-icon>';
// [itemDetails.size,itemDetails.sizeBytyes] = calculateSizeF();
}



    mainContent +=  `<tr>
<td>${itemDetails.icon}<a href="${link}">${item}</a></td>
<td>${itemDetails.size}</td>
<td>12/09/2019</td>
</tr>`;
});



return mainContent;
};




module.exports = buildMainContent;