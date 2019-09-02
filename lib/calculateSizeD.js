const { execSync } = require('child_process');



const calculateSizeD = itemFullStaticPath => {
   //escape spaces, tabs, etc
   const itemFullStaticPathCleaned = itemFullStaticPath.replace(/\s/g, '\ ');
    
   const commandOutput = execSync(`du -sh "${itemFullStaticPathCleaned}"`).toString();

   
   console.log(commandOutput);
   
   //remove spaces, tabs, etc
   //remove the path from the command output to make further work easier, this removes backslashes on Windows.
   let filesize = commandOutput.replace(itemFullStaticPathCleaned, '');
   filesize = filesize.replace(/\s/g, '');
   console.log(filesize);
   
   //split filesize using the '/' separator
   filesize = filesize.split('/');
   
   //human size is the first item of the array
   filesize = filesize[0];
   console.log(filesize);
   
   //unit
   const filesizeUnit = filesize.replace(/\d|\./g,'');
   console.log(filesizeUnit); 

   //size number
//size number
const filesizeNumber = parseFloat(filesize.replace(/[a-z]/i, ''));
console.log(filesizeNumber);

  

    return [filesize,110*1024*1024];
};


module.exports = calculateSizeD;