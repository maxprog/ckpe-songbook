var fs = require('fs');


if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var path = process.argv[2];



fs.readdir(path, function(err, items) {


    for (var i=0; i<items.length; i++) {
      var str = items[i].substring(0,items[i].indexOf('.'));

    if(str.length==3) {
        console.log(str);
        fs.rename(items[i], str, function(err) {
          if ( err ) console.log('ERROR: ' + err);
      });

      }

    }



});


