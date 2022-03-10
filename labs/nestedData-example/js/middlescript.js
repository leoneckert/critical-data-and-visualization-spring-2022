let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;

function transformData(dataToBeTransformed){
    let groupedData = d3.group(dataToBeTransformed, function(datapoint){
        // here we tell the group function by which feature/key we want to group
        return datapoint.day;
    })
    console.log(groupedData)
    // as you can see in the documentation, this produces a data structure called "map": https://github.com/d3/d3-array#group
    // some limes below, the documentation also says how to turn it into a more familiar array
    let normalArrayVersion = Array.from(groupedData);
    return normalArrayVersion

}
function gotData(incomingData){
    // all the data:
    console.log(incomingData);
    // before I trransform the shape of data, I will get the max intensity of the data points, it's easier to do this here
    // because the data is just one, "flat" array
    let maxIntensity = d3.max(incomingData, function(d, i){
        return d.intensity
    })
    let minIntensity = d3.min(incomingData, function(d, i){
        return d.intensity
    })
    let radiusScale = d3.scaleLinear().domain( [minIntensity, maxIntensity] ).range( [ 5, 20 ] )

    // I want to organize my data by day. a rectangle for each day.
    // for this purpose I want to rearrange it.
    // i want an array with an element for each day, and then, inside this element are all the data points for the day
    let transformedData = transformData(incomingData)
    console.log("transformedData", transformedData)
    // now we have an array with 5 elements, one for each day where each element is an array containing name of the group (the day)
    // and the data that has been groups for us. it looks like:
    // [
    // ['monday', Array(2)],
    // ['friday', Array(2)],
    // ['tuesday', Array(3)],
    // ['wednesday', Array(1)],
    // ['thursday', Array(1)]
    // ]
    
    // if we bind the data now, 5 elements will be created, i call them dayGroups:
    let dayGroups = viz.selectAll(".dayGroup").data(transformedData).enter()
        .append("g")
            .attr("class", "dayGroup")
            .attr("transform", function(d, i){
                let x = 20+i*210
                return "translate("+x+", 100)" ;
            })
    ;
    
    // appending rectangle to them creates one rectangle for each day:
    dayGroups.append("rect")
            .attr("width", 200)
            .attr("height", 200)
            .attr("fill", "none")
            .attr("stroke", "black")
    ;

    // appending TEXT let's us create one text for each day:
    dayGroups.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .text(function(d, i){
            // IMPORTANT, "d" here is the whole day's data  <---------------- !
            // that means this d looks like ['monday', Array(2)]
            // and contains all the individual datapoints that are associated with "monday for example"
            let day = d[0]
            return day
        })
    ;
    
    // this function is used below:
    function getDaysData(d, i){
        // in here d is ['monday', Array(2)]
        // we are now returning this array as the data we bind to 
        // each day's group respectively:
        return d[1]
    }

    // NOW comes the interesting bit  <--------------------------------!
    // we bind data to each day. that is here we start the nesting!
    // all we do now happens once for each day
                // no data points exist: 0          different num of datapoints for each day
    let dataPointGroups = dayGroups.selectAll(".datapoint").data(getDaysData).enter()
        .append("g")
            .attr("class", "datapoint")
            .attr("transform", function(d, i){
                let x = 20 + Math.random()*(200 - 20 * 2);
                let y = 20 + Math.random()*(200 - 20 * 2);
                return "translate("+x+", "+y+")";
            })
    ;

    // now we append circle or shapes as we are used to
    // this happens for every datappoint inside every day's space
    dataPointGroups.append("circle")
            .attr("r", function(d, i){
                return radiusScale(d.intensity)
            })
            .attr("fill", function(d, i){
                if(d.mood == "happy"){
                    return "yellow";
                }else if(d.mood == "sad"){
                    return "black";
                }
            })
            
    ;
}


// I make up data for the purpose of this example
let data = [
    {
        day: "monday",
        intensity: 8,
        mood: "happy"
    },
    {
        day: "friday",
        intensity: 4,
        mood: "happy"
    },
    {
        day: "tuesday",
        intensity: 12,
        mood: "sad"
    },
    {
        day: "monday",
        intensity: 1,
        mood: "happy"
    },
    {
        day: "tuesday",
        intensity: 3,
        mood: "sad"
    },
    {
        day: "wednesday",
        intensity: 8,
        mood: "sad"
    },
    {
        day: "friday",
        intensity: 17,
        mood: "happy"
    },
    {
        day: "thursday",
        intensity: 3,
        mood: "happy"
    },
    {
        day: "tuesday",
        intensity: 9,
        mood: "happy"
    }



]

gotData(data);