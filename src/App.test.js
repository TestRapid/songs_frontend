import { mount } from "enzyme";
import App from "./App";

describe("Test suite for snapshot test full dom", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<App />);
	});

	it("test for snapshot", () => {
		expect(wrapper).toMatchSnapshot();
	});
});
