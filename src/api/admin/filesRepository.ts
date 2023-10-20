import { adminAPI } from "../adminAPI";
import * as ep from "../endpoints";
import { FilesUploadDTO, FilesUploadResponse } from "../types/filesRepository";
import { BaseResponse } from "../types/base";

export const uploadFile = (data: FilesUploadDTO) => {
	const headers = {
		"Content-Type": "multipart/form-data",
	};
	return adminAPI.post<BaseResponse<FilesUploadResponse>>(ep.FILE_UPLOAD, data, { headers });
};
