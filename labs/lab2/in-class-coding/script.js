

// 1. current selection: <div id="viz-container"></div>
// 2. current selection: <svg></svg>


let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id", "viz")
                    .attr("width", 800)
                    .attr("height", 800)
;

viz.attr("height", 600);

// let myCircle = viz.append("circle")
//                     .attr("cx", 100)
//                     .attr("cy", 100)
//                     .attr("r", 90)
// ;

// myCircle.attr("fill", "white");


// FIRST TIME BINDING DATA

// let myData = [4, 6, 8, 2, 9];


// function randomXposition(){
//     return Math.random()*800;
// }

// function justChecking( whatDoesD3pass ){
//     console.log(whatDoesD3pass)
//     return Math.random()*800;
// }

function xPos(d, i){
    console.log("D3 passed", d, "into my xPos function!")
    console.log("D3 also passed", i)
    return 50 + i*80;
}
// function getRadius(d, i){
//     return d*4;
// }


// //                  0           5         5      
// viz.selectAll("circle").data(myData).enter().append("circle")
//                                                 .attr("cx", xPos )
//                                                 .attr("cy", 400)
//                                                 .attr("r", getRadius)
// ;

// [ circle ]
// [corcle ]
// [ curcle ]
// [ caerlce ]
// [ cerlce ]

function durianRadius(d, i){
    console.log(d)
    return d.durian*10;
}



function gotData(newData){
    console.log(newData)
    
    //              0               7           7
    viz.selectAll("circle").data(newData).enter().append("circle")
                                                .attr("cx", xPos )
                                                .attr("cy", 400)
                                                .attr("r", durianRadius)
    ;



}


d3.json("data.json").then(gotData)
