import { GridRenderCellParams } from "@mui/x-data-grid";

export const EmailCell = (params: GridRenderCellParams<string>) => <a href={`mailto:${params.value}`}>{params.value}</a>;
