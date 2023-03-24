import { useMemo } from "react";
import { hasOneOfRoles } from "../utils/apiUtils";
import config from "../config";
import { useAuth } from "./useAuth";

export const useCanDelete = () => {
	const auth = useAuth();
	return useMemo(() => hasOneOfRoles(auth, config.rolesCanDelete), [auth]);
};
