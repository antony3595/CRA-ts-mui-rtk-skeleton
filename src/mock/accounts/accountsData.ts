import { PaginatedBody, Role } from "../../api/types/base";
import { User } from "../../api/types/users";

export const allAccountsResponseData: User[] = [
	{
		id: 1,
		username: "admin",
		first_name: "",
		last_name: "",
		middle_name: null,
		phone: null,
		last_login: "25.03.2023 19:14:31",
		is_active: true,
		email: "antony3595@gmail.com",
		role: Role.ADMIN,
	},
	{
		id: 3,
		username: "arsadmin",
		first_name: "",
		last_name: "",
		middle_name: null,
		phone: null,
		last_login: "17.03.2023 12:40:34",
		is_active: true,
		email: "arsadmin@gmail.com",
		role: Role.ADMIN,
	},
	{
		id: 4,
		username: "bakyt",
		first_name: "",
		last_name: "",
		middle_name: "",
		phone: "996",
		last_login: "27.02.2023 17:50:01",
		is_active: true,
		email: "bakyt@test.com",
		role: Role.ADMIN,
	},
	{
		id: 2,
		username: "peri",
		first_name: "Пери",
		last_name: "Даирбекова",
		middle_name: "",
		phone: "+996",
		last_login: "22.03.2023 15:49:57",
		is_active: true,
		email: "peri@test.com",
		role: Role.ADMIN,
	},
];

export const accountsResponseData: PaginatedBody<User> = {
	count: 4,
	total_pages: 1,
	current: 1,
	results: allAccountsResponseData,
};
