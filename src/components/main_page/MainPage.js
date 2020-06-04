import React, { Component } from "react";
import MapDisplay from "./page_components/MapDisplay";
// React bootstrap componenets
import Form from "react-bootstrap/Form";
// Retrieve the projects data from the JSON file
import projectsData from "../../data/projects";
// For posting requests to the backend server
import axios from "axios";

import Roll from "react-reveal/Roll";

export class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Track the parameters that are checked in a dictionary to make updating simple
      checkboxes: {
        strategyChecked: true,
        engineeringChecked: true,
        infrastructureChecked: true,
        designChecked: true,
      },
      rawProjectsData: [], // The raw data retrieved from MongoDB will be stored here
      // Store the data in a dictionary where the key represents the
      projectsByCountry: {},
    };

    // Bind the function (so that it can call methods related to this class)
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  /**
   * Use this to load in the data from MongoDB and then parse into a more efficient, usable format
   */
  componentDidMount() {
    // IMPORTANT: this does not need to be called, but for future reference, will be left here
    // Only needed to be called once to convert and push JSON to MongoDB, but that's done now
    //this.pushDataToDB();

    // Load in the data
    this.loadDataFromDB();

    // Initially, all 3 filters are set so a mix of all types of services will
    // be loaded in
    this.filterData();
  }

  /**
   * Use a get request to retrieve data
   */
  loadDataFromDB() {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        this.setState({ rawProjectsData: res.data });
        this.filterData();
      })
      .catch((err) => console.log("Error posting data"));
  }

  // Load DB for integration TESTING only, only used in MainPage.test.js to test
  // frontend (axios)/backend(express) integration
  testLoadDataFromDB() {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
      }).then(({ status, data }) => {
        return status;
      });
    });
  }

  /**
   * Post a request to MongoDB to add all of the projects
   * Load data from the JSON and then convert it to a MongoDB model and then push to the DBs
   * NOTE: do not call this method more than once as this will lead to duplicate
   * data being added (it is just a one-time helper method, but I've included it here
   * to show how I did it orignally)
   */
  pushDataToDB() {
    console.log(projectsData.projects);
    projectsData.projects.forEach((project) => {
      axios
        .post("http://localhost:5000/add", project)
        .then((res) => console.log(res.data))
        .catch((err) => console.log("Error posting data"));
    });
  }

  /**
   * Wrote an algorithm to convert the array of data into a dictionary where the
   * key represents the country name and the values are all the projects for that country
   * This helps make looking up projects when the user clicks on a country much more efficient
   * as opposed to searching the list, complexity O(n), each time
   * In addition, this also handles filtering the data based on the user input to choose
   * what type of projects to display via the checkboxes
   */
  filterData() {
    // Get the current user selected filters based on the checkboxes
    let filters = [];

    Object.keys(this.state.checkboxes).forEach((key) => {
      if (this.state.checkboxes[key]) {
        filters = filters.concat(key.replace("Checked", ""));
      }
    });

    // The final parsed data that will be stored
    // Through the iterations below, this will be filled
    let parsedData = {};

    // Parse the data so that it is in the format: 'country_name': [all_projects]
    this.state.rawProjectsData.forEach((project) => {
      // Check if an entry on that key already exists
      if (parsedData[project.country]) {
        // FILTER the data by making sure the type of service matches the checkboxes
        // according to what the user wants to filter
        if (
          parsedData[project.country].length <= 2 &&
          filters.includes(project.services.toLowerCase())
        ) {
          parsedData[project.country] = parsedData[project.country].concat(
            project
          );
        }
      } else {
        // If an entry doesn't exist, then need to set up a list with its first element
        if (filters.includes(project.services.toLowerCase())) {
          parsedData[project.country] = [project];
        }
      }
    });

    // Finally store the data
    this.setState({ projectsByCountry: parsedData });
  }

  /**
   * Update the checked parameters
   * @param {*} evt - checked object
   */
  handleCheckboxClick(evt) {
    // Note: not conventional in React, but we are following this up with 'forceUpdate'
    // (does not matter as shouldComponentUpdate() is not needed here)
    this.state.checkboxes[evt.target.name] = !this.state.checkboxes[
      evt.target.name
    ];
    this.forceUpdate();
    // Then, filter the data
    this.filterData();
  }

  render() {
    return (
      <div>
        <Roll left>
          <div
            key="inline-checkbox"
            className="mb-3"
            style={{ margin: "8px 12px" }}
          >
            <Form.Check
              inline
              label="Strategy"
              name="strategyChecked"
              type="checkbox"
              id="strategyCheckedBox"
              checked={this.state.checkboxes["strategyChecked"]}
              onChange={this.handleCheckboxClick}
            />
            <Form.Check
              inline
              label="Engineering"
              name="engineeringChecked"
              type="checkbox"
              id="engineeringCheckedBox"
              checked={this.state.checkboxes["engineeringChecked"]}
              onChange={this.handleCheckboxClick}
            />
            <Form.Check
              inline
              label="Infrastructure"
              name="infrastructureChecked"
              type="checkbox"
              id="infrastructureCheckedBox"
              checked={this.state.checkboxes["infrastructureChecked"]}
              onChange={this.handleCheckboxClick}
            />
            <Form.Check
              inline
              label="Design"
              name="designChecked"
              type="checkbox"
              id="designCheckedBox"
              checked={this.state.checkboxes["designChecked"]}
              onChange={this.handleCheckboxClick}
            />
          </div>
        </Roll>

        <MapDisplay projectsByCountry={this.state.projectsByCountry} />
      </div>
    );
  }
}

export default MainPage;
