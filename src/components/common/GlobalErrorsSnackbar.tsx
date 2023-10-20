import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { ActionErrorKey } from "../../redux/actionsErrors/types";
import { clearError, errorsSelector } from "../../redux/actionsErrors/actionsErrorsSlice";
import { useAppSelector } from "../../redux/hooks";

const globalErrorKeys: ActionErrorKey[] = [
	"token",
	"currentUserData",
	"users",
	"allUsers",
	"allGroups",
	"paginatedGroups",
	"allPermissions",
];

const GlobalErrorsSnackbar = () => {
	const errors = useAppSelector(errorsSelector);
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();

	useEffect(() => {
		const errorsList: [ActionErrorKey, string][] = globalErrorKeys.map((errorKey) => [errorKey, errors[errorKey].error || ""]);

		if (errors) {
			errorsList.forEach(([errorKey, errorMessage]) => {
				if (errorMessage && !errors[errorKey].errors) {
					//TODO подумать как избавится от исключения по !errors[errorKey].errors
					enqueueSnackbar(errorMessage, { variant: "error" });
					dispatch(clearError(errorKey));
				}
			});
		}
	}, [errors, enqueueSnackbar, dispatch]);

	return null;
};

export default GlobalErrorsSnackbar;
