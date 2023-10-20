import { TokenDTO } from "../../api/types/auth";
import { wrapDataWithResponse } from "../mockUtils";

export const loginResponseData: TokenDTO = {
	expiry: "26.03.2023 03:06:06",
	token: "a88a0cd33aa5a8403ea3d18355b28fecbe23417a08262578ed2f13dfa4cabdb8",
};

export default wrapDataWithResponse(loginResponseData);
