import React from "react";
import { shallow } from "enzyme";
import PageNavbar from "../components/navbar/PageNavbar";
import renderer from "react-test-renderer";

// Not much to test here, nevertheless, ensure that the correct text exists
// And do snapshot testing to ensure that no future problems suddenly come up
describe("PageNavbar tests", () => {
  // Snapshot test
  test("PageNavbar renders correctly", () => {
    const tree = renderer.create(<PageNavbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Unit test
  test("Correct text exists", () => {
    const wrapper = shallow(<PageNavbar />);
    expect(wrapper.text()).toContain("Our ProjectsMade by Tejas");
  });
});
