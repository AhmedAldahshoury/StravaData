// URL: https://beta.observablehq.com/@ahmedaldahshoury/d3-zoomable-sunburst
// Title: Strava activities relative to activities (Ride/Run) duration time
// Author: Ahmed Aldahshoury (@ahmedaldahshoury)
// Version: 407
// Runtime version: 1

const m0 = {
  id: "e4be36954ab88b66@407",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Strava activities relative to activities (Ride/Run) duration time

Click a node to zoom in, or click the center to zoom out.`
)})
    },
    {
      name: "chart",
      inputs: ["partition","data","d3","DOM","width","color","arc","format","radius"],
      value: (function(partition,data,d3,DOM,width,color,arc,format,radius)
{
  const root = partition(data);

  root.each(d => d.current = d);

  const svg = d3.select(DOM.svg(width, width))
      .style("width", "50%")
      .style("height", "50%")
      .style("font", "14px sans-serif");

  const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${width / 2})`);

  const path = g.append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .enter().append("path")
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("d", d => arc(d.current));

  path.filter(d => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

  path.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  const label = g.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .enter().append("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", d => +labelVisible(d.current))
      .attr("transform", d => labelTransform(d.current))
      .text(d => d.data.name);

  const parent = g.append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

  function clicked(p) {
    parent.datum(p.parent || root);

    root.each(d => d.target = {
      x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      y0: Math.max(0, d.y0 - p.depth),
      y1: Math.max(0, d.y1 - p.depth)
    });

    const t = g.transition().duration(750);

    // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.
    path.transition(t)
        .tween("data", d => {
          const i = d3.interpolate(d.current, d.target);
          return t => d.current = i(t);
        })
      .filter(function(d) {
        return +this.getAttribute("fill-opacity") || arcVisible(d.target);
      })
        .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attrTween("d", d => () => arc(d.current));

    label.filter(function(d) {
        return +this.getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));
  }

  function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  function labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }

  return svg.node();
}
)
    },
    {
      name: "data",
      value: (function()
{
  return{
    "name": "years",
    "children": [
      {
        "name": "2014",
        "children": [
          {
            "name": "Dec",
            "children": [
              {
                "name": "14 Dec",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.7282407407407407
                  },
                  {
                    "name": "distance : 40 km",
                    "size": 0.7282407407407407
                  },
                  {
                    "name": "duration : 131 mins",
                    "size": 0.7282407407407407
                  }
                ]
              }
            ]
          },
          {
            "name": "Oct",
            "children": [
              {
                "name": "2 Oct",
                "children": [
                  {
                    "name": "Afternoon GUC Ride",
                    "size": 0.5052777777777778
                  },
                  {
                    "name": "distance : 28 km",
                    "size": 0.5052777777777778
                  },
                  {
                    "name": "duration : 90 mins",
                    "size": 0.5052777777777778
                  }
                ]
              }
            ]
          },
          {
            "name": "Sep",
            "children": [
              {
                "name": "12 Sep",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.7026851851851852
                  },
                  {
                    "name": "distance : 43 km",
                    "size": 0.7026851851851852
                  },
                  {
                    "name": "duration : 126 mins",
                    "size": 0.7026851851851852
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "2015",
        "children": [
          {
            "name": "Nov",
            "children": [
              {
                "name": "1 Nov",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.2962962962962963
                  },
                  {
                    "name": "distance : 18 km",
                    "size": 0.2962962962962963
                  },
                  {
                    "name": "duration : 53 mins",
                    "size": 0.2962962962962963
                  }
                ]
              }
            ]
          },
          {
            "name": "Oct",
            "children": [
              {
                "name": "27 Oct",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.565
                  },
                  {
                    "name": "distance : 24 km",
                    "size": 0.565
                  },
                  {
                    "name": "duration : 101 mins",
                    "size": 0.565
                  }
                ]
              },
              {
                "name": "30 Oct",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.792962962962963
                  },
                  {
                    "name": "distance : 25 km",
                    "size": 0.792962962962963
                  },
                  {
                    "name": "duration : 142 mins",
                    "size": 0.792962962962963
                  }
                ]
              }
            ]
          },
          {
            "name": "Jul",
            "children": [
              {
                "name": "2 Jul",
                "children": [
                  {
                    "name": "Evening Run",
                    "size": 0.3202777777777778
                  },
                  {
                    "name": "distance : 7 km",
                    "size": 0.3202777777777778
                  },
                  {
                    "name": "duration : 57 mins",
                    "size": 0.3202777777777778
                  }
                ]
              }
            ]
          },
          {
            "name": "Jun",
            "children": [
              {
                "name": "16 Jun",
                "children": [
                  {
                    "name": "Afternoon Run",
                    "size": 1.0269444444444444
                  },
                  {
                    "name": "distance : 12 km",
                    "size": 1.0269444444444444
                  },
                  {
                    "name": "duration : 184 mins",
                    "size": 1.0269444444444444
                  }
                ]
              },
              {
                "name": "20 Jun",
                "children": [
                  {
                    "name": "Abha Night Run",
                    "size": 0.31175925925925924
                  },
                  {
                    "name": "distance : 5 km",
                    "size": 0.31175925925925924
                  },
                  {
                    "name": "duration : 56 mins",
                    "size": 0.31175925925925924
                  }
                ]
              }
            ]
          },
          {
            "name": "May",
            "children": [
              {
                "name": "24 May",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.7387962962962963
                  },
                  {
                    "name": "distance : 7 km",
                    "size": 0.7387962962962963
                  },
                  {
                    "name": "duration : 132 mins",
                    "size": 0.7387962962962963
                  }
                ]
              }
            ]
          },
          {
            "name": "Apr",
            "children": [
              {
                "name": "17 Apr",
                "children": [
                  {
                    "name": "Morning Ride",
                    "size": 0.4559259259259259
                  },
                  {
                    "name": "distance : 20 km",
                    "size": 0.4559259259259259
                  },
                  {
                    "name": "duration : 82 mins",
                    "size": 0.4559259259259259
                  }
                ]
              }
            ]
          },
          {
            "name": "Mar",
            "children": [
              {
                "name": "29 Mar",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 1.0161111111111112
                  },
                  {
                    "name": "distance : 55 km",
                    "size": 1.0161111111111112
                  },
                  {
                    "name": "duration : 182 mins",
                    "size": 1.0161111111111112
                  }
                ]
              }
            ]
          },
          {
            "name": "Feb",
            "children": [
              {
                "name": "10 Feb",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.12277777777777778
                  },
                  {
                    "name": "distance : 14 km",
                    "size": 0.12277777777777778
                  },
                  {
                    "name": "duration : 22 mins",
                    "size": 0.12277777777777778
                  }
                ]
              },
              {
                "name": "14 Feb",
                "children": [
                  {
                    "name": "GUC Afternoon Ride",
                    "size": 0.3883333333333333
                  },
                  {
                    "name": "distance : 24 km",
                    "size": 0.3883333333333333
                  },
                  {
                    "name": "duration : 69 mins",
                    "size": 0.3883333333333333
                  }
                ]
              },
              {
                "name": "27 Feb",
                "children": [
                  {
                    "name": "wheelers Morning Ride",
                    "size": 1.2725925925925925
                  },
                  {
                    "name": "distance : 74 km",
                    "size": 1.2725925925925925
                  },
                  {
                    "name": "duration : 229 mins",
                    "size": 1.2725925925925925
                  }
                ]
              }
            ]
          },
          {
            "name": "Jan",
            "children": [
              {
                "name": "11 Jan",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.5287037037037037
                  },
                  {
                    "name": "distance : 23 km",
                    "size": 0.5287037037037037
                  },
                  {
                    "name": "duration : 95 mins",
                    "size": 0.5287037037037037
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "2016",
        "children": [
          {
            "name": "Nov",
            "children": [
              {
                "name": "6 Nov",
                "children": [
                  {
                    "name": "Morning Ride",
                    "size": 0.7477777777777778
                  },
                  {
                    "name": "distance : 37 km",
                    "size": 0.7477777777777778
                  },
                  {
                    "name": "duration : 134 mins",
                    "size": 0.7477777777777778
                  }
                ]
              },
              {
                "name": "15 Nov",
                "children": [
                  {
                    "name": "Lunch Ride",
                    "size": 0.14444444444444443
                  },
                  {
                    "name": "distance : 7 km",
                    "size": 0.14444444444444443
                  },
                  {
                    "name": "duration : 26 mins",
                    "size": 0.14444444444444443
                  }
                ]
              },
              {
                "name": "16 Nov",
                "children": [
                  {
                    "name": "Uni Ride",
                    "size": 0.17777777777777778
                  },
                  {
                    "name": "distance : 7 km",
                    "size": 0.17777777777777778
                  },
                  {
                    "name": "duration : 32 mins",
                    "size": 0.17777777777777778
                  }
                ]
              }
            ]
          },
          {
            "name": "Oct",
            "children": [
              {
                "name": "1 Oct",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.031203703703703702
                  },
                  {
                    "name": "distance : 1 km",
                    "size": 0.031203703703703702
                  },
                  {
                    "name": "duration : 5 mins",
                    "size": 0.031203703703703702
                  }
                ]
              },
              {
                "name": "24 Oct",
                "children": [
                  {
                    "name": "Night Run",
                    "size": 0.5236111111111111
                  },
                  {
                    "name": "distance : 6 km",
                    "size": 0.5236111111111111
                  },
                  {
                    "name": "duration : 94 mins",
                    "size": 0.5236111111111111
                  }
                ]
              }
            ]
          },
          {
            "name": "Sep",
            "children": [
              {
                "name": "30 Sep",
                "children": [
                  {
                    "name": "Lunch Ride",
                    "size": 0.3661111111111111
                  },
                  {
                    "name": "distance : 15 km",
                    "size": 0.3661111111111111
                  },
                  {
                    "name": "duration : 65 mins",
                    "size": 0.3661111111111111
                  }
                ]
              }
            ]
          },
          {
            "name": "Apr",
            "children": [
              {
                "name": "15 Apr",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.40879629629629627
                  },
                  {
                    "name": "distance : 25 km",
                    "size": 0.40879629629629627
                  },
                  {
                    "name": "duration : 73 mins",
                    "size": 0.40879629629629627
                  }
                ]
              }
            ]
          },
          {
            "name": "Feb",
            "children": [
              {
                "name": "6 Feb",
                "children": [
                  {
                    "name": "Lunch Run",
                    "size": 0.11787037037037038
                  },
                  {
                    "name": "distance : 1 km",
                    "size": 0.11787037037037038
                  },
                  {
                    "name": "duration : 21 mins",
                    "size": 0.11787037037037038
                  }
                ]
              },
              {
                "name": "20 Feb",
                "children": [
                  {
                    "name": "Morning Run",
                    "size": 0.4615740740740741
                  },
                  {
                    "name": "distance : 4 km",
                    "size": 0.4615740740740741
                  },
                  {
                    "name": "duration : 83 mins",
                    "size": 0.4615740740740741
                  }
                ]
              },
              {
                "name": "21 Feb",
                "children": [
                  {
                    "name": "Morning Run",
                    "size": 0.10990740740740741
                  },
                  {
                    "name": "distance : 1 km",
                    "size": 0.10990740740740741
                  },
                  {
                    "name": "duration : 19 mins",
                    "size": 0.10990740740740741
                  }
                ]
              }
            ]
          },
          {
            "name": "Jan",
            "children": [
              {
                "name": "16 Jan",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.42944444444444446
                  },
                  {
                    "name": "distance : 18 km",
                    "size": 0.42944444444444446
                  },
                  {
                    "name": "duration : 77 mins",
                    "size": 0.42944444444444446
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "2017",
        "children": [
          {
            "name": "Dec",
            "children": [
              {
                "name": "1 Dec",
                "children": [
                  {
                    "name": "Night Ride",
                    "size": 1
                  },
                  {
                    "name": "distance : 65 km",
                    "size": 1
                  },
                  {
                    "name": "duration : 180 mins",
                    "size": 1
                  }
                ]
              },
              {
                "name": "2 Dec",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.38166666666666665
                  },
                  {
                    "name": "distance : 22 km",
                    "size": 0.38166666666666665
                  },
                  {
                    "name": "duration : 68 mins",
                    "size": 0.38166666666666665
                  }
                ]
              },
              {
                "name": "8 Dec",
                "children": [
                  {
                    "name": "Morning Ride",
                    "size": 0.43472222222222223
                  },
                  {
                    "name": "distance : 22 km",
                    "size": 0.43472222222222223
                  },
                  {
                    "name": "duration : 78 mins",
                    "size": 0.43472222222222223
                  }
                ]
              },
              {
                "name": "15 Dec",
                "children": [
                  {
                    "name": "Lunch Run",
                    "size": 0.13777777777777778
                  },
                  {
                    "name": "distance : 2 km",
                    "size": 0.13777777777777778
                  },
                  {
                    "name": "duration : 24 mins",
                    "size": 0.13777777777777778
                  }
                ]
              },
              {
                "name": "16 Dec",
                "children": [
                  {
                    "name": "Night Run",
                    "size": 0.12777777777777777
                  },
                  {
                    "name": "distance : 2 km",
                    "size": 0.12777777777777777
                  },
                  {
                    "name": "duration : 23 mins",
                    "size": 0.12777777777777777
                  }
                ]
              },
              {
                "name": "21 Dec",
                "children": [
                  {
                    "name": "Lunch Ride",
                    "size": 0.43046296296296294
                  },
                  {
                    "name": "distance : 19 km",
                    "size": 0.43046296296296294
                  },
                  {
                    "name": "duration : 77 mins",
                    "size": 0.43046296296296294
                  }
                ]
              },
              {
                "name": "25 Dec",
                "children": [
                  {
                    "name": "Night Ride",
                    "size": 1.3333333333333333
                  },
                  {
                    "name": "distance : 65 km",
                    "size": 1.3333333333333333
                  },
                  {
                    "name": "duration : 240 mins",
                    "size": 1.3333333333333333
                  }
                ]
              }
            ]
          },
          {
            "name": "Nov",
            "children": [
              {
                "name": "11 Nov",
                "children": [
                  {
                    "name": "Morning Run",
                    "size": 0.29453703703703704
                  },
                  {
                    "name": "distance : 6 km",
                    "size": 0.29453703703703704
                  },
                  {
                    "name": "duration : 53 mins",
                    "size": 0.29453703703703704
                  }
                ]
              },
              {
                "name": "20 Nov",
                "children": [
                  {
                    "name": "Morning Run",
                    "size": 0.33916666666666667
                  },
                  {
                    "name": "distance : 6 km",
                    "size": 0.33916666666666667
                  },
                  {
                    "name": "duration : 61 mins",
                    "size": 0.33916666666666667
                  }
                ]
              },
              {
                "name": "24 Nov",
                "children": [
                  {
                    "name": "Afternoon Run",
                    "size": 0.8493518518518518
                  },
                  {
                    "name": "distance : 16 km",
                    "size": 0.8493518518518518
                  },
                  {
                    "name": "duration : 152 mins",
                    "size": 0.8493518518518518
                  }
                ]
              },
              {
                "name": "26 Nov",
                "children": [
                  {
                    "name": "Recovery ride",
                    "size": 0.21666666666666667
                  },
                  {
                    "name": "distance : 14 km",
                    "size": 0.21666666666666667
                  },
                  {
                    "name": "duration : 39 mins",
                    "size": 0.21666666666666667
                  }
                ]
              }
            ]
          },
          {
            "name": "Oct",
            "children": [
              {
                "name": "20 Oct",
                "children": [
                  {
                    "name": "Night Run",
                    "size": 0.09287037037037037
                  },
                  {
                    "name": "distance : 2 km",
                    "size": 0.09287037037037037
                  },
                  {
                    "name": "duration : 16 mins",
                    "size": 0.09287037037037037
                  }
                ]
              }
            ]
          },
          {
            "name": "Sep",
            "children": [
              {
                "name": "4 Sep",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.6164814814814815
                  },
                  {
                    "name": "distance : 26 km",
                    "size": 0.6164814814814815
                  },
                  {
                    "name": "duration : 110 mins",
                    "size": 0.6164814814814815
                  }
                ]
              },
              {
                "name": "8 Sep",
                "children": [
                  {
                    "name": "Morning Ride",
                    "size": 0.03398148148148148
                  },
                  {
                    "name": "distance : 42 km",
                    "size": 0.03398148148148148
                  },
                  {
                    "name": "duration : 6 mins",
                    "size": 0.03398148148148148
                  }
                ]
              },
              {
                "name": "14 Sep",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.7198148148148148
                  },
                  {
                    "name": "distance : 34 km",
                    "size": 0.7198148148148148
                  },
                  {
                    "name": "duration : 129 mins",
                    "size": 0.7198148148148148
                  }
                ]
              },
              {
                "name": "17 Sep",
                "children": [
                  {
                    "name": "Morning Ride",
                    "size": 0.7804629629629629
                  },
                  {
                    "name": "distance : 37 km",
                    "size": 0.7804629629629629
                  },
                  {
                    "name": "duration : 140 mins",
                    "size": 0.7804629629629629
                  }
                ]
              },
              {
                "name": "23 Sep",
                "children": [
                  {
                    "name": "Morning Ride",
                    "size": 0.18046296296296296
                  },
                  {
                    "name": "distance : 37 km",
                    "size": 0.18046296296296296
                  },
                  {
                    "name": "duration : 32 mins",
                    "size": 0.18046296296296296
                  }
                ]
              },
              {
                "name": "26 Sep",
                "children": [
                  {
                    "name": "Evening Run",
                    "size": 0.08037037037037037
                  },
                  {
                    "name": "distance : 4 km",
                    "size": 0.08037037037037037
                  },
                  {
                    "name": "duration : 14 mins",
                    "size": 0.08037037037037037
                  }
                ]
              },
              {
                "name": "30 Sep",
                "children": [
                  {
                    "name": "Morning Ride",
                    "size": 2.9431481481481483
                  },
                  {
                    "name": "distance : 147 km",
                    "size": 2.9431481481481483
                  },
                  {
                    "name": "duration : 529 mins",
                    "size": 2.9431481481481483
                  }
                ]
              }
            ]
          },
          {
            "name": "Aug",
            "children": [
              {
                "name": "2 Aug",
                "children": [
                  {
                    "name": "Afternoon Run",
                    "size": 0.12222222222222222
                  },
                  {
                    "name": "distance : 2 km",
                    "size": 0.12222222222222222
                  },
                  {
                    "name": "duration : 22 mins",
                    "size": 0.12222222222222222
                  }
                ]
              },
              {
                "name": "4 Aug",
                "children": [
                  {
                    "name": "Night Ride",
                    "size": 1
                  },
                  {
                    "name": "distance : 75 km",
                    "size": 1
                  },
                  {
                    "name": "duration : 180 mins",
                    "size": 1
                  }
                ]
              },
              {
                "name": "25 Aug",
                "children": [
                  {
                    "name": "Morning Ride",
                    "size": 0.32805555555555554
                  },
                  {
                    "name": "distance : 21 km",
                    "size": 0.32805555555555554
                  },
                  {
                    "name": "duration : 59 mins",
                    "size": 0.32805555555555554
                  }
                ]
              },
              {
                "name": "28 Aug",
                "children": [
                  {
                    "name": "Morning Run",
                    "size": 0.2702777777777778
                  },
                  {
                    "name": "distance : 6 km",
                    "size": 0.2702777777777778
                  },
                  {
                    "name": "duration : 48 mins",
                    "size": 0.2702777777777778
                  }
                ]
              }
            ]
          },
          {
            "name": "Jul",
            "children": [
              {
                "name": "7 Jul",
                "children": [
                  {
                    "name": "Cairo runners",
                    "size": 0.2765740740740741
                  },
                  {
                    "name": "distance : 7 km",
                    "size": 0.2765740740740741
                  },
                  {
                    "name": "duration : 49 mins",
                    "size": 0.2765740740740741
                  }
                ]
              },
              {
                "name": "11 Jul",
                "children": [
                  {
                    "name": "Night Ride",
                    "size": 0.51
                  },
                  {
                    "name": "distance : 29 km",
                    "size": 0.51
                  },
                  {
                    "name": "duration : 91 mins",
                    "size": 0.51
                  }
                ]
              },
              {
                "name": "27 Jul",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.7161111111111111
                  },
                  {
                    "name": "distance : 37 km",
                    "size": 0.7161111111111111
                  },
                  {
                    "name": "duration : 128 mins",
                    "size": 0.7161111111111111
                  }
                ]
              },
              {
                "name": "28 Jul",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.42916666666666664
                  },
                  {
                    "name": "distance : 21 km",
                    "size": 0.42916666666666664
                  },
                  {
                    "name": "duration : 77 mins",
                    "size": 0.42916666666666664
                  }
                ]
              },
              {
                "name": "30 Jul",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.6603703703703704
                  },
                  {
                    "name": "distance : 33 km",
                    "size": 0.6603703703703704
                  },
                  {
                    "name": "duration : 118 mins",
                    "size": 0.6603703703703704
                  }
                ]
              }
            ]
          },
          {
            "name": "Jun",
            "children": [
              {
                "name": "7 Jun",
                "children": [
                  {
                    "name": "Night Run",
                    "size": 0.2863888888888889
                  },
                  {
                    "name": "distance : 5 km",
                    "size": 0.2863888888888889
                  },
                  {
                    "name": "duration : 51 mins",
                    "size": 0.2863888888888889
                  }
                ]
              },
              {
                "name": "14 Jun",
                "children": [
                  {
                    "name": "Pre fetar Run",
                    "size": 0.25083333333333335
                  },
                  {
                    "name": "distance : 5 km",
                    "size": 0.25083333333333335
                  },
                  {
                    "name": "duration : 45 mins",
                    "size": 0.25083333333333335
                  }
                ]
              }
            ]
          },
          {
            "name": "May",
            "children": [
              {
                "name": "21 May",
                "children": [
                  {
                    "name": "Morning Run",
                    "size": 0.6810185185185185
                  },
                  {
                    "name": "distance : 12 km",
                    "size": 0.6810185185185185
                  },
                  {
                    "name": "duration : 122 mins",
                    "size": 0.6810185185185185
                  }
                ]
              }
            ]
          },
          {
            "name": "Mar",
            "children": [
              {
                "name": "9 Mar",
                "children": [
                  {
                    "name": "Morning Run",
                    "size": 0.30787037037037035
                  },
                  {
                    "name": "distance : 5 km",
                    "size": 0.30787037037037035
                  },
                  {
                    "name": "duration : 55 mins",
                    "size": 0.30787037037037035
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "2018",
        "children": [
          {
            "name": "Jun",
            "children": [
              {
                "name": "1 Jun",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.36324074074074075
                  },
                  {
                    "name": "distance : 21 km",
                    "size": 0.36324074074074075
                  },
                  {
                    "name": "duration : 65 mins",
                    "size": 0.36324074074074075
                  }
                ]
              },
              {
                "name": "4 Jun",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.5842592592592593
                  },
                  {
                    "name": "distance : 47 km",
                    "size": 0.5842592592592593
                  },
                  {
                    "name": "duration : 105 mins",
                    "size": 0.5842592592592593
                  }
                ]
              },
              {
                "name": "5 Jun",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.11657407407407408
                  },
                  {
                    "name": "distance : 8 km",
                    "size": 0.11657407407407408
                  },
                  {
                    "name": "duration : 20 mins",
                    "size": 0.11657407407407408
                  }
                ]
              },
              {
                "name": "11 Jun",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.21824074074074074
                  },
                  {
                    "name": "distance : 16 km",
                    "size": 0.21824074074074074
                  },
                  {
                    "name": "duration : 39 mins",
                    "size": 0.21824074074074074
                  }
                ]
              }
            ]
          },
          {
            "name": "May",
            "children": [
              {
                "name": "2 May",
                "children": [
                  {
                    "name": "Lunch Ride",
                    "size": 0.1262037037037037
                  },
                  {
                    "name": "distance : 10 km",
                    "size": 0.1262037037037037
                  },
                  {
                    "name": "duration : 22 mins",
                    "size": 0.1262037037037037
                  }
                ]
              },
              {
                "name": "5 May",
                "children": [
                  {
                    "name": "Night Ride",
                    "size": 0.10833333333333334
                  },
                  {
                    "name": "distance : 6 km",
                    "size": 0.10833333333333334
                  },
                  {
                    "name": "duration : 19 mins",
                    "size": 0.10833333333333334
                  }
                ]
              },
              {
                "name": "7 May",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.20583333333333334
                  },
                  {
                    "name": "distance : 17 km",
                    "size": 0.20583333333333334
                  },
                  {
                    "name": "duration : 37 mins",
                    "size": 0.20583333333333334
                  }
                ]
              },
              {
                "name": "11 May",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.46675925925925926
                  },
                  {
                    "name": "distance : 37 km",
                    "size": 0.46675925925925926
                  },
                  {
                    "name": "duration : 84 mins",
                    "size": 0.46675925925925926
                  }
                ]
              },
              {
                "name": "12 May",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.9733333333333334
                  },
                  {
                    "name": "distance : 68 km",
                    "size": 0.9733333333333334
                  },
                  {
                    "name": "duration : 175 mins",
                    "size": 0.9733333333333334
                  }
                ]
              },
              {
                "name": "13 May",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.3925
                  },
                  {
                    "name": "distance : 29 km",
                    "size": 0.3925
                  },
                  {
                    "name": "duration : 70 mins",
                    "size": 0.3925
                  }
                ]
              },
              {
                "name": "18 May",
                "children": [
                  {
                    "name": "Night Ride",
                    "size": 0.31537037037037036
                  },
                  {
                    "name": "distance : 17 km",
                    "size": 0.31537037037037036
                  },
                  {
                    "name": "duration : 56 mins",
                    "size": 0.31537037037037036
                  }
                ]
              },
              {
                "name": "19 May",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.16074074074074074
                  },
                  {
                    "name": "distance : 12 km",
                    "size": 0.16074074074074074
                  },
                  {
                    "name": "duration : 28 mins",
                    "size": 0.16074074074074074
                  }
                ]
              },
              {
                "name": "20 May",
                "children": [
                  {
                    "name": "Evening Run",
                    "size": 0.37305555555555553
                  },
                  {
                    "name": "distance : 9 km",
                    "size": 0.37305555555555553
                  },
                  {
                    "name": "duration : 67 mins",
                    "size": 0.37305555555555553
                  }
                ]
              },
              {
                "name": "23 May",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.1937037037037037
                  },
                  {
                    "name": "distance : 13 km",
                    "size": 0.1937037037037037
                  },
                  {
                    "name": "duration : 34 mins",
                    "size": 0.1937037037037037
                  }
                ]
              },
              {
                "name": "24 May",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.269537037037037
                  },
                  {
                    "name": "distance : 16 km",
                    "size": 0.269537037037037
                  },
                  {
                    "name": "duration : 48 mins",
                    "size": 0.269537037037037
                  }
                ]
              },
              {
                "name": "27 May",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.24203703703703705
                  },
                  {
                    "name": "distance : 14 km",
                    "size": 0.24203703703703705
                  },
                  {
                    "name": "duration : 43 mins",
                    "size": 0.24203703703703705
                  }
                ]
              },
              {
                "name": "28 May",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.08731481481481482
                  },
                  {
                    "name": "distance : 5 km",
                    "size": 0.08731481481481482
                  },
                  {
                    "name": "duration : 15 mins",
                    "size": 0.08731481481481482
                  }
                ]
              },
              {
                "name": "30 May",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.46694444444444444
                  },
                  {
                    "name": "distance : 37 km",
                    "size": 0.46694444444444444
                  },
                  {
                    "name": "duration : 84 mins",
                    "size": 0.46694444444444444
                  }
                ]
              },
              {
                "name": "31 May",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.5556481481481481
                  },
                  {
                    "name": "distance : 40 km",
                    "size": 0.5556481481481481
                  },
                  {
                    "name": "duration : 100 mins",
                    "size": 0.5556481481481481
                  }
                ]
              }
            ]
          },
          {
            "name": "Apr",
            "children": [
              {
                "name": "4 Apr",
                "children": [
                  {
                    "name": "Evening Run",
                    "size": 0.27490740740740743
                  },
                  {
                    "name": "distance : 4 km",
                    "size": 0.27490740740740743
                  },
                  {
                    "name": "duration : 49 mins",
                    "size": 0.27490740740740743
                  }
                ]
              },
              {
                "name": "5 Apr",
                "children": [
                  {
                    "name": "Lunch Run",
                    "size": 0.26916666666666667
                  },
                  {
                    "name": "distance : 4 km",
                    "size": 0.26916666666666667
                  },
                  {
                    "name": "duration : 48 mins",
                    "size": 0.26916666666666667
                  }
                ]
              },
              {
                "name": "8 Apr",
                "children": [
                  {
                    "name": "Evening Run",
                    "size": 0.245
                  },
                  {
                    "name": "distance : 4 km",
                    "size": 0.245
                  },
                  {
                    "name": "duration : 44 mins",
                    "size": 0.245
                  }
                ]
              },
              {
                "name": "12 Apr",
                "children": [
                  {
                    "name": "Afternoon Run",
                    "size": 0.1897222222222222
                  },
                  {
                    "name": "distance : 3 km",
                    "size": 0.1897222222222222
                  },
                  {
                    "name": "duration : 34 mins",
                    "size": 0.1897222222222222
                  }
                ]
              },
              {
                "name": "13 Apr",
                "children": [
                  {
                    "name": "Morning Ride",
                    "size": 0.23203703703703704
                  },
                  {
                    "name": "distance : 16 km",
                    "size": 0.23203703703703704
                  },
                  {
                    "name": "duration : 41 mins",
                    "size": 0.23203703703703704
                  }
                ]
              },
              {
                "name": "14 Apr",
                "children": [
                  {
                    "name": "Morning Ride",
                    "size": 0.7610185185185185
                  },
                  {
                    "name": "distance : 47 km",
                    "size": 0.7610185185185185
                  },
                  {
                    "name": "duration : 136 mins",
                    "size": 0.7610185185185185
                  }
                ]
              },
              {
                "name": "15 Apr",
                "children": [
                  {
                    "name": "Morning Ride",
                    "size": 0.6103703703703703
                  },
                  {
                    "name": "distance : 42 km",
                    "size": 0.6103703703703703
                  },
                  {
                    "name": "duration : 109 mins",
                    "size": 0.6103703703703703
                  }
                ]
              },
              {
                "name": "18 Apr",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.08981481481481482
                  },
                  {
                    "name": "distance : 7 km",
                    "size": 0.08981481481481482
                  },
                  {
                    "name": "duration : 16 mins",
                    "size": 0.08981481481481482
                  }
                ]
              },
              {
                "name": "19 Apr",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.11972222222222222
                  },
                  {
                    "name": "distance : 9 km",
                    "size": 0.11972222222222222
                  },
                  {
                    "name": "duration : 21 mins",
                    "size": 0.11972222222222222
                  }
                ]
              },
              {
                "name": "21 Apr",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.9477777777777778
                  },
                  {
                    "name": "distance : 45 km",
                    "size": 0.9477777777777778
                  },
                  {
                    "name": "duration : 170 mins",
                    "size": 0.9477777777777778
                  }
                ]
              },
              {
                "name": "24 Apr",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.10842592592592593
                  },
                  {
                    "name": "distance : 8 km",
                    "size": 0.10842592592592593
                  },
                  {
                    "name": "duration : 19 mins",
                    "size": 0.10842592592592593
                  }
                ]
              },
              {
                "name": "26 Apr",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.16666666666666666
                  },
                  {
                    "name": "distance : 10 km",
                    "size": 0.16666666666666666
                  },
                  {
                    "name": "duration : 30 mins",
                    "size": 0.16666666666666666
                  }
                ]
              },
              {
                "name": "28 Apr",
                "children": [
                  {
                    "name": "Lunch Ride",
                    "size": 0.19453703703703704
                  },
                  {
                    "name": "distance : 12 km",
                    "size": 0.19453703703703704
                  },
                  {
                    "name": "duration : 35 mins",
                    "size": 0.19453703703703704
                  }
                ]
              },
              {
                "name": "30 Apr",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.29833333333333334
                  },
                  {
                    "name": "distance : 17 km",
                    "size": 0.29833333333333334
                  },
                  {
                    "name": "duration : 53 mins",
                    "size": 0.29833333333333334
                  }
                ]
              }
            ]
          },
          {
            "name": "Mar",
            "children": [
              {
                "name": "2 Mar",
                "children": [
                  {
                    "name": "Morning Walk",
                    "size": 0.13518518518518519
                  },
                  {
                    "name": "distance : 2 km",
                    "size": 0.13518518518518519
                  },
                  {
                    "name": "duration : 24 mins",
                    "size": 0.13518518518518519
                  }
                ]
              },
              {
                "name": "3 Mar",
                "children": [
                  {
                    "name": "First -ve run in linz 💪🏻",
                    "size": 0.2511111111111111
                  },
                  {
                    "name": "distance : 5 km",
                    "size": 0.2511111111111111
                  },
                  {
                    "name": "duration : 45 mins",
                    "size": 0.2511111111111111
                  }
                ]
              },
              {
                "name": "4 Mar",
                "children": [
                  {
                    "name": "Morning Run",
                    "size": 0.7193518518518518
                  },
                  {
                    "name": "distance : 15 km",
                    "size": 0.7193518518518518
                  },
                  {
                    "name": "duration : 129 mins",
                    "size": 0.7193518518518518
                  }
                ]
              },
              {
                "name": "7 Mar",
                "children": [
                  {
                    "name": "Lunch Run",
                    "size": 0.38925925925925925
                  },
                  {
                    "name": "distance : 7 km",
                    "size": 0.38925925925925925
                  },
                  {
                    "name": "duration : 70 mins",
                    "size": 0.38925925925925925
                  }
                ]
              },
              {
                "name": "11 Mar",
                "children": [
                  {
                    "name": "Afternoon Run",
                    "size": 0.30277777777777776
                  },
                  {
                    "name": "distance : 5 km",
                    "size": 0.30277777777777776
                  },
                  {
                    "name": "duration : 54 mins",
                    "size": 0.30277777777777776
                  }
                ]
              },
              {
                "name": "22 Mar",
                "children": [
                  {
                    "name": "Morning Run",
                    "size": 0.2250925925925926
                  },
                  {
                    "name": "distance : 4 km",
                    "size": 0.2250925925925926
                  },
                  {
                    "name": "duration : 40 mins",
                    "size": 0.2250925925925926
                  }
                ]
              },
              {
                "name": "26 Mar",
                "children": [
                  {
                    "name": "Afternoon Run",
                    "size": 0.027407407407407408
                  },
                  {
                    "name": "distance : 0 km",
                    "size": 0.027407407407407408
                  },
                  {
                    "name": "duration : 4 mins",
                    "size": 0.027407407407407408
                  }
                ]
              }
            ]
          },
          {
            "name": "Feb",
            "children": [
              {
                "name": "1 Feb",
                "children": [
                  {
                    "name": "Night Run",
                    "size": 0.4590740740740741
                  },
                  {
                    "name": "distance : 7 km",
                    "size": 0.4590740740740741
                  },
                  {
                    "name": "duration : 82 mins",
                    "size": 0.4590740740740741
                  }
                ]
              },
              {
                "name": "2 Feb",
                "children": [
                  {
                    "name": "Lunch Run",
                    "size": 0.21953703703703703
                  },
                  {
                    "name": "distance : 4 km",
                    "size": 0.21953703703703703
                  },
                  {
                    "name": "duration : 39 mins",
                    "size": 0.21953703703703703
                  }
                ]
              },
              {
                "name": "5 Feb",
                "children": [
                  {
                    "name": "Morning Run",
                    "size": 0.19444444444444445
                  },
                  {
                    "name": "distance : 3 km",
                    "size": 0.19444444444444445
                  },
                  {
                    "name": "duration : 35 mins",
                    "size": 0.19444444444444445
                  }
                ]
              },
              {
                "name": "8 Feb",
                "children": [
                  {
                    "name": "Morning Ride",
                    "size": 2.4810185185185185
                  },
                  {
                    "name": "distance : 128 km",
                    "size": 2.4810185185185185
                  },
                  {
                    "name": "duration : 446 mins",
                    "size": 2.4810185185185185
                  }
                ]
              },
              {
                "name": "11 Feb",
                "children": [
                  {
                    "name": "Evening Run",
                    "size": 0.24138888888888888
                  },
                  {
                    "name": "distance : 5 km",
                    "size": 0.24138888888888888
                  },
                  {
                    "name": "duration : 43 mins",
                    "size": 0.24138888888888888
                  }
                ]
              },
              {
                "name": "19 Feb",
                "children": [
                  {
                    "name": "Morning Run",
                    "size": 0.3187037037037037
                  },
                  {
                    "name": "distance : 5 km",
                    "size": 0.3187037037037037
                  },
                  {
                    "name": "duration : 57 mins",
                    "size": 0.3187037037037037
                  }
                ]
              }
            ]
          },
          {
            "name": "Jan",
            "children": [
              {
                "name": "2 Jan",
                "children": [
                  {
                    "name": "Morning Run",
                    "size": 0.2600925925925926
                  },
                  {
                    "name": "distance : 5 km",
                    "size": 0.2600925925925926
                  },
                  {
                    "name": "duration : 46 mins",
                    "size": 0.2600925925925926
                  }
                ]
              },
              {
                "name": "6 Jan",
                "children": [
                  {
                    "name": "First ride in 2018 🎉",
                    "size": 0.922962962962963
                  },
                  {
                    "name": "distance : 52 km",
                    "size": 0.922962962962963
                  },
                  {
                    "name": "duration : 166 mins",
                    "size": 0.922962962962963
                  }
                ]
              },
              {
                "name": "7 Jan",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.9460185185185185
                  },
                  {
                    "name": "distance : 51 km",
                    "size": 0.9460185185185185
                  },
                  {
                    "name": "duration : 170 mins",
                    "size": 0.9460185185185185
                  }
                ]
              },
              {
                "name": "13 Jan",
                "children": [
                  {
                    "name": "Evening Ride",
                    "size": 0.485462962962963
                  },
                  {
                    "name": "distance : 27 km",
                    "size": 0.485462962962963
                  },
                  {
                    "name": "duration : 87 mins",
                    "size": 0.485462962962963
                  }
                ]
              },
              {
                "name": "15 Jan",
                "children": [
                  {
                    "name": "Afternoon Ride",
                    "size": 0.26666666666666666
                  },
                  {
                    "name": "distance : 13 km",
                    "size": 0.26666666666666666
                  },
                  {
                    "name": "duration : 48 mins",
                    "size": 0.26666666666666666
                  }
                ]
              },
              {
                "name": "16 Jan",
                "children": [
                  {
                    "name": "Evening Run",
                    "size": 0.38731481481481483
                  },
                  {
                    "name": "distance : 7 km",
                    "size": 0.38731481481481483
                  },
                  {
                    "name": "duration : 69 mins",
                    "size": 0.38731481481481483
                  }
                ]
              },
              {
                "name": "21 Jan",
                "children": [
                  {
                    "name": "Evening Run",
                    "size": 0.28453703703703703
                  },
                  {
                    "name": "distance : 5 km",
                    "size": 0.28453703703703703
                  },
                  {
                    "name": "duration : 51 mins",
                    "size": 0.28453703703703703
                  }
                ]
              },
              {
                "name": "29 Jan",
                "children": [
                  {
                    "name": "Night Ride",
                    "size": 0.3012962962962963
                  },
                  {
                    "name": "distance : 18 km",
                    "size": 0.3012962962962963
                  },
                  {
                    "name": "duration : 54 mins",
                    "size": 0.3012962962962963
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
)
    },
    {
      name: "partition",
      inputs: ["d3"],
      value: (function(d3){return(
data => {
  const root = d3.hierarchy(data)
      .sum(d => d.size)
      .sort((a, b) => b.value - a.value);
  return d3.partition()
      .size([2 * Math.PI, root.height + 1])
    (root);
}
)})
    },
    {
      name: "color",
      inputs: ["d3","data"],
      value: (function(d3,data){return(
d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
)})
    },
    {
      name: "format",
      inputs: ["d3"],
      value: (function(d3){return(
d3.format(",d")
)})
    },
    {
      name: "width",
      value: (function(){return(
932
)})
    },
    {
      name: "radius",
      inputs: ["width"],
      value: (function(width){return(
width / 6
)})
    },
    {
      name: "arc",
      inputs: ["d3","radius"],
      value: (function(d3,radius){return(
d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("https://d3js.org/d3.v5.min.js")
)})
    }
  ]
};

const notebook = {
  id: "e4be36954ab88b66@407",
  modules: [m0]
};

export default notebook;
