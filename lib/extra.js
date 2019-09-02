const { execSync } = require('child_process');

try{
const result = execSync('du -sh "/c/Users/conno/Desktop/WEBSITES/8.FileExplorer"').toString();
console.log(result);
}catch(err){
    console.log(`child_process error: ${err}`);
}