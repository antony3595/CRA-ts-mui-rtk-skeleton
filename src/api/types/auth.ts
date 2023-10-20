export interface BasicCredentials {
	username: string;
	password: string;
}

export interface BasicCredentialsErrors {
	username?: string;
	password?: string;
}

export interface TokenDTO {
	expiry: string;
	token: string;
}
