import { shallow } from "enzyme";
import { Typography } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";

import About from "./About";

describe("test suite for About component", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<About />);
	});

	it("test for Typography component", () => {
		expect(wrapper.find(Typography)).toBeDefined();
	});

	it("test for Carousel component", () => {
		expect(wrapper.find(Carousel)).toBeDefined();
	});

	it("test for heading text", () => {
		expect(wrapper.find(Typography).at(0).render().text()).toBe(
			"About Page"
		);
	});
});
