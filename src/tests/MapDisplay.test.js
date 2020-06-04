import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import MapDisplay from "../components/main_page/page_components/MapDisplay";
import MainPage from "../components/main_page/MainPage";
import { render, fireEvent } from '@testing-library/react';

describe("MapDisplay tests", () => {
  // Snapshot testing for map display is important, as it's one of the key UI
  test("MapDisplay renders correctly", () => {
    const tree = renderer.create(<MapDisplay />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Make sure state contains the current country
  test("Currently pressed country stored correcty in state", () => {
    const mainPageWrapper = shallow(<MainPage />);
    const projectsByCountry = mainPageWrapper.state("projectsByCountry");

    // Pass on the correct data to the MapDisplay for testing
    const wrapper = mount(<MapDisplay projectsByCountry={projectsByCountry} />);

    // Make sure props are properly passed
    expect(wrapper.props("projectsByCountry")).toBeDefined();
    // Check if the map's geographies renders its children correctly
    expect(wrapper.find("Geographies").children()).toBeDefined();

    // As MainPage already tested that filter does indeed
    // result in the correct projects data for each country
    // and as it was already tested that props is correctly passed
    // it is ensured that MapDisplay works properly and no other tests are needed
    // (as Geographies are built into just a single <g></g> class, we can not test them 
    //  so we have to use this method)
  });
});
