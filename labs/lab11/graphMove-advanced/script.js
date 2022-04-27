let w = 700;
let h = 500;
let wW = window.innerWidth;
let wH = window.innerHeight;
let padding = 90;
let paddingTopBottom = (wH-h)/2;
let paddingLeftRight = (wW-w)/2;


let viz = d3.select("#vizContainer").append("svg")
    .style("width", wW)
    .style("height", wH*2)
    .style("background-color", "lavender")
;


let bothGraphs = viz.append("g")
    .attr("class", "bothGraphs")
;
let graphTranslationScale = d3.scaleLinear().domain([0, 1]).range([0, -wH])




// bothGraphs.append("rect")
//   .attr("x", paddingLeftRight)
//   .attr("y", paddingTopBottom)
//   .attr("width", w)
//   .attr("height", h)
//   .attr("fill", "grey")
// ;
// bothGraphs.append("rect")
//   .attr("x", paddingLeftRight)
//   .attr("y", wH+paddingTopBottom)
//   .attr("width", w)
//   .attr("height", h)
//   .attr("fill", "grey")
// ;

// // get data
d3.json("monarchs.json").then(function(incomingData){
  data = formatData(incomingData);
  // groupedByType = d3.group(data, d => d.type)
  // console.log(groupedByType)
  let types = data.map(d=>d.type).filter(onlyUnique); //see onlyUnique function at bottom
  let typeCount = {}
  types.forEach(d=>{
    typeCount[d] = 0;
  })
  // console.log(typeCount)
  let maxTypeCount = 0;
  data.forEach(d=>{
    // console.log(d, typeCount[d.tpe])
    d.countInType = typeCount[d.type];
    typeCount[d.type]++
    maxTypeCount = Math.max(typeCount[d.type],maxTypeCount)


  })

  console.log(maxTypeCount)

  console.log(data)


  // build axis for both graphs
  // graph1
  // xscale and axis
  let g1XScale = d3.scaleTime().range([paddingLeftRight, wW-paddingLeftRight]);
  g1XScale.domain( d3.extent(data, d=>d.date) )
  let g1XAxis = d3.axisBottom(g1XScale).tickFormat(d3.timeFormat("%-Y"));
  let g1XAxisGroup = bothGraphs.append("g")
      .attr("class", "g1xaxisgroup")
      .attr("transform", "translate(0,"+(paddingTopBottom+h)+")")
  ;
  g1XAxisGroup.call(g1XAxis);
  //yscale and axis
  let g1YScale = d3.scaleBand().range([paddingTopBottom, wH-paddingTopBottom]);
  g1YScale.domain(types);
  let g1YAxis = d3.axisLeft(g1YScale);
  let g1YAxisGroup = bothGraphs.append("g")
      .attr("class", "g1yaxisgroup")
      .attr("transform", "translate("+paddingLeftRight+",0)")

  ;
  g1YAxisGroup.call(g1YAxis);
  g1YAxisGroup.selectAll("line").attr("display", "none");
  g1YAxisGroup.selectAll("path").attr("display", "none");
  g1YAxisGroup.selectAll("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", "0")
  ;

  // build axis for both graphs
  // graph2
  // xscale and axis
  let g2XScale = d3.scaleBand().range([paddingLeftRight, wW-paddingLeftRight]);
  g2XScale.domain(types)
  let g2XAxis = d3.axisBottom(g2XScale);
  let g2XAxisGroup = bothGraphs.append("g")
      .attr("class", "g2xaxisgroup")
      .attr("transform", "translate(0,"+(wH+paddingTopBottom+h)+")")
  ;
  g2XAxisGroup.call(g2XAxis);
  //yscale and axis
  // let maxType = d3.max(groupedByType, d=>{
  //   return d[1].length;
  // })
  // console.log(maxType)
  let g2YScale = d3.scaleLinear().range([wH+paddingTopBottom, wH+wH-paddingTopBottom]);
  g2YScale.domain([maxTypeCount, 0])
  // let g2YAxis = d3.axisLeft(g2YScale);
  // let g2YAxisGroup = bothGraphs.append("g")
  //     .attr("class", "g2yaxisgroup")
  //     .attr("transform", "translate("+paddingLeftRight+",0)")

  // ;
  // g2YAxisGroup.call(g2YAxis);

  

  let graphics = bothGraphs.append("g").attr("class", "graphics");


  // build graph 1
  function showGraph1(){
    let datagroups = graphics.selectAll(".datagroup").data(data, d=>d.event);
    let enterSelection = datagroups.enter()
      .append("g")
        .attr("class", "datagroup")
        .attr("transform", function(d){
          // console.log(d, "translate("+ g1XScale(d.date) +","+ (g1YScale(d.type) + g1YScale.bandwidth()/2 )+")");
          return "translate("+ g1XScale(d.date) +","+ (g1YScale(d.type) + g1YScale.bandwidth()/2 )+")"
        })
    ;
    enterSelection.append("circle")
      .attr("r", 10)
      .attr("opacity", 0.5)
      .attr("fill", "red")
    ;

    //update:
    datagroups
    .transition()
    .duration(1000)
    .attr("transform", function(d){
      // console.log(d, "translate("+ g1XScale(d.date) +","+ (g1YScale(d.type) + g1YScale.bandwidth()/2 )+")");
      return "translate("+ g1XScale(d.date) +","+ (g1YScale(d.type) + g1YScale.bandwidth()/2 )+")"
    })
  }

  showGraph1();


  function showGraph2(){
    let datagroups = graphics.selectAll(".datagroup").data(data,  d=>d.event);
    let enterSelection = datagroups.enter()
      .append("g")
        .attr("class", "datagroup")
        .attr("transform", function(d, i){
          // console.log(d, "translate("+ g1XScale(d.date) +","+ (g1YScale(d.type) + g1YScale.bandwidth()/2 )+")");
          return "translate("+ (g2XScale(d.type)+g2XScale.bandwidth()/2) +","+ (g2YScale(d.countInType) )+")"
        })
    ;
    enterSelection.append("circle")
      .attr("r", 10)
      .attr("opacity", 0.5)
      .attr("fill", "red")
    ;

    //update elements:
    datagroups
    .transition()
    .duration(1000)
    .attr("transform", function(d, i){
      // console.log(d, "translate("+ g1XScale(d.date) +","+ (g1YScale(d.type) + g1YScale.bandwidth()/2 )+")");
      return "translate("+ (g2XScale(d.type)+g2XScale.bandwidth()/2) +","+ (g2YScale(d.countInType) )+")"
    })

  }

  // showGraph2();


  
  let current = 1;
  enterView({
    selector: '.secondWindow',
    enter: function(el) {
      console.log('a special element entered');
      // console.log("Color")
      // myData[0][3] = "lightyellow"
      // updateGraph();
  
    },
    exit: function(el) {
      console.log('a special element exited');
      // myData[0][3] = "lightblue"
      // updateGraph();
      showGraph1()
  
    },
    prev: undefined,
    progress: function(el, progress) {
      console.log("the special element's progress is:", progress, this.prev);


      bothGraphs.attr("transform", ()=>{
        return "translate(0, "+graphTranslationScale(progress)+")"
      });
      console.log(graphTranslationScale(progress))
// let graphTranslationScale = d3.scaleLinear().domain([0, 100]).range([0, -wH])

      if(this.prev < progress && progress > 0.5 && current != 2){
        showGraph2()
        current = 2
      }else if(this.prev > progress && progress <= 0.5 && current != 1){
        showGraph1()
        current = 1
      }



      // if(progress==1){
      //   showGraph2()
      // }
      this.prev = progress;
    },
    offset: 0.5, // enter at middle of viewport
    // once: true, // trigger just once
  });



  







});


let timeParse = d3.timeParse("%Y");

function formatData(incoming){
  let keys = Object.keys(incoming.Dates);
  return keys.map((d)=>{
    incoming.Dates[d].date = timeParse(incoming.Dates[d].date)
    return incoming.Dates[d];
  });

}

//from: https://stackoverflow.com/a/14438954
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
