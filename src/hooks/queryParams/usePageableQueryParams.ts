import useQueryState from "../useQueryState";
import { useMemo } from "react";
import { PageableParams } from "../../api/types/base";
import { getValidPage, getValidPageSize } from "../../components/common/MyDataGrid/datagridUtils";

export const usePageableQueryParams = (): PageableParams => {
	const [page] = useQueryState("page", "1");
	const [pageSize] = useQueryState("size", "100");
	const [searchQS] = useQueryState("search", "");

	const params = useMemo(
		() => ({
			page: getValidPage(page),
			size: getValidPageSize(pageSize),
			search: searchQS || undefined,
		}),
		[page, pageSize, searchQS]
	);

	return params;
};
