const fs = require('fs');
const path = require('path');

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
    //link
    const link = path.join(pathname, item);

    mainContent +=  `<tr>
<td><a href="${link}">${item}</a></td>
<td>100mb</td>
<td>12/09/2019</td>
</tr>`;
});



return mainContent;
};




module.exports = buildMainContent;