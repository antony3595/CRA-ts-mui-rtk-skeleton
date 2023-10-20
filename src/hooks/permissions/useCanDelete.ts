import { DjangoModelAction, DjangoModelName } from "../../api/types/permissions";
import { useCanDoAction } from "./useCanActionForModel";

const action = DjangoModelAction.DELETE;
export const useCanDelete = (modelName: DjangoModelName): boolean => useCanDoAction(modelName, action);
