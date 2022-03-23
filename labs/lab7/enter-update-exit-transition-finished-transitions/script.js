let w = 960;
let h = 640;
let xPadding = 70;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
;


function gotData(incomingData){
  console.log(incomingData);

  // getting min max of our data.
  // because if the structure of this particular data (5 mini datasets in one)
  // getting the min and max computationally would be slightly different
  // that we have done in the past. It uses d3.min and d3.max but requires 
  // one extra step. For sake of time, I am "hardcoding" the minimum and
  // maximum here. But if you scroll down I included 2 varieties of solutions
  // to get min and max computationally!  
  let minX = 0;
  let maxX = 145;
  let minY = 0;
  let maxY = 140

  // x scale and axis:
  let xScale = d3.scaleLinear().domain( [minX, maxX] ).range( [xPadding, w-xPadding] );
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis);
  xAxisGroup.attr("transform", "translate(0, "+(h-yPadding)+")")

  // y scale and axis:
  let yScale = d3.scaleLinear().domain( [minY, maxY] ).range( [h-yPadding, yPadding] );
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate("+xPadding+", 0)")


  let vizGroup = viz.append("g").attr("class", "vizGroup");




  function getGroupLocation(d, i){
    let x = xScale(d.x);
    let y = yScale(d.y);
    return "translate("+x+", "+y+")"
  }
  function getIncomingGroupLocation(d, i){
    let x = xScale(d.x);
    let y = -30;
    return "translate("+x+", "+y+")"
  }

  function getExitingGroupLocation(d, i){
    let x = xScale(d.x);
    let y = h+30;
    return "translate("+x+", "+y+")"
  }

  let dataIndex = 0;

  function visualizeData(){
    // get data
    let dataToShow = incomingData[dataIndex];
    console.log("the data:", dataToShow);

    function assignKey(d, i){
      return d.name
    }
    // UPDATING ELEMENTS:
    let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow, assignKey)
    datagroups.transition().duration(500).attr("transform", getGroupLocation);
    // datagroups.select("text")
    //   .text(function(d, i){
    //     return d.name;
    //   })
    // ;


    // ENTERING ELEMENTS
    let enteringElements = datagroups.enter()
      .append("g")
        .attr("class", "datagroup")
    ;

    enteringElements.append("circle")
      .attr("r", 30)
      .attr("fill", "red")
    ;
    enteringElements.append("text")
      .text(function(d, i){
        return d.name;
      })
      .attr("x", -17)
      .attr("y", 17)
      .attr("font-family", "sans-serif")
      .attr("font-size", "3em")
      .attr("fill", "white")
      
    ;

    enteringElements.attr("transform", getIncomingGroupLocation).transition().delay(500).attr("transform", getGroupLocation);


    // EXITING ELEMENTS:
    let exitingElements = datagroups.exit();
    // exitingElements.attr("opacity", 1).transition().attr("opacity", 0.5).remove();
    exitingElements.transition().delay(500).attr("transform", getExitingGroupLocation).remove();

    
    
  }


  

  // event listeners
  // step 1 button
  document.getElementById("step1").addEventListener("click", function(){
    dataIndex = 0;
    visualizeData();
  });
  // step 2 button
  document.getElementById("step2").addEventListener("click", function(){
    dataIndex = 1;
    visualizeData();
  });

  // step 3 button
  document.getElementById("step3").addEventListener("click", function(){
    dataIndex = 2;
    visualizeData();
  });

  // step 4 button
  document.getElementById("step4").addEventListener("click", function(){
    dataIndex = 3;
    visualizeData();
  });
  // step 5 button
  document.getElementById("step5").addEventListener("click", function(){
    dataIndex = 4;
    visualizeData();
  });



}



d3.json("data.json").then(gotData);












/*
Minimum and Maximum of our Data

The Problem:


Solution #1:
Nested use of d3.min and d3.max


Solution #2:
Using d3.merge to flatten the data array temporarily. 
Documentation: https://github.com/d3/d3-array/blob/main/README.md#merge


*/