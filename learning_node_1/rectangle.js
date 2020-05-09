// exports.perimeter=(x,y) => (x*y);
// exports.area = (x,y) => (2*(x+y));










module.exports = (x,y,callback) => {
    if(x<=0 || y<=0){
        setTimeout(() => 
            callback(new Error("Rectangle dimensions should be greater than 0"),
            null),
            2000
        );
    }
    else{
        setTimeout(() => callback(null,      //first argument to callbcak is error and the second argument is what to do/send back 
            {perimeter:() => (2*(x+y)),
            area:() => x*y}),
        2000);
    }
}
