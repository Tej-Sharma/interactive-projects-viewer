import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import PageNavbar from "../components/navbar/PageNavbar";
import MainPage from "../components/main_page/MainPage";

// Test that the components are successfully in React
describe("App Testing", () => {
  test("Test Navbar and Main Page are in the app", () => {
    const wrapper = shallow(<App />);
    const navbar = <PageNavbar />;
    const pageData = <MainPage />;

    expect(wrapper.contains(navbar)).toEqual(true);
    expect(wrapper.contains(pageData)).toEqual(true);
  });
});
