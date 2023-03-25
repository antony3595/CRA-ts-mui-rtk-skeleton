import { TokenDTO } from "../../api/types/auth";
import { Role } from "../../api/types/base";
import { wrapDataWithResponse } from "../mockUtils";

export const loginResponseData: TokenDTO = {
	expiry: "26.03.2023 03:06:06",
	token: "a88a0cd33aa5a8403ea3d18355b28fecbe23417a08262578ed2f13dfa4cabdb8",
	user: {
		id: 1,
		username: "admin",
		first_name: "Arslanbek",
		last_name: "Jumabaev",
		middle_name: "Myktarbekovich",
		phone: null,
		email: "admin@gmail.com",
		role: Role.ADMIN,
	},
};

export default wrapDataWithResponse(loginResponseData);
