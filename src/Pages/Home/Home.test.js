import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configStore from "redux-mock-store";

import Home from "./Home";
import Song from "../../Components/Song/Song";

const mockstore = configStore({});

describe("Home test suite", () => {
	let wrapper;

	beforeEach(() => {
		const store = mockstore({
			songs: {
				list: [
					{
						movie: "Anurodh",
						title: "test",
						length: "5:45",
						singer: "tingting",
						description: "tingtingtingting",
						created: 1628073099133,
						id: "5913cb39-2bd0-45d4-a9b3-bd44c4f4021c",
						views: 2,
						userId: "test@mailo.com",
						name: "test"
					},
					{
						movie: "Anurodh2",
						title: "geetaha",
						length: "ting",
						singer: "shekar",
						description: "tingtingting",
						created: 1628073099133,
						id: "36d97a4b-dec8-478b-bf16-9f2d3deb95ed",
						views: 2,
						userId: "test@mailo.com",
						name: "test"
					}
				]
			}
		});
		wrapper = shallow(
			<Provider store={store}>
				<Home />
			</Provider>
		);
	});

	it("test for image", () => {
		expect(wrapper.find("img")).toBeDefined();
	});

	it("test custom component exist or not", () => {
		expect(wrapper.find(Song)).toBeDefined();
	});
});
