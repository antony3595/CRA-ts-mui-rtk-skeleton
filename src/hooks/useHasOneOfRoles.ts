import { Role } from "../api/types/base";
import { hasOneOfRoles } from "../utils/apiUtils";
import { useMemo } from "react";
import { useAuth } from "./useAuth";

export const useHasOneOfRoles = (roles: Role[]) => {
	const auth = useAuth();
	return useMemo(() => hasOneOfRoles(auth, roles), [roles, auth]);
};
