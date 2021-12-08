import { Provider } from "react-redux";
import configStore from "redux-mock-store";
import { Typography } from "@material-ui/core";
import { shallow } from "enzyme";

import Song from "./Song";

const mockStore = configStore({ songs: { list: "songs" } });

describe("Test suite Song(Card) component", () => {
	let wrapper;
	let song;

	beforeEach(() => {
		song = {
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
		};
		const store = mockStore({ songs: { list: [] } });
		wrapper = shallow(
			<Provider store={store}>
				<Song song={song} />
			</Provider>
		);
	});

	it("test for song prop title", () => {
		expect(wrapper.find(Song).prop("song").title).toBe("test");
	});

	it("test for song prop movie", () => {
		expect(wrapper.find(Song).prop("song").movie).toBe("test");
	});

	it("test for song prop singer", () => {
		expect(wrapper.find(Song).props().song["singer"]).toBe("tello");
	});

	it("test for song prop song length", () => {
		expect(wrapper.find(Song).props().song["length"]).toBe("4:45");
	});

	it("test for text in first typography", () => {
		expect(wrapper.find(Typography)).toBeDefined();
	});
});

describe("test suite to check empty prop", () => {
	let wrapper;

	beforeEach(() => {
		const store = mockStore({ songs: { list: "songs" } });

		wrapper = shallow(
			<Provider store={store}>
				<Song song={null} />
			</Provider>
		);
	});

	it("test for empty object", () => {
		expect(wrapper.props().song).toBeUndefined();
	});
});
