import React, { Component } from 'react'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
  Graticule,
} from "react-simple-maps";

import '../../../styles/map_style.css'

// The URL to Africa's map
const geoUrl = 
  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/africa.json";

/**
 * Handle the rendering of the map as well as click events on it
 */  
export class MapDisplay extends Component {

  // Set the map's state
  constructor(props) {
    super(props);
    
    this.state = {
      width: 1000,
      height: 600,
    }
  }

  handleGeographyClick(evt) {
    console.log(evt);
  }

  render() {
    return (
      <div className="map-parent-container">
        <div className="map-parent-content">
          <ComposableMap
          width={this.state.width} height={this.state.height} style={{ width: "100%", height: "100%" }}
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
              rotate: [-15, 0, 0],
              scale: 400,
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#89E2C7"
                    stroke="#FFF"
                    onMouseEnter={() => {
                      const { NAME, POP_EST } = geo.properties;
                      console.log(geo.properties);
                    }}
                    style={{
                      default: {
                        fill: "#89E2C7",
                        stroke: "#FFF",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: "#92D2E2",
                        stroke: "#FFF",
                        strokeWidth: 1,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#FF5722",
                        stroke: "#FFF",
                        strokeWidth: 1,
                        outline: "none",
                      }
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>        
        </div>
      </div>
    )
  }
}

export default MapDisplay
