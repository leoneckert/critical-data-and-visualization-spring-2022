## Lab 11: Scrolling & Force Graphs

- show examples
  - [http://www.bmdata.co.uk/titanic/](http://www.bmdata.co.uk/titanic/)
  - [https://cdv.leoneckert.com/show/jerry/](https://cdv.leoneckert.com/show/jerry/)
  - [Live: in class 2021](https://leoneckert.github.io/critical-data-and-visualization-spring-2022/labs/lab11/in-class-2021)
  - [Live: advanced](https://leoneckert.github.io/critical-data-and-visualization-spring-2022/labs/lab11/graphMove-advanced)
  - in class example (same as "advanced" above)
    - [code](in-class-2022)
    - [live](https://leoneckert.github.io/critical-data-and-visualization-spring-2022/labs/lab11/in-class-2022)
    - alternative version using [d3.interpolate](https://github.com/d3/d3-interpolate/blob/main/README.md)
      - [code](after-class-2022-alternative-transition)
      - [live](https://leoneckert.github.io/critical-data-and-visualization-spring-2022/labs/lab11/after-class-2022-alternative-transition)
- resource for scrolling
  - [https://pudding.cool/process/scrollytelling-sticky/](https://pudding.cool/process/scrollytelling-sticky/)
- Force Graph Video:
  - [Exercise files](force-start.zip)
  - [Video](https://drive.google.com/file/d/1vpud5i8zBfPOSu7tpyZPpWohZ3dB3bwo/view?usp=sharing) (39:55)
- Scrolling Interaction and sticky Elements
  - [boilerplate code](sticky-basic.zip) (from 2021 example)
  - in class demo (if requested)
    - [recording-2021](https://drive.google.com/file/d/1-3UbWfBNNJ2rwBForOrqB1HFBeX7GmWS/view?usp=sharing)
    - [code: in-class code 2021](in-class-2021)


#### add-on:
this is an example where points are shown on three different force graphs and can be transitioned (by clicking onto the graphs, not ideal, no ideal :D). The "trick"/take-away here is how the positions on each graph (x1, y1, x2, y2, x3, y3) and all cacluation with simlations ONCE, then stored inside the data object and then simply re-used in transitions. That make the experience more smooth because the simulations are quite processing-intensive. I am doing this in all the `.on("end", ...)` events and by wrapping each simulation (three of them) in their own function, executing one after another. 
- [code](force-graphs-authors)
- [live](https://leoneckert.github.io/critical-data-and-visualization-spring-2022/labs/lab11/force-graphs-authors)
