const fs = require('fs');
const readline = require('readline');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var path = process.argv[2];
var filename = process.argv[3] || '';
global.tab = [];
var lines = [];


const rl = readline.createInterface({
  input: fs.createReadStream(path),
  crlfDelay: Infinity
});

rl.on('line', (line) => {

      if(line.indexOf('$')!==-1)
      {

        var id = lines[1] ? lines[1].replace('\t','') : lines[1];
        var songTxt=lines.slice(2,lines.length);
        var content = ['<?xml version="1.0" encoding="UTF-8"?>',
                      '<song>',
                      '<title>'+lines[0].replace('\t','')+'</title>',
                      '<id>'+id+'</id>',
                      '<lyrics>',
                      songTxt.join('\n'),
                      '</lyrics>',
                      '</song>'];




        fs.writeFile(id, content.join('\n'),function(err){
         if(err) console.log(err);
        });


        global.tab.push({
          id: id,
         name: lines[0].replace('\t',''),
         autor:''
       });


       lines=[];
      }else
      {

        lines.push(line);

      }
});
rl.on('close', function () {
  console.log(global.tab);
   var txt = 'export default '+ JSON.stringify(global.tab);
  fs.writeFile('table-data-ckpe', txt,function(err){
    if(err) console.log(err);
  });
});






