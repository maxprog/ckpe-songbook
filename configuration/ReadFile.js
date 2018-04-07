var fs = require('fs');


if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var path = process.argv[2];
var filename = process.argv[3] || '';
var tab = [];

fs.readdir(path, function(err, items) {
    console.log(items);

    for (var i=0; i<items.length; i++) {
      var id = items[i].substring(0,items[i].indexOf('.'));
      tab.push({
        id: id.replace(/^0+/, '').replace(/^A0+/, 'A'),
       name: items[i].replace(/^0+/, '').replace(/^A0+/, 'A'),
       autor:''
     });

    }

    console.log(tab);
    var txt = 'export default '+ JSON.stringify(tab);
    fs.writeFile('table-data-'+filename, txt);

});


