import {GridRenderCellParams} from "@mui/x-data-grid";
import {getBooleanIcon} from "../../../../utils/iconsUtils";

export const BooleanCell = (params: GridRenderCellParams<boolean | null>) => getBooleanIcon(params.value);