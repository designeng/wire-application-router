var wire = require('./build/wire.build.js');

console.log("wire", wire);

wire({
    test: 123,
    a: "a"
}).then(function(res){
    console.log("RES:", res);
}).otherwise(function(error){
    console.log("ERROR:", error);
});