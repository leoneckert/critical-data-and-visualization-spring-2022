// heavily commented version of what we did in class today

// find instructions on how to get the data here:
// https://github.com/leoneckert/critical-data-and-visualization-spring-2022/tree/main/labs/collect-data-google-form

let data = [
    {
        "timestamp": "2022-02-10T02:37:18.560Z",
        "verySaltyFish": 5,
        "durian": 5,
        "centuryEgg": 1,
        "friedOreos": 3,
        "螺蛳粉": 3
    },
    {
        "timestamp": "2022-02-10T02:37:21.224Z",
        "verySaltyFish": 2,
        "durian": 4,
        "centuryEgg": 2,
        "friedOreos": 4,
        "螺蛳粉": 2
    },
    {
        "timestamp": "2022-02-10T02:37:22.235Z",
        "verySaltyFish": 5,
        "durian": 2,
        "centuryEgg": 1,
        "friedOreos": 3,
        "螺蛳粉": 3
    },
    {
        "timestamp": "2022-02-10T02:37:23.531Z",
        "verySaltyFish": 2,
        "durian": 3,
        "centuryEgg": 1,
        "friedOreos": 5,
        "螺蛳粉": 1
    },
    {
        "timestamp": "2022-02-10T02:37:31.955Z",
        "verySaltyFish": 4,
        "durian": 2,
        "centuryEgg": 1,
        "friedOreos": 4,
        "螺蛳粉": 2
    },
    {
        "timestamp": "2022-02-10T02:37:36.563Z",
        "verySaltyFish": 1,
        "durian": 5,
        "centuryEgg": 3,
        "friedOreos": 5,
        "螺蛳粉": 1
    },
    {
        "timestamp": "2022-02-10T02:37:39.947Z",
        "verySaltyFish": 4,
        "durian": 3,
        "centuryEgg": 5,
        "friedOreos": 4,
        "螺蛳粉": 3
    }
]



// A function Leon wrote to transform the structure of the data
// The function with many comments on description of what kind of
// data it transform into what other kind of data is here:
// https://github.com/leoneckert/critical-data-and-visualization-spring-2022/tree/master/labs/lab1#transform-data


function averageData(data){
  let newData = [];
  let keys = Object.keys(data[ data.length-1 ]);
  for(let i = 0; i < keys.length; i++){
    let key = keys[i];
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      if(key in datum){
        sum += datum[key];
        num++;
      }
    }
    let avg = sum/num;
    if(!isNaN(avg)){
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      newData.push(newDataPoint);
    }
  }
  return newData;
}

// here we use the function to transform the data
let transformedData = averageData(data);


// log things to the console as you go to make sure things
// are behaving as intended. I see the data looks good
console.log(transformedData);

// up here, we also select the container (div) on the page
// into which we insert the bars we create in the loop below
let container = document.getElementById("container");


// Loop over the data, once for each datapoint.
// in our case the loop loops 5 times because we have
// 5 foods in out dataset.
for(let i = 0; i < transformedData.length; i++){
  // get the item we deal with at this iteration
  let datapoint = transformedData[i];
  // datapoint looks like this in the first iteration:
  // {
  //   average: 3.2857142857142856
  //   name: "verySaltyFish"
  //   numMeasurements: 7
  // }

  // get the name of the current
  //  item by "digging" into the datapoint object
  // and the average liking value
  let food = datapoint.name;
  let average = datapoint.average;

  // in each iteration (once for each food)
  // we create a div
  let bar = document.createElement("div");

  // next, we assign the className to the div
  // that will make sure basic bar styling (defined in css/style.css)
  // is applied to it (like height, color, margin)
  bar.className = "bar";
  // because the width is different for each bar
  // we define it right here in javascript using the
  // average value of each data point that we iterate over
  // we stored average value in the variable "average" on line 178
  bar.style.width = (average * 30) + "px";


  // labels
  // so far we have a div that has a width that corresponds
  // to the data value. next we create a p-tag the
  // text (innerHTML) of which is the name of the food currently
  // iterated over
  // we stored the name in the variable "food" on line 184
  // create the tag
  let barname = document.createElement("p");
  // change the text
  barname.innerHTML = food;
  // now here we insert the p tag into the div tag we created above
  bar.appendChild(barname);
  // at this point the element we have created using JavaScript only
  // looks like:
  // <div class="bar"><p>watermelonWithFetaCheese</p></div>
  // (that is for the first datapoint (watermelonWithFetaCheese) that we iterate over)

  // that whole element (the div containing the p tag)
  // we append to the body after all
  // bring it from "JavaScript world" to "HTML world"
  container.appendChild(bar);




}
