let vizWidth = 600;
let vizHeight = 400;

let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id", "viz")
                    .attr("width", vizWidth)
                    .attr("height", vizHeight)
                    .style("background-color", "lavender")
;

// dataset 
let myData = [
    {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        text: "Ut etiam sit amet nisl purus in."
    },
    {
        text: "Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper."
    },
    {
        text: "Condimentum lacinia quis vel eros."
    },
    {
        text: "Gravida quis blandit turpis cursus."
    },    
];


let datagroups = viz.selectAll(".datagroup").data(myData).enter().append("g")
                                                                    .attr("class", "datagroup")
;

let rectWidth = 100;
let rectHeight = 70;

// appending rectangles to each data group
// note: the width and height of the rectangles is
// the same width and height we want the text to fit into.
datagroups.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", rectWidth)
    .attr("height", rectHeight)
    .attr("fill", "white")
;

// random positions for the rectangles
datagroups.attr("transform", function(){
    let x = Math.random()*(600-rectWidth);
    let y = Math.random()*(400-rectHeight);
    return "translate("+x+", "+y+")"
})

//Append text into each rectangle
let texts = datagroups.append("text")
            .text(function(d, i){
                return d.text;
            })
            .attr("y", 12)
            // wrap the text: 
            .call(cdvTextWrap(rectWidth)) // <------ HERE!
;


