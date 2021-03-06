Enumerator.prototype.forEach = function(fn){
	var i = 0;
	for(var e = this; !e.atEnd(); e.moveNext()){
		fn.call(this, e.item(), i++);
	}
}

Enumerator.prototype.toArray = function(){
	var accum=[];
	this.forEach(function(item){ accum.push(item); });
	return accum;
}

function makeEnum(obj){
	var s = new ActiveXObject("Wbemscripting.SWbemNamedValueSet");
	for(var k in obj){
		s.Add(k, obj[k]);
	}
	return s;
}

function properties(wmiObject){
	return map(wmiObject, function(o){
		return {
			properties: map(o.Properties_, function(z){return z.Name}),
			methods: map(o.Methods_, function(z){return z.Name}),
			qualifiers: toObj(o.Qualifiers_),
			text: o.GetText_(2, 0, getAll)
		}
	});
}


//Windows Script Host forces IE7 level JScript compatability :(

//es5-shim
(function(n){typeof define=="function"?define(n):n()})(function(){function n(c){try{return Object.defineProperty(c,"sentinel",{}),"sentinel"in c}catch(b){}}if(!Function.prototype.bind)Function.prototype.bind=function(c){var b=this;if(typeof b!="function")throw new TypeError;var a=p.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var e=new e,g=b.apply(e,a.concat(p.call(arguments)));return g!==null&&Object(g)===g?g:e}else return b.apply(c,a.concat(p.call(arguments)))};
return d};var l=Function.prototype.call,f=Object.prototype,p=Array.prototype.slice,m=l.bind(f.toString),h=l.bind(f.hasOwnProperty),t,u,q,r,o;if(o=h(f,"__defineGetter__"))t=l.bind(f.__defineGetter__),u=l.bind(f.__defineSetter__),q=l.bind(f.__lookupGetter__),r=l.bind(f.__lookupSetter__);if(!Array.isArray)Array.isArray=function(c){return m(c)=="[object Array]"};if(!Array.prototype.forEach)Array.prototype.forEach=function(c,b){var a=i(this),d=0,e=a.length>>>0;if(m(c)!="[object Function]")throw new TypeError;
for(;d<e;)d in a&&c.call(b,a[d],d,a),d++};if(!Array.prototype.map)Array.prototype.map=function(c,b){var a=i(this),d=a.length>>>0,e=Array(d);if(m(c)!="[object Function]")throw new TypeError;for(var g=0;g<d;g++)g in a&&(e[g]=c.call(b,a[g],g,a));return e};if(!Array.prototype.filter)Array.prototype.filter=function(c,b){var a=i(this),d=a.length>>>0,e=[];if(m(c)!="[object Function]")throw new TypeError;for(var g=0;g<d;g++)g in a&&c.call(b,a[g],g,a)&&e.push(a[g]);return e};if(!Array.prototype.every)Array.prototype.every=
function(c,b){var a=i(this),d=a.length>>>0;if(m(c)!="[object Function]")throw new TypeError;for(var e=0;e<d;e++)if(e in a&&!c.call(b,a[e],e,a))return!1;return!0};if(!Array.prototype.some)Array.prototype.some=function(c,b){var a=i(this),d=a.length>>>0;if(m(c)!="[object Function]")throw new TypeError;for(var e=0;e<d;e++)if(e in a&&c.call(b,a[e],e,a))return!0;return!1};if(!Array.prototype.reduce)Array.prototype.reduce=function(c){var b=i(this),a=b.length>>>0;if(m(c)!="[object Function]")throw new TypeError;
if(!a&&arguments.length==1)throw new TypeError;var d=0,e;if(arguments.length>=2)e=arguments[1];else{do{if(d in b){e=b[d++];break}if(++d>=a)throw new TypeError;}while(1)}for(;d<a;d++)d in b&&(e=c.call(void 0,e,b[d],d,b));return e};if(!Array.prototype.reduceRight)Array.prototype.reduceRight=function(c){var b=i(this),a=b.length>>>0;if(m(c)!="[object Function]")throw new TypeError;if(!a&&arguments.length==1)throw new TypeError;var d;a-=1;if(arguments.length>=2)d=arguments[1];else{do{if(a in b){d=b[a--];
break}if(--a<0)throw new TypeError;}while(1)}do a in this&&(d=c.call(void 0,d,b[a],a,b));while(a--);return d};if(!Array.prototype.indexOf)Array.prototype.indexOf=function(c){var b=i(this),a=b.length>>>0;if(!a)return-1;var d=0;arguments.length>1&&(d=v(arguments[1]));for(d=d>=0?d:a-Math.abs(d);d<a;d++)if(d in b&&b[d]===c)return d;return-1};if(!Array.prototype.lastIndexOf)Array.prototype.lastIndexOf=function(c){var b=i(this),a=b.length>>>0;if(!a)return-1;var d=a-1;arguments.length>1&&(d=v(arguments[1]));
for(d=d>=0?d:a-Math.abs(d);d>=0;d--)if(d in b&&c===b[d])return d;return-1};if(!Object.getPrototypeOf)Object.getPrototypeOf=function(c){return c.__proto__||(c.constructor?c.constructor.prototype:f)};if(!Object.getOwnPropertyDescriptor)Object.getOwnPropertyDescriptor=function(c,b){if(typeof c!="object"&&typeof c!="function"||c===null)throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: "+c);if(h(c,b)){var a,d,e;a={enumerable:!0,configurable:!0};if(o){var g=c.__proto__;c.__proto__=
f;d=q(c,b);e=r(c,b);c.__proto__=g;if(d||e){if(d)a.get=d;if(e)a.set=e;return a}}a.value=c[b];return a}};if(!Object.getOwnPropertyNames)Object.getOwnPropertyNames=function(c){return Object.keys(c)};if(!Object.create)Object.create=function(c,b){var a;if(c===null)a={__proto__:null};else{if(typeof c!="object")throw new TypeError("typeof prototype["+typeof c+"] != 'object'");a=function(){};a.prototype=c;a=new a;a.__proto__=c}b!==void 0&&Object.defineProperties(a,b);return a};if(Object.defineProperty){var l=
n({}),z=typeof document=="undefined"||n(document.createElement("div"));if(!l||!z)var s=Object.defineProperty}if(!Object.defineProperty||s)Object.defineProperty=function(c,b,a){if(typeof c!="object"&&typeof c!="function"||c===null)throw new TypeError("Object.defineProperty called on non-object: "+c);if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Property description must be an object: "+a);if(s)try{return s.call(Object,c,b,a)}catch(d){}if(h(a,"value"))if(o&&(q(c,b)||r(c,
b))){var e=c.__proto__;c.__proto__=f;delete c[b];c[b]=a.value;c.__proto__=e}else c[b]=a.value;else{if(!o)throw new TypeError("getters & setters can not be defined on this javascript engine");h(a,"get")&&t(c,b,a.get);h(a,"set")&&u(c,b,a.set)}return c};if(!Object.defineProperties)Object.defineProperties=function(c,b){for(var a in b)h(b,a)&&Object.defineProperty(c,a,b[a]);return c};if(!Object.seal)Object.seal=function(c){return c};if(!Object.freeze)Object.freeze=function(c){return c};try{Object.freeze(function(){})}catch(E){Object.freeze=
function(c){return function(b){return typeof b=="function"?b:c(b)}}(Object.freeze)}if(!Object.preventExtensions)Object.preventExtensions=function(c){return c};if(!Object.isSealed)Object.isSealed=function(){return!1};if(!Object.isFrozen)Object.isFrozen=function(){return!1};if(!Object.isExtensible)Object.isExtensible=function(c){if(Object(c)===c)throw new TypeError;for(var b="";h(c,b);)b+="?";c[b]=!0;var a=h(c,b);delete c[b];return a};if(!Object.keys){var w=!0,x="toString,toLocaleString,valueOf,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,constructor".split(","),
A=x.length,j;for(j in{toString:null})w=!1;Object.keys=function b(a){if(typeof a!="object"&&typeof a!="function"||a===null)throw new TypeError("Object.keys called on a non-object");var b=[],d;for(d in a)h(a,d)&&b.push(d);if(w)for(d=0;d<A;d++){var e=x[d];h(a,e)&&b.push(e)}return b}}if(!Date.prototype.toISOString)Date.prototype.toISOString=function(){var b,a,d;if(!isFinite(this))throw new RangeError;b=[this.getUTCFullYear(),this.getUTCMonth()+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),
this.getUTCSeconds()];for(a=b.length;a--;)d=b[a],d<10&&(b[a]="0"+d);return b.slice(0,3).join("-")+"T"+b.slice(3).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"};if(!Date.now)Date.now=function(){return(new Date).getTime()};if(!Date.prototype.toJSON)Date.prototype.toJSON=function(){if(typeof this.toISOString!="function")throw new TypeError;return this.toISOString()};isNaN(Date.parse("2011-06-15T21:40:05+06:00"))&&(Date=function(b){var a=function y(a,d,e,f,h,i,j){var k=arguments.length;
return this instanceof b?(k=k==1&&String(a)===a?new b(y.parse(a)):k>=7?new b(a,d,e,f,h,i,j):k>=6?new b(a,d,e,f,h,i):k>=5?new b(a,d,e,f,h):k>=4?new b(a,d,e,f):k>=3?new b(a,d,e):k>=2?new b(a,d):k>=1?new b(a):new b,k.constructor=y,k):b.apply(this,arguments)},d=RegExp("^(\\d{4})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:\\.(\\d{3}))?)?(?:Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),e;for(e in b)a[e]=b[e];a.now=b.now;a.UTC=b.UTC;a.prototype=b.prototype;a.prototype.constructor=a;a.parse=function(a){var e=
d.exec(a);if(e){e.shift();for(var f=1;f<7;f++)e[f]=+(e[f]||(f<3?1:0)),f==1&&e[f]--;var f=+e.pop(),h=+e.pop(),i=e.pop(),j=0;if(i){if(h>23||f>59)return NaN;j=(h*60+f)*6E4*(i=="+"?-1:1)}return b.UTC.apply(this,e)+j}return b.parse.apply(this,arguments)};return a}(Date));j="\t\n\u000b\u000c\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff";if(!String.prototype.trim||j.trim()){j="["+j+"]";var B=RegExp("^"+j+j+"*"),C=RegExp(j+j+"*$");
String.prototype.trim=function(){return String(this).replace(B,"").replace(C,"")}}var v=function(b){b=+b;b!==b?b=-1:b!==0&&b!==1/0&&b!==-(1/0)&&(b=(b>0||-1)*Math.floor(Math.abs(b)));return b},D="a"[0]!="a",i=function(b){if(b==null)throw new TypeError;return D&&typeof b=="string"&&b?b.split(""):Object(b)}});

//JSON shim
var JSON=JSON||{};
(function(){function k(a){return a<10?"0"+a:a}function o(a){p.lastIndex=0;return p.test(a)?'"'+a.replace(p,function(a){var c=r[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function l(a,j){var c,d,h,m,g=e,f,b=j[a];b&&typeof b==="object"&&typeof b.toJSON==="function"&&(b=b.toJSON(a));typeof i==="function"&&(b=i.call(j,a,b));switch(typeof b){case "string":return o(b);case "number":return isFinite(b)?String(b):"null";case "boolean":case "null":return String(b);case "object":if(!b)return"null";
e+=n;f=[];if(Object.prototype.toString.apply(b)==="[object Array]"){m=b.length;for(c=0;c<m;c+=1)f[c]=l(c,b)||"null";h=f.length===0?"[]":e?"[\n"+e+f.join(",\n"+e)+"\n"+g+"]":"["+f.join(",")+"]";e=g;return h}if(i&&typeof i==="object"){m=i.length;for(c=0;c<m;c+=1)typeof i[c]==="string"&&(d=i[c],(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h))}else for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h);h=f.length===0?"{}":e?"{\n"+e+f.join(",\n"+e)+"\n"+g+"}":"{"+f.join(",")+
"}";e=g;return h}}if(typeof String.prototype.toJSON!=="function")String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()};var q=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
p=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,n,r={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},i;if(typeof JSON.stringify!=="function")JSON.stringify=function(a,j,c){var d;n=e="";if(typeof c==="number")for(d=0;d<c;d+=1)n+=" ";else typeof c==="string"&&(n=c);if((i=j)&&typeof j!=="function"&&(typeof j!=="object"||typeof j.length!=="number"))throw Error("JSON.stringify");return l("",
{"":a})};if(typeof JSON.parse!=="function")JSON.parse=function(a,e){function c(a,d){var g,f,b=a[d];if(b&&typeof b==="object")for(g in b)Object.prototype.hasOwnProperty.call(b,g)&&(f=c(b,g),f!==void 0?b[g]=f:delete b[g]);return e.call(a,d,b)}var d,a=String(a);q.lastIndex=0;q.test(a)&&(a=a.replace(q,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return d=eval("("+a+")"),typeof e==="function"?c({"":d},""):d;throw new SyntaxError("JSON.parse");}})();
