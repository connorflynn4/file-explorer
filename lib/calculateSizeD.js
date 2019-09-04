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

const units = "BKMGT";


//B 10b => 10 BYTES(1000*0)
//K 10K => 10*1024(x1000*1) power of!
//M 10M => 10*1024*1024*1024(1000*2)
//M 10G => 10*1024*1024*1024*1024(1000*3)
//M 10t => 10*1024*1024*1024*1024(1000*4)

const filesizeBytes = filesizeNumber*Math.pow(1000,units.indexOf(filesizeUnit));

console.log(filesizeBytes);

  

    return [filesize,filesizeBytes];
};


module.exports = calculateSizeD;