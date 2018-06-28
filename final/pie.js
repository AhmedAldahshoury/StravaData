function dsPieChart1(){


  const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
  ];

  let newArr = {};



  for (obj of arr) {
      let date = new Date(obj["start_date"]);
      let year = date.getFullYear().toString();
      let month = monthNames[date.getMonth()];
      let day = date.getUTCDate().toString();

      if (!newArr[year]) {
          newArr[year] = {};
      }
      if (!newArr[year][month]) {
          newArr[year][month] = {};
      }
      if (!newArr[year][month][day]) {
          newArr[year][month][day] = obj;
      }

      if(obj["type"].toString()=="Ride" ){ // total Rides
            Rides++;
          }

      if(obj["type"].toString()=="Run" ){ // total Runs
            Runs++;
          }

      totalTime = totalTime + obj["moving_time"];// total time in mins
  }

      totalActivites = Rides+Runs;

  let otherObj = { name: "years", children: [] };






  for (item in newArr) {

      otherObj.children.push({ name: item, children: [] });
      for (innerItem in newArr[item]) {
          otherObj.children[otherObj.children.length - 1].children.push({
              name: innerItem,
              children: []
          });
          for (grandInnerItem in newArr[item][innerItem]) {
              otherObj.children[otherObj.children.length - 1].children[
                  otherObj.children[otherObj.children.length - 1].children
                      .length - 1
              ].children.push({ name:grandInnerItem.toString()+" "+innerItem.toString(), children: [] });
              for (innerGrandInnerItem in newArr[item][innerItem][
                  grandInnerItem
              ]) {

                if(innerGrandInnerItem == "distance"){
                  otherObj.children[otherObj.children.length - 1].children[
                      otherObj.children[otherObj.children.length - 1].children
                          .length - 1
                  ].children[
                      otherObj.children[otherObj.children.length - 1].children[
                          otherObj.children[otherObj.children.length - 1].children
                              .length - 1
                      ].children.length - 1
                  ].children.push({
                      name: innerGrandInnerItem.toString() +" : "+ parseInt(newArr[item][innerItem][grandInnerItem][
                          innerGrandInnerItem]/1000)+" km",
                      size:
                          (newArr[item][innerItem][grandInnerItem][
                              "moving_time"
                          ])/(3600*3)
                  });
                  totalDistance = totalDistance +(newArr[item][innerItem][grandInnerItem]["distance"]); // calculating total distance
                  totalElev = totalElev +(newArr[item][innerItem][grandInnerItem]["total_elevation_gain"]); // calculating total distance
                  PRs = PRs +(newArr[item][innerItem][grandInnerItem]["pr_count"]); // calculating total distance
                //  console.log(innerGrandInnerItem);
                }
                if(innerGrandInnerItem == "moving_time"){
                  otherObj.children[otherObj.children.length - 1].children[
                      otherObj.children[otherObj.children.length - 1].children
                          .length - 1
                  ].children[
                      otherObj.children[otherObj.children.length - 1].children[
                          otherObj.children[otherObj.children.length - 1].children
                              .length - 1
                      ].children.length - 1
                  ].children.push({
                      name: "duration : "+parseInt(newArr[item][innerItem][grandInnerItem][
                          innerGrandInnerItem]/60)+" mins",
                      size:
                          (newArr[item][innerItem][grandInnerItem][
                              "moving_time"
                          ])/(3600*3)
                  });
                //  console.log(innerGrandInnerItem);
                }
                if(innerGrandInnerItem== "name"){
                  otherObj.children[otherObj.children.length - 1].children[
                      otherObj.children[otherObj.children.length - 1].children
                          .length - 1
                  ].children[
                      otherObj.children[otherObj.children.length - 1].children[
                          otherObj.children[otherObj.children.length - 1].children
                              .length - 1
                      ].children.length - 1
                  ].children.push({
                      name:(newArr[item][innerItem][grandInnerItem][
                          innerGrandInnerItem]).toString(),
                      size:
                          (newArr[item][innerItem][grandInnerItem][
                              "moving_time"
                          ])/(3600*3)
                  });
                //  console.log(innerGrandInnerItem);
                }


                // longest Ride
                if((newArr[item][innerItem][grandInnerItem]["distance"])>maxDistanceRide && (newArr[item][innerItem][grandInnerItem]["type"]).toString()=="Ride" ){
                      maxDistanceRide = (newArr[item][innerItem][grandInnerItem]["distance"]);
                      maxDistanceRideID = newArr[item][innerItem][grandInnerItem]["id"].toString();
                    }

                // longest Run
                if((newArr[item][innerItem][grandInnerItem]["distance"])>maxDistanceRun && (newArr[item][innerItem][grandInnerItem]["type"]).toString()=="Run" ){
                      maxDistanceRun = (newArr[item][innerItem][grandInnerItem]["distance"]);
                      maxDistanceRunID = newArr[item][innerItem][grandInnerItem]["id"].toString();
                    }

              }
          }
      }

  }


var dataset =

}
