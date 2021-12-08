import { shallow } from "enzyme";
import configStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Typography } from "@material-ui/core";

import AllSongs from "./styles";
import Song from "../../Components/Song/Song";

const mockStore = configStore({
	auth: {},
	songs: {}
});

describe("test suite for All Songs", () => {
	let store;
	let wrapper;
	beforeEach(() => {
		store = mockStore({
			list: [
				{
					movie: "test",
					title: "test",
					length: "4:45",
					singer: "tello",
					description: "tikto",
					created: 1627995581030,
					id: "14bca186-e217-4ca8-aed3-58993f31ea68",
					views: 4,
					userId: "test@mailo.com",
					name: "test"
				},
				{
					movie: "krish",
					title: "godAllah",
					length: "3:45",
					singer: "SPB",
					description: "I have completed everything...",
					created: 1628001013822,
					id: "be401b87-79af-45c0-8dff-7e64f9af5123",
					views: 8,
					userId: "user@mailo.com",
					name: "user"
				}
			]
		});
		wrapper = shallow(
			<Provider store={store}>
				<AllSongs />
			</Provider>
		);
	});

	it("snapshot test", () => {
		expect(wrapper).toMatchSnapshot();
	});

	it("test for songs component defined or not", () => {
		expect(wrapper.find(Song)).toBeDefined();
	});

	it("test for heading", () => {
		expect(wrapper.find(Typography)).toBeDefined();
	});
});
