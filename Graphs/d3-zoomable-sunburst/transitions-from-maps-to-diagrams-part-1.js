// URL: https://beta.observablehq.com/@ahmedaldahshoury/transitions-from-maps-to-diagrams-part-1
// Title: Representation of geo path selected by user from piechart
// Author: Ahmed Aldahshoury (@ahmedaldahshoury)
// Version: 846
// Runtime version: 1

var m0 = {
  id: "4afee965d0dc7a4b@846",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Representation of geo path selected by user from piechart
`
)})
    },
    {
      name: "preview",
      inputs: ["d3","DOM","width","height","street","pathGenerator","diagramPath","mapPath"],
      value: (function(d3,DOM,width,height,street,pathGenerator,diagramPath,mapPath)
{

  // create SVG element
  let svg = d3.select(DOM.svg(width, height))
  svg.style('display', 'block')

  // construct the element

  svg.append('path')
    .datum(street)
    .attr('d', pathGenerator)
    .attr('fill', 'none')
    .attr('stroke', '#319177')
    .attr('stroke-width', '2')


  let isMap = true

  function anim() {
    svg.select('path')
      .interrupt()          // cancel any ongoing transitions
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)  // use linear motion
      .attr('d',isMap ? diagramPath : mapPath)
      .on('end', function() { d3.timeout(anim, 1000) })
    isMap = !isMap
  }

  d3.timeout(anim, 1500)

  // pass to Observable to represent this block
  return svg.node()

}
)
    },
    {
      name: "viewof width",
      inputs: ["html"],
      value: (function(html){return(
html`<input type="number" value="1000" min="100" max="800" step="20" style="width: 5em">`
)})
    },
    {
      name: "width",
      inputs: ["Generators","viewof width"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof height",
      inputs: ["html"],
      value: (function(html){return(
html`<input type="number" value="600" min="100" max="600" step="20" style="width: 5em">`
)})
    },
    {
      name: "height",
      inputs: ["Generators","viewof height"],
      value: (G, _) => G.input(_)
    },
    {
      name: "streets",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json('https://raw.githubusercontent.com/AhmedAldahshoury/StravaData/master/Activities%20in%20cairo/CairoCombined.geojson')
)})
    },
    {
      name: "viewof margin",
      inputs: ["html","width","height"],
      value: (function(html,width,height){return(
html`<input type="number" value="20" min="0" max="${Math.min(width, height)/4}" step="5" style="width: 5em">`
)})
    },
    {
      name: "margin",
      inputs: ["Generators","viewof margin"],
      value: (G, _) => G.input(_)
    },
    {
      name: "street",
      inputs: ["streets"],
      value: (function(streets){return(
streets.features.filter(street => street.geometry.type == "LineString")[7]
)})
    },
    {
      name: "projection",
      inputs: ["d3","margin","width","height","street"],
      value: (function(d3,margin,width,height,street){return(
d3.geoMercator().fitExtent([[margin, margin], [width - margin, height - margin]], street)
)})
    },
    {
      name: "pathGenerator",
      inputs: ["d3","projection"],
      value: (function(d3,projection){return(
d3.geoPath().projection(projection)
)})
    },
    {
      name: "mapPath",
      inputs: ["pathGenerator","street"],
      value: (function(pathGenerator,street){return(
pathGenerator(street)
)})
    },
    {
      name: "getLinearCoords",
      inputs: ["margin","width"],
      value: (function(margin,width){return(
function(pos) {
  return [Math.round(margin+(width-2*margin)*pos), margin];
}
)})
    },
    {
      name: "diagramPath",
      inputs: ["normalizePath","mapPath","getLinearCoords"],
      value: (function(normalizePath,mapPath,getLinearCoords){return(
normalizePath(mapPath, getLinearCoords)
)})
    },
    {
      name: "normalizePath",
      value: (function(){return(
function(path, geometryFunction, closeGaps) {

  // geometryFunction will be passed a float index from 0..1 and should return a point
  // on the normalized geometry at that position

  if (closeGaps === undefined) closeGaps = true;  // close gaps by default

  let command_letters = 'mlhvaqtcs',
      commands = [],
      newPath = '';

  let i;

  // find all command letters in the path
  // preserve 'M' (moveto) commands, replace all other commends by 'L' (lineto)
  for (i=0; i<path.length; i++) {
    let c = path[i].toLowerCase();
    for (var j=0; j<command_letters.length; j++) {
      if (c == command_letters[j]) {
        if (c == 'm') commands.push('M');
        else commands.push('L');
        break;
      }
    }
  }

  let num = commands.length,
      coords;

  // assemble new path string, using the replaced commands and
  // the normalized coordinates produced by geometryFunction
  if (num == 1) {
    // special case: single command (does not usually happen)
    coords = geometryFunction(0);
    newPath = commands[0] + coords[0] + ',' + coords[1];
  }
  else {
    for (i=0; i<num; i++) {
      newPath += commands[i];
      if (closeGaps && commands[i] == 'M' && i>0) {
        // bridge gaps caused by (moveto) commands by using previous coordinates
        coords = geometryFunction((i-1)/(num-1));
      }
      else {
        coords = geometryFunction(i/(num-1));
      }
      newPath += coords[0] + ',' + coords[1];
    }
    return newPath;
  }
}
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
  id: "4afee965d0dc7a4b@846",
  modules: [m0]
};

export default notebook;
