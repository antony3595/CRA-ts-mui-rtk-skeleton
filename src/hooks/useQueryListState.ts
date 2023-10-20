import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const emptyArray: string[] = [];

const useQueryListState = (queryParam: string, resetOther = false): [string[], (newValue: string[]) => void] => {
	const [params, setSearchParams] = useSearchParams();
	const [value, setValue] = useState<string[]>(params.getAll(queryParam) || emptyArray);

	useEffect(() => {
		const newValue = params.getAll(queryParam) || emptyArray;
		setValue(newValue);
	}, [setValue, params, queryParam, emptyArray]);

	const setNewValue = useCallback(
		(newValue: string[]) => {
			const newParams = resetOther ? new URLSearchParams() : params;
			if (newValue.length)
				newParams.forEach((item) => {
					newParams.append(queryParam, item);
				});
			else newParams.delete(queryParam);
			setSearchParams(newParams);
		},
		[resetOther, params, queryParam, setSearchParams]
	);

	return [value || emptyArray, setNewValue];
};

export default useQueryListState;
