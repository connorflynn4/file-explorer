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
    //storing item details in this object
    let itemDetails = {};
   

    //name 
    itemDetails.name = item;
    
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


//when the file was last changed
itemDetails.timeStamp = parseInt(itemDetails.stats.mtimeMs);

//make it a date
itemDetails.date = new Date(itemDetails.timeStamp);

itemDetails.date = itemDetails.date.toLocaleString();

console.log(itemDetails.date);




    mainContent +=  `<tr data-name="${itemDetails.name}" data-size="${itemDetails.sizeBytyes}"data-time="${itemDetails.timeStamp}">
<td>${itemDetails.icon} <a href="${link}">${item}</a></td>
<td>${itemDetails.size}</td>
<td>${itemDetails.date}</td>
</tr>`;
});



return mainContent;
};




module.exports = buildMainContent;