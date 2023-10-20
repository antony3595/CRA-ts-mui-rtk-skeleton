import { UserMin } from "../../../api/types/users";
import { useAllUsersLoader } from "./useAllUsersLoader";

export const useManagerUsersLoader = (): [boolean, UserMin[]] => {
	return useAllUsersLoader();
};
