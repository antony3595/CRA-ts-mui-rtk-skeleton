import { CurrentUser } from "./users";

export interface BasicCredentials {
	username: string;
	password: string;
}

export interface TokenDTO {
	expiry: string;
	token: string;
	user: CurrentUser;
}
