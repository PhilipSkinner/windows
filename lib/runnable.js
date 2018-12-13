var path = require('path');
var fs = require('fs');
var spawnSync = require('child_process').spawnSync;

var exists = require('./utility').exists;
var resolve = require('./utility').resolve;

let result = spawnSync('npm', ['config', 'get', 'prefix'], { shell: true, encoding: 'utf8'});
if (result.error) {
  throw new Error('Could not find a good path to install to');
}
var PATH = result.stdout.replace(/\n$/, '');

module.exports = function runnable(files){
  return files.map(function(file){
    if (exists(file)) {
      var parts = {
        dir: path.dirname(file),
        base: path.basename(file),
        ext: path.extname(file)
      };
      parts.name = parts.base.slice(0, -parts.ext.length);
      console.log(parts);
      var cmdfile = path.resolve(PATH, parts.name+'.cmd');
      fs.writeFileSync(cmdfile, '@node "'+path.join(parts.dir, parts.base)+'" %*');
      return cmdfile + ' succesfully created';
    } else {
      return file + ' not found';
    }
  });
}

/*
var path = require('path');
var fs = require('fs');
var npm = require('npm');


var exists = require('./utility').exists;
var resolve = require('./utility').resolve;


module.exports = function runnable(files, callback){
  npm.load(function(e, npm){
    callback(files.map(function(file){
      if (exists(file)) {
        var parts = {
          dir: path.dirname(file),
          base: path.basename(file),
          ext: path.extname(file)
        };
        parts.name = parts.base.slice(0, -parts.ext.length);
        var cmdfile = resolve(npm.globalBin, parts.name+'.cmd');
        fs.writeFileSync(cmdfile, '@node "'+path.join(parts.dir, parts.base)+'" %*');
        return cmdfile + ' succesfully created';
      } else {
        return file + ' not found';
      }
    }));
  });
}
*/
