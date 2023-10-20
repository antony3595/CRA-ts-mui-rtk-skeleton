import { useCurrentUserPermissions } from "./useCurrentUserPermissions";
import { useMemo } from "react";
import { DjangoModelName } from "../../api/types/permissions";
import { ModelPermissions } from "../../redux/auth/types";
import { extractModelPermissions } from "../../redux/utils/authUtils";

export const useModelPermissions = (modelName: DjangoModelName): ModelPermissions => {
	const permissions = useCurrentUserPermissions();
	const modelPermissions = useMemo(() => extractModelPermissions(permissions, modelName), [permissions, modelName]);

	return modelPermissions;
};
