import React, { Component } from "react";
// React bootstrap components
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Badge from "react-bootstrap/Badge";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// Responsive design tool: check if mobile or browser in React
// (To adjust tooltips and text-size for mobile)
import { isMobile } from "react-device-detect";

// Get the css to arrange the map
import "../../../styles/map_style.css";

// The URL to Africa's map, a topography JSON file
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
      // The current country's unique ID (to see if it's selected)
      clickedCountry: "",
      // Get the current country's name
      countryName: "",
    };

    // The popover (tooltip) that will be shown when the thing is clicked
    // Each time it's clicked, the onMouseDown button will update this template
    this.popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">{this.state.countryName}</Popover.Title>
        <Popover.Content></Popover.Content>
      </Popover>
    );
  }

  render() {
    return (
      <div className="map-parent-container">
        <div className="map-parent-content">
          <ComposableMap
            className="map"
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
              rotate: [-15, 0, 0],
              scale: 400,
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <OverlayTrigger
                    trigger="focus"
                    placement={isMobile ? "bottom" : "right"}
                    width="100%"
                    overlay={this.popover}
                  >
                    <Geography
                      className={geo.properties.geounit} // Set the ID for debugging
                      key={geo.rsmKey}
                      geography={geo}
                      fill={
                        this.state.clickedCountry === geo.rsmKey
                          ? "#FF5722"
                          : "#89E2C7"
                      }
                      stroke="#FFF"
                      onMouseDown={() => {
                        // Mouse clicked, store the rsmKey of the currently clicked geo
                        const countryStrName = geo.properties.geounit;

                        // Update the state with the currently clicked country
                        this.setState({
                          clickedCountry: geo.rsmKey,
                          countryName: countryStrName,
                        });

                        // Set the popover with the updated data
                        this.popover = (
                          <Popover id="popover-basic" width="100%">
                            <Popover.Title as="h3">
                              {countryStrName}
                            </Popover.Title>
                            <Popover.Content
                              style={{
                                fontSize: isMobile ? "0.6rem" : "0.9rem",
                              }}
                            >
                              {countryStrName in
                              this.props.projectsByCountry ? (
                                this.props.projectsByCountry[
                                  countryStrName
                                ].map((project) => (
                                  <p>
                                    <strong>{project.company}</strong>{" "}
                                    {project.description}{" "}
                                    <Badge variant="warning">
                                      {project.services}
                                    </Badge>
                                  </p>
                                ))
                              ) : (
                                <p> No projects were found for this country. </p>
                              )}
                            </Popover.Content>
                          </Popover>
                        );
                      }}
                      style={{
                        default: {
                          // Handle if the location is currently pressed or not
                          fill:
                            this.state.clickedCountry === geo.rsmKey
                              ? "#FF5722"
                              : "#89E2C7",
                          stroke: "#FFF",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill:
                            this.state.clickedCountry === geo.rsmKey
                              ? "#FF5722"
                              : "#92D2E2",
                          stroke: "#FFF",
                          strokeWidth: 1,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#FF5722",
                          stroke: "#FFF",
                          strokeWidth: 1,
                          outline: "none",
                        },
                      }}
                    />
                  </OverlayTrigger>
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    );
  }
}

export default MapDisplay;
