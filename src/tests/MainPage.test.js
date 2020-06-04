import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import MainPage from "../components/main_page/MainPage";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Main Page's unit testing: snapshot testing and unit testing
describe("MainPage tests", () => {
  // Snapshot test the UI to ensure during development,
  // the UI does not mistakingly get changed with erraneous features
  test("MainPage renders correctly", () => {
    const tree = renderer.create(<MainPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  /* UNIT TESTS */

  // filterData() will be used in the integration testing with checkboxes,
  // loadDataFromDB() retrieves data from backend, so that will be part of integration as well

  // Unit test the checkboxes part as they are the core user input
  test("handleCheckboxClick(): changing state correctly on user input", () => {
    const wrapper = shallow(<MainPage />);

    // First, get the checkboxes and simulate a change click on them
    const checkbox1 = wrapper.find("#strategyCheckedBox").first();
    const checkbox2 = wrapper.find("#engineeringCheckedBox").first();
    const checkbox3 = wrapper.find("#infrastructureCheckedBox").first();
    const checkbox4 = wrapper.find("#designCheckedBox").first();

    // Turn them off from true to false
    checkbox1.simulate("change", { target: { name: "strategyChecked" } });
    checkbox2.simulate("change", { target: { name: "engineeringChecked" } });
    checkbox3.simulate("change", { target: { name: "infrastructureChecked" } });
    checkbox4.simulate("change", { target: { name: "designChecked" } });

    // Test this case
    expect(wrapper.state("checkboxes")["strategyChecked"]).toEqual(false);
    expect(wrapper.state("checkboxes")["engineeringChecked"]).toEqual(false);
    expect(wrapper.state("checkboxes")["infrastructureChecked"]).toEqual(false);
    expect(wrapper.state("checkboxes")["designChecked"]).toEqual(false);

    // Turn them back on by clicking them again
    checkbox1.simulate("change", { target: { name: "strategyChecked" } });
    checkbox2.simulate("change", { target: { name: "engineeringChecked" } });
    checkbox3.simulate("change", { target: { name: "infrastructureChecked" } });
    checkbox4.simulate("change", { target: { name: "designChecked" } });

    // Test that they are now true
    expect(wrapper.state("checkboxes")["strategyChecked"]).toEqual(true);
    expect(wrapper.state("checkboxes")["engineeringChecked"]).toEqual(true);
    expect(wrapper.state("checkboxes")["infrastructureChecked"]).toEqual(true);
    expect(wrapper.state("checkboxes")["designChecked"]).toEqual(true);
  });

  /* INTEGRATION TESTS */

  // Mock Axios and test that fetching of the function 'loadDataFromDB'
  // Here a testLoadDataFromDB() will be used to better compare values (requires a promise)
  test("Projects data loading from MongoDB", () => {
    const data = { response: "hello" };
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:5000").reply(200, data);

    const wrapper = shallow(<MainPage />);

    expect(wrapper.instance().testLoadDataFromDB()).resolves.toEqual(data);
  });

  // Integrate checkboxes-input, state-changed-handling and final-data-filtering
  test("Data is filtered properly based on user input", () => {
    const wrapper = shallow(<MainPage />);

    // Get the 'strategy' checkbox and simulate a click on it
    const checkbox1 = wrapper.find("#strategyCheckedBox").first();
    checkbox1.simulate("change", { target: { name: "strategyChecked" } });

    // Check filter data worked by checking the state
    const projectsByCountry = wrapper.state("projectsByCountry");

    Object.keys(projectsByCountry).forEach((key) => {
      // TEST that the length is less than 4 (so a maximum of 3 elements)
      expect(projectsByCountry[key].length).toBeLessThan(4);

      // Iterate and check that no 'Strategy' service is there
      // so filter is working correctly
      projectsByCountry[key].forEach((project) => {
        expect(project.services.toLowerCase()).not.toBe("strategy");
      });
    });

    // Just to be sure, test this once again by checking off 'Engineering'
    const checkbox2 = wrapper.find("#engineeringCheckedBox").first();
    checkbox2.simulate("change", { target: { name: "engineeringChecked" } });

    const projectsByCountrySecond = wrapper.state("projectsByCountry");

    Object.keys(projectsByCountrySecond).forEach((key) => {
      // TEST that the length is less than 4 (so a maximum of 3 elements)
      expect(projectsByCountrySecond[key].length).toBeLessThan(4);

      // Iterate and check that no 'Engineering' service is there
      // so filter is working correctly
      projectsByCountrySecond[key].forEach((project) => {
        // No engineering projects
        expect(project.services.toLowerCase()).not.toBe("engineering");
        // No strateegy projects as well
        expect(project.services.toLowerCase()).not.toBe("strategy");
      });
    });

    // Now if it works for these two and since state is correctly handled,
    // we can deduce that user input and filtering works properly

    // Finally, check if the correct props from filtering are passed
    expect(wrapper.find("MapDisplay").props().projectsByCountry).toEqual(
      projectsByCountrySecond
    );
  });
});
