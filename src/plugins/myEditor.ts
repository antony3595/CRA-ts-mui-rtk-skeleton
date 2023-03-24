/* eslint-disable @typescript-eslint/ban-ts-comment */
import config from "../config";
import { adminAPI } from "../api/adminAPI";
import { isSuccessResponse } from "../api/types/base";
import { getApiResponseErrorMessage } from "../utils/errorsUtils";

const API_URL = config.API_URL;
const UPLOAD_ENDPOINT = "admin-api/ckeditor/upload";

// @ts-ignore
function uploadAdapter(loader) {
	return {
		upload: () => {
			return new Promise((resolve, reject) => {
				const body = new FormData();
				// @ts-ignore
				loader.file.then((file) => {
					const headers = {
						"Content-Type": "multipart/form-data",
					};

					body.append("upload", file);
					const url = `${API_URL}${UPLOAD_ENDPOINT}`;
					adminAPI
						.post(url, body, { headers })
						.then((res) => {
							if (isSuccessResponse(res)) {
								return res.data.data;
							} else reject(new Error(getApiResponseErrorMessage(res)));
						})
						.then((res) => {
							resolve({
								default: res.url,
							});
						})
						.catch((err) => {
							reject(err);
						});
				});
			});
		},
	};
}

// @ts-ignore
export default function uploadPlugin(editor) {
	// @ts-ignore
	editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
		return uploadAdapter(loader);
	};
}
