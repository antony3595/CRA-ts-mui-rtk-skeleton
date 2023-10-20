import { DjangoModelAction, DjangoModelName } from "../../api/types/permissions";
import { useCanDoAction } from "./useCanActionForModel";

const action = DjangoModelAction.CHANGE;
export const useCanChange = (modelName: DjangoModelName): boolean => useCanDoAction(modelName, action);
