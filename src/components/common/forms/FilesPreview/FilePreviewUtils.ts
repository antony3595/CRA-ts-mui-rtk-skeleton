import { getUrlExtension, isImageExtension } from "../../../../utils/fileUtils";
import FileIC from "../../../../images/icons/file_ic.png";

export const getFilePreviewImage = (file: File): string => {
	if (isImageExtension(getUrlExtension(file.name))) {
		return URL.createObjectURL(file);
	}
	return FileIC;
};
