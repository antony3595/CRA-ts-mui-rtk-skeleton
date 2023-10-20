import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useQueryState = (
	queryParam: string,
	defaultValue = "",
	resetOther = false
): [string, (newValue: string | undefined | null) => void] => {
	const [params, setSearchParams] = useSearchParams();
	const [value, setValue] = useState<string | undefined | null>(params.get(queryParam) || defaultValue);

	useEffect(() => {
		const newValue = params.get(queryParam) || defaultValue;
		setValue(newValue);
	}, [setValue, params, queryParam, defaultValue]);

	const setNewValue = useCallback(
		(newValue: string | undefined | null) => {
			const newParams = resetOther ? new URLSearchParams() : params;
			if (newValue) newParams.set(queryParam, newValue);
			else newParams.delete(queryParam);
			setSearchParams(newParams);
		},
		[resetOther, params, queryParam, setSearchParams]
	);

	return [value || defaultValue, setNewValue];
};

export default useQueryState;
