import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configStore from "redux-mock-store";
import { Button } from "@material-ui/core";

import Playlist from "./Playlist";

const mockStore = configStore({});

describe("test suite for playlist", () => {
	let wrapper;
	beforeEach(() => {
		const store = mockStore({ songs: "songs" });
		wrapper = shallow(
			<Provider store={store}>
				<Playlist
					song={{
						user: {
							id: "tes"
						}
					}}
				/>
			</Provider>
		);
	});

	it("test for Button in Playlist", () => {
		expect(wrapper.find(Button)).toBeDefined();
	});
});
