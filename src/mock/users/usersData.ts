import { User } from "../../api/types/users";
import { PaginatedBody } from "../../api/types/base";

export const allUsersResponseData: User[] = [
	{
		id: 6,
		username: "zubenko4",
		first_name: "Михаил",
		last_name: "Зубенко",
		middle_name: "Петрович",
		last_login: null,
		is_active: true,
		email: "mafioznik4@mail.ru",
		is_staff: true,
		is_superuser: true,
		groups: [
			{
				id: 1,
				name: "Оператор первичной базы",
			},
		],
	},
	{
		id: 5,
		username: "zubenko3",
		first_name: "Михаил",
		last_name: "Зубенко",
		middle_name: "Петрович",
		last_login: null,
		is_active: true,
		email: "mafioznik3@mail.ru",
		is_staff: true,
		is_superuser: true,
		groups: [
			{
				id: 1,
				name: "Оператор первичной базы",
			},
		],
	},
	{
		id: 3,
		username: "zubenko1",
		first_name: "Михаил",
		last_name: "Зубенко",
		middle_name: "Петрович",
		last_login: null,
		is_active: true,
		email: "mafioznik@mail.ru",
		is_staff: true,
		is_superuser: true,
		groups: [
			{
				id: 1,
				name: "Оператор первичной базы",
			},
		],
	},
	{
		id: 2,
		username: "manager",
		first_name: "Arslanbek",
		last_name: "Jumabaev",
		middle_name: "Myktarbekovich",
		last_login: "02.05.2023 17:34:18",
		is_active: true,
		email: "manager@gmail.com",
		is_staff: false,
		is_superuser: false,
		groups: [
			{
				id: 1,
				name: "Оператор первичной базы",
			},
		],
	},
	{
		id: 1,
		username: "admin",
		first_name: "Arslanbek",
		last_name: "Jumabaev",
		middle_name: "Myktarbekovich",
		last_login: "03.05.2023 15:53:41",
		is_active: true,
		email: "antony3595@gmail.com",
		is_staff: true,
		is_superuser: true,
		groups: [
			{
				id: 1,
				name: "Оператор первичной базы",
			},
		],
	},
];

export const usersResponseData: PaginatedBody<User> = {
	count: 4,
	total_pages: 1,
	current: 1,
	results: allUsersResponseData,
};
