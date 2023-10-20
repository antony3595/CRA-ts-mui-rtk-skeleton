import React, { useMemo, useState } from "react";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { GridActionsColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GroupForm from "./GroupForm";
import { useSnackbar } from "notistack";
import { useCanDelete } from "../../../hooks/permissions/useCanDelete";
import { Group } from "../../../api/types/groups";
import { deleteGroup } from "../../../api/admin/groups";
import { toastApiErrorHandler } from "../../../utils/errorsUtils";
import strings from "../../../constants/strings";
import { emptyArrayOrWithElement } from "../../../utils/arrayUtils";
import { useCanChange } from "../../../hooks/permissions/useCanChange";
import { TooltipCell } from "../../common/MyDataGrid/cells/TooltipCell";
import ClosableModal from "../../common/dialogs/ClosableModal";
import ConfirmDialog from "../../common/dialogs/ConfirmDialog";
import MyDataGrid from "../../common/MyDataGrid/MyDataGrid";
import { Permission } from "../../../api/types/permissions";

interface GroupsTableProps {
	permissions: Permission[];
	groups: Group[];
	isLoading: boolean;
	totalElements: number;
	updateList: () => void;
}
const GroupsTable: React.FC<GroupsTableProps> = ({ isLoading, totalElements, updateList, groups, permissions }) => {
	const { enqueueSnackbar } = useSnackbar();
	const canDelete = useCanDelete("group");
	const canChange = useCanChange("group");

	const [updateFormOpen, setUpdateFormOpen] = useState<boolean>(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
	const [isDeleteLoading, setDeleteLoading] = React.useState<boolean>(false);

	const [activeRowValue, setActiveRowValue] = useState<Group | null>(null);

	const closeEditForm = () => {
		setUpdateFormOpen(false);
		setActiveRowValue(null);
	};
	const openEditForm = (group: Group) => {
		setActiveRowValue(group);
		setUpdateFormOpen(true);
	};
	const openDeleteDialog = (group: Group) => {
		setActiveRowValue(group);
		setDeleteModalOpen(true);
	};
	const closeDeleteDialog = () => {
		setDeleteModalOpen(false);
		setActiveRowValue(null);
	};

	const onDelete = () => {
		if (activeRowValue) {
			setDeleteLoading(true);
			deleteGroup(activeRowValue.id)
				.then(() => {
					enqueueSnackbar(`Группа "${activeRowValue.name}" удалена`, { variant: "success" });
					closeDeleteDialog();
					updateList();
				})
				.catch(toastApiErrorHandler(enqueueSnackbar))
				.finally(() => {
					setDeleteModalOpen(false);
					setActiveRowValue(null);
					setDeleteLoading(false);
				});
		}
	};

	const columns: Array<GridColDef | GridActionsColDef> = useMemo(() => {
		return [
			{
				field: "actions",
				headerName: strings.operations,
				minWidth: 100,
				type: "actions",
				getActions: (params) => [
					...emptyArrayOrWithElement(
						canChange,
						<GridActionsCellItem
							icon={
								<Tooltip title={strings.edit_role}>
									<EditIcon />
								</Tooltip>
							}
							onClick={() => {
								openEditForm(params.row);
							}}
							label="edit"
						/>
					),

					...emptyArrayOrWithElement(
						canDelete,
						<GridActionsCellItem
							icon={
								<Tooltip title={strings.delete}>
									<DeleteForeverIcon />
								</Tooltip>
							}
							onClick={() => {
								openDeleteDialog(params.row);
							}}
							label="delete"
						/>
					),
				],
			},
			{ field: "id", headerName: "id", width: 100, disableColumnMenu: true },
			{
				field: "name",
				headerName: strings.name,
				flex: 1,
				disableColumnMenu: true,
				renderCell: TooltipCell,
			},

			{
				field: "permissions",
				headerName: strings.permissions,
				minWidth: 200,
				sortable: false,
				disableColumnMenu: true,
				valueGetter: (params) => params.value.length,
			},
		];
	}, []);
	return (
		<>
			<ClosableModal
				maxWidth={"md"}
				fullWidth
				draggable
				open={updateFormOpen}
				closeModal={() => setUpdateFormOpen(false)}
				title={strings.edit_role}
				disableBackdropClick
			>
				<GroupForm
					permissions={permissions}
					group={activeRowValue}
					closeModal={closeEditForm}
					onSuccess={updateList}
					isLoading={isLoading}
				/>
			</ClosableModal>

			<ConfirmDialog
				disableBackdropClick
				draggable
				fullWidth
				isLoading={isLoading || isDeleteLoading}
				title={strings.confirm_action}
				message={`Вы действительно хотите удалить группу "${activeRowValue?.name}" ?`}
				positiveLabel={strings.confirm}
				negativeLabel={strings.cancel}
				onPositive={() => onDelete()}
				onNegative={closeDeleteDialog}
				open={deleteModalOpen}
			/>

			<MyDataGrid
				paginationMode={"server"}
				sortingMode={"server"}
				loading={isLoading}
				rowCount={totalElements}
				columns={columns}
				rows={groups}
				copyCellOnDoubleClick
			/>
		</>
	);
};

export default GroupsTable;
