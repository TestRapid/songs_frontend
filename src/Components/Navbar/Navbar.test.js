import { shallow } from "enzyme";

import Navbar from "./Navbar";
import configStore from "redux-mock-store";
import { Provider } from "react-redux";
import Logout from "./Logout";
import Login from "./Login";

const mockStore = configStore({
	auth: {}
});

describe("Test suite for Navbar", () => {
	let store;
	let wrapper;
	beforeEach(() => {
		store = mockStore({
			auth: {
				user: {
					firstName: "user",
					lastName: "user",
					password: "userbkj",
					gender: "male",
					mobile: "903945234",
					location: "bangalore",
					id: "user@mailo.com",
					added: 1627912422223,
					playlist: {
						MyPlaylist: []
					}
				}
			}
		});
		wrapper = shallow(
			<Provider store={store}>
				<Navbar />
			</Provider>
		);
	});

	it("snapshot test", () => {
		expect(wrapper).toMatchSnapshot();
	});

	it("test for Login component", () => {
		let login = wrapper.find(Login);
		expect(login).toBeDefined();
	});

	it("test for menu list", () => {
		let list = wrapper.find("div>Link");
		expect(list.length).toBeDefined();
	});
});

describe("test when store is has no logged in user", () => {
	let store;
	let wrapper;

	beforeEach(() => {
		store = mockStore({
			auth: null
		});
		wrapper = shallow(
			<Provider store={store}>
				<Navbar />
			</Provider>
		);
	});

	it("test for Logout component", () => {
		let logout = wrapper.find(Logout);
		expect(logout).toBeDefined();
	});
});
