export enum DjangoModelAction {
	VIEW = "view",
	ADD = "add",
	CHANGE = "change",
	DELETE = "delete",
}

export type PermissionStr = `${DjangoModelAction}_${DjangoModelName}`;

export interface Permission {
	id: number;
	name: string;
	codename: PermissionStr;
}

export type DjangoModelName = "appuser" | "group" | "permission" | "contenttype";
