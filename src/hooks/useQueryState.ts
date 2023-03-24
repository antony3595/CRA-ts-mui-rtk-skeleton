import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useQueryState = (queryParam: string, defaultValue = "", resetOther = false): [string, (newValue: string) => void] => {
	const [params, setSearchParams] = useSearchParams();
	const [value, setValue] = useState<string>(params.get(queryParam) || defaultValue);

	useEffect(() => {
		const newValue = params.get(queryParam) || defaultValue;
		setValue(newValue);
	}, [setValue, params, queryParam, defaultValue]);

	const setNewValue = useCallback(
		(newValue: string) => {
			const newParams = resetOther ? new URLSearchParams() : params;

			newParams.set(queryParam, newValue);
			setSearchParams(newParams);
		},
		[resetOther, params, queryParam, setSearchParams]
	);

	return [value || defaultValue, setNewValue];
};

export default useQueryState;
