import { DjangoModelAction, DjangoModelName } from "../../api/types/permissions";
import { useCanDoAction } from "./useCanActionForModel";

const action = DjangoModelAction.ADD;
export const useCanAdd = (modelName: DjangoModelName): boolean => useCanDoAction(modelName, action);
