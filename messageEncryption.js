
// libraries

// mathjs
var math = require('mathjs');
// lodash imports
// array methods
var map = require('lodash/map');
var indexOf = require('lodash/indexOf');
var filter = require('lodash/filter');
var reduce = require('lodash/reduce');
var concat = require('lodash/concat');
var chunk = require('lodash/chunk');
var flatten = require('lodash/flatten')
// string methods
var words = require('lodash/words');
var split = require('lodash/split');

// Script Logic
var matrixEncryption = (function(){
  
  var characters = split(" abcdefghijklmnopqrstuvwxyz",'');
  // private cipher collection
  var users = {
    sampleUser: {
      cipher: null
    }
  };

  var randInt = function(min,max){
    return Math.floor(Math.random()*(max-min))+min;
  }
  var char2num = function(message){
    var space = 0;
    var numberArrays = map(words(message), function(i){
      var subArray =  map(split(i,''), function(j){
        return indexOf(characters,j.toLowerCase())
      });
      subArray.push(0);
      return subArray
    });
    return reduce(numberArrays,function(k,l){
      return concat(k,l)
    })
  };
  // how to generate row matricies of arbitrary length (n).
  // number of row matricies must not exceed array length.
  // if the array length is greater than one then there should be at least two row matricies.
  // choose random number describing row matrix length(n*), add 0's to array until the array is evenly
  // divisible by n*.
  var generateRowMatrix = function(array){
    var adjustRowLength = function(arr){
      if(arr.length > 1){
        var iterations = arr[arr.length-2].length - arr[arr.length-1].length;
        for (var i= 0; i< iterations; i++){
          arr[arr.length-1].push(0)
        }
      }
      return arr
    }
    // if the arrays length is > 1, make the number of row matricies a number between
    // 2 and (array length/ 2).
    var a = array.length;
    var b = a > 1? randInt(2,Math.floor(a/2)): 1;
    return adjustRowLength(chunk(array,b));
  };
  var generateCipher = function(n){
    var cipher = [];
    for( var i = 0; i<n; i++  ){
      var row = [];
      for( var j = 0; j<n; j++  ){
        row.push(randInt(1,100));
      }
      cipher.push(row);
    }
    return cipher
  }
  var encryptMessage = function(matrix,cipher){
    var product = math.multiply(matrix,cipher);
    return flatten(product).join(' ')
  }
  var decryptMessage = function(message,cipher){
  // repartition the message
    var parted = [];
    var stringParted = chunk(String(message).split(' '),cipher[0].length);
    stringParted.forEach(function(f){
      parted.push(map(f,function(g){
        return parseInt(g)
      }))
    })
    // multiply message by inverse cipher
    var numEncoded2 = [];
    var numEncoded = math.multiply(parted, math.inv(cipher));
    numEncoded.forEach(function(a){
      numEncoded2.push(map(a,function(b){
        return math.round(b);
      }));
    });
    // flatten the matrix, and map elements to alphabet
    var flat = map(flatten(numEncoded2),function(i){
      return characters[parseInt(i)];
    });
    return flat.join('').trim();
  }
  return {
    encrypt: function(message){
      var numberEncode = char2num(message);
      var rowMatrix = generateRowMatrix(numberEncode);
      var cipher =  generateCipher(rowMatrix[0].length);
      return {
        message: encryptMessage(rowMatrix,cipher),
        cipher: cipher
      };
    },
    decrypt: decryptMessage
  }
  
})();

// encrypt & decrypt methods returned from matrixEncryption module.
var encrypt = matrixEncryption.encrypt;
var decrypt = matrixEncryption.decrypt;

// message
var msg = "Reveal my content";

// invoking encryption/ decryption
var codedMessage = encrypt(msg);
var message = codedMessage.message;
var cipher = codedMessage.cipher;
console.log(message);
console.log(cipher);
console.log(decrypt(message, cipher));
