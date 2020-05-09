var rect = require('./rectangle')
// var rect = {
//     perimeter : (x,y) => (2*(x+y)),
//     area: (x,y) => (x*y)
// }

// function solveRect(l,b){
//     console.log("solving for rectangle");

//     if(l<=0||b<=0){
//         console.log("invalid dimension")
//     }
//     else{
//         console.log("the area of the rectangle is "+rect.area(l,b))
//     }


// }
function solveRect(l,b){
    console.log("solving for rectangle with "+l+"and"+b);


    rect(l,b,(err,rectangle) => {

        if(err){
            console.log("ERROR: ",err.message);
        }
        else{
            console.log("the area of the rectangle is "+rectangle.area());
            console.log("the perimeter of the rectangle is "+rectangle.perimeter());
        }
    });

    console.log("this is written after the call to rect")
};

solveRect(2,4)
solveRect(3,5)
solveRect(-1,4)