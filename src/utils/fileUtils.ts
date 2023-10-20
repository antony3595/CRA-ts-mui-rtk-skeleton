import FileSaver from "file-saver";

export const ZIP_TYPE = "application/zip";
export const RAR_TYPE = "application/vnd.rar";
export const EXCEL_TYPE = "application/vnd.ms-excel;charset=UTF-8";
export const XML_TYPE = "text/xml";
export const EXCEL_EXTENSION = ".xlsx";
export const XML_EXTENSION = ".xml";
export const CSV_EXTENSION = ".csv";

export function saveAsExcelFile(buffer: any, name?: string): void {
	const data: Blob = new Blob([buffer], {
		type: EXCEL_TYPE,
	});
	FileSaver.saveAs(data, name ? name + EXCEL_EXTENSION : "Export" + new Date().getTime() + EXCEL_EXTENSION);
}

export function saveAsXMLFile(buffer: any, name?: string): void {
	const data: Blob = new Blob([buffer], {
		type: XML_TYPE,
	});
	FileSaver.saveAs(data, name ? name + XML_EXTENSION : "Export" + new Date().getTime() + XML_EXTENSION);
}

export function saveAsCSV(text: any, name?: string): void {
	const data: Blob = new Blob([text], {
		type: XML_TYPE,
	});

	FileSaver.saveAs(data, name ? name + CSV_EXTENSION : "Export" + new Date().getTime() + CSV_EXTENSION);
}

export const saveFile = (data: any, name: string) => {
	FileSaver.saveAs(data, name);
};

export const getUrlExtension = (url: string) => {
	const fileSplit = url.split("?")[0];
	const fileIndex = fileSplit.lastIndexOf(".") + 1;
	const fileExtension = fileSplit.substr(fileIndex);
	return fileExtension;
};

export const getUrlFileName = (url: string) => {
	try {
		const fileSplit = url.split("/");
		const file = fileSplit[fileSplit.length - 1].split("?")[0];
		return file;
	} catch (e) {
		return url;
	}
};

export const IMAGE_EXTENSIONS = ["jpeg", "jpg", "gif", "png", "apng", "svg", "bmp"];
export const DOCUMENT_EXTENSIONS = ["pdf", "txt", "doc", "docx"];
export const DOCUMENT_TYPES = [
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"text/plain",
];
export const ARCHIVE_TYPES = [ZIP_TYPE, RAR_TYPE];

export const isImageExtension = (extension: string): boolean => IMAGE_EXTENSIONS.includes(extension);
