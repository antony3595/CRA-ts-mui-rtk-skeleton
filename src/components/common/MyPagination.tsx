import React, { useMemo } from "react";
import { Pagination } from "@mui/material";
import { PaginationProps } from "@mui/material/Pagination/Pagination";
import useQueryState from "../../hooks/useQueryState";
import { scroll } from "../../hooks/useScroller";

interface MyPaginationProps extends PaginationProps {
	page?: number;
	pageCount: number;
	scrollOnClick?: boolean;
}

const MyPagination: React.FC<MyPaginationProps> = ({ pageCount, scrollOnClick = true, ...props }) => {
	const [page, setPage] = useQueryState("page", "1");

	const intPage = useMemo<number>(() => {
		try {
			return parseInt(page);
		} catch (e) {
			return 1;
		}
	}, [page]);
	return (
		<Pagination
			onClick={scrollOnClick ? () => scroll(true) : undefined}
			color="primary"
			count={pageCount}
			page={intPage}
			onChange={(event, value) => setPage(value.toString())}
			{...props}
		/>
	);
};

export default MyPagination;
