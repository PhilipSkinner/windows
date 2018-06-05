const slice     = Function.prototype.call.bind(Array.prototype.slice);
const toString  = Function.prototype.call.bind(Object.prototype.toString);

var Command = function(child_process, fs, utility) {
  this.child_process  = child_process;
  this.fs             = fs;
  this.utility        = utility;
};

/**
 * Create a function that executes the given command when called, recursively joining params to a space delimeted argv list.
 * Will also have a build in `.help()` function.
 * @param {String}  name        The command name which will become the function's name as well with spaces replaced by underscores
 * @param {Boolean} splitLines  Whether to automatically split all reponses into an array of lines
 */
Command.prototype.Command = function(command, name, format) {
  if (typeof name === 'function') {
    format = name;
    name = command;
  }
  name = (name || command).replace(/\s/g, '_');

  var cmd = eval('1&&function '+name+'(){var v=arguments;return (v[v.length-1] instanceof Function ? Command.prototype.async : Command.prototype.sync).apply('+name+',v)}');
  cmd.__proto__ = Command.prototype;
  cmd.command = command;
  if (typeof format === 'function') {
    Object.defineProperty(cmd, 'format', { value: format, writable: true, configurable: true });
  }
  return cmd;
};

Command.prototype.help = function() {
  return execSync(this.name.replace(/_/g, ' '), arguments, '/?').trim().replace(/\r?\n/g);
};

Command.prototype.async = function() {
  var self = this, args = slice(arguments), callback = args.pop();
  this.child_process.exec(this.command+' '+makeParams(args), function(err,o,e){
    return err ? callback(err) : callback(null, self.format(e ? o ? o+'\r\n'+e : e : o));
  });
};

Command.prototype.sync = function() {
  return this.format(execSync(this.command, arguments));
};

Command.prototype.format = function(s) {
  return s.trim().split(/\r?\n/g);
};

/**
 * Execute a command using cmd.exe synchronously
 * @params {Any[]}   Params will be recursively joined to a space delimeted argv list
 * @return {String}  return value of the command
 */
Command.prototype.execSync = function(){
  var f = 'sync' + Math.random();
  this.child_process.exec(makeParams(arguments)+' 1>'+f+' 2>&1 & ren '+f+' '+f+'_');
  f += '_';
  while (!this.utility.exists(f));
  var output = this.fs.readFileSync(f, 'utf8');
  this.fs.unlinkSync(f);
  return output;
}

Command.prototype.applyable = function(o){
  return Array.isArray(o) || toString(o) === '[object Arguments]';
}

Command.prototype.makeParams = function(){
  var params = [];
  for (var k in arguments) {
    if (applyable(arguments[k])) {
      params.push(makeParams.apply(null, arguments[k]));
    } else {
      params.push(arguments[k]);
    }
  }
  return params.join(' ');
}

module.exports = function(child_process, fs, utility) {
  if (!child_process) {
    child_process = require('child_process');
  }

  if (!fs) {
    fs = require('fs');
  }

  if (!utility) {
    utility = require('./utility')();
  }

  return new Command(child_process);
};