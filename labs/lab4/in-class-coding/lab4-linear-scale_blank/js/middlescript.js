let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lightblue")
;

//


function gotData(incomingData){
  console.log(incomingData);

  // make 100 datagroups
  //                                  0                 100           100
  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class", "datagroup")
  ;
  

  
  // let minHeight = d3.min(incomingData, function(datapoint){
  //   return datapoint.height;
  // })
  let maxHeight = d3.max(incomingData, function(datapoint){
    return datapoint.height;
  })

  //min and mat at once are called "extent"
  // let heightExtent = d3.extent(incomingData, function(datapoint){
  //   return datapoint.height;
  // })
  // console.log(heightExtent)

  let padding = 20;
                  // manufacturing the scale
  let yScale = d3.scaleLinear().domain( [0, maxHeight] ).range( [0, h/2-padding] );
  let colorScale = d3.scaleLinear().domain( [400, maxHeight] ).range( ["black", "yellow"] );
  console.log( colorScale(300) )
             
  function getHeight(d, i){
    // console.log(d.name);
    let height = yScale(d.height);
    return height;
  }
  function getY(d, i){
    return -yScale(d.height);
  }
  function getColor(d, i){
    return colorScale( d.height )
    // if(d.name == "Shanghai Tower"){
    //   return "yellow"
    // }else{
    //   return "black"
    // }
  }
  // append a rectangle to each datagroup
  let towers = datagroups.append("rect")
      .attr("x", 0)
      .attr("y", getY)
      .attr("width", 20)
      .attr("height", getHeight)
      .attr("fill", getColor)
  ;

  function getName(d, i){
    return d.name;
  }
  let labels = datagroups.append("text")
    .attr("x", 3)
    .attr("y", -5)
    .text(getName)
    .attr("transform", "rotate(90)")
    .style("font-family", "sans-serif")
  ;

  //position the datagroups
  function getPosition(d, i){
    let x = i*(w/100);
    let y = h/2;
    return "translate("+x+", "+y+")";
  }
  datagroups.attr("transform", getPosition);
}


d3.json("buildings.json").then(gotData);
