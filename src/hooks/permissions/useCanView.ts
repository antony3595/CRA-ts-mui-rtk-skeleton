import { DjangoModelAction, DjangoModelName } from "../../api/types/permissions";
import { useCanDoAction } from "./useCanActionForModel";

const action = DjangoModelAction.VIEW;
export const useCanView = (modelName: DjangoModelName): boolean => useCanDoAction(modelName, action);
