import { useCurrentUserPermissions } from "./useCurrentUserPermissions";
import { DjangoModelAction, DjangoModelName } from "../../api/types/permissions";
import { hasPermission } from "../../redux/utils/authUtils";

export const useCanDoAction = (modelName: DjangoModelName, action: DjangoModelAction): boolean => {
	const permissions = useCurrentUserPermissions();
	return hasPermission(permissions, `${action}_${modelName}`);
};
