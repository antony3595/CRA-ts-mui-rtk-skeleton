// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import LabelledOutline from "../LabelledOutline";
import uploadPlugin from "./plugins";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Paper, Tooltip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import strings from "../../../../constants/strings";
import ClosableModal from "../../dialogs/ClosableModal";
import UploadFileForm from "./UploadFileForm";
import copyStringToClipboard from "../../../../utils/windowUtils";

const configuration = {
	alignment: {
		options: ["left", "right", "center", "justify"],
	},
	image: {
		resizeUnit: "px",
		toolbar: ["imageStyle:inline", "imageStyle:wrapText", "imageStyle:breakText", "|", "toggleImageCaption", "imageTextAlternative"],
	},
	mediaEmbed: {
		previewsInData: true,
	},
	table: {
		contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
	},
	toolbar: {
		items: [
			"heading",
			"undo",
			"redo",
			"|",
			"fontfamily",
			"fontsize",
			"fontColor",
			"fontBackgroundColor",
			"|",
			"bold",
			"italic",
			"underline",
			"strikethrough",
			"|",
			"alignment",
			"|",
			"link",
			"blockquote",
			"uploadImage",
			"insertTable",
			"|",
			"numberedList",
			"bulletedList",
			"|",
			"outdent",
			"indent",
			"|",
			"mediaEmbed",
		],
	},
	extraPlugins: [uploadPlugin],
	heading: {
		options: [
			{ model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
			{ model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
			{ model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
		],
	},
	language: "ru",
};

interface RichTextFieldProps {
	onChange: (value: string) => void;
	label: string;
	helperText?: string;
	error?: boolean;
	required?: boolean;
	value: string;
	id?: string;
}
// TODO declare this
const RichTextField: React.FC<RichTextFieldProps> = ({ onChange, helperText, label, error, value, id , required=false}) => {
	const [isFormOpen, setFormOpen] = React.useState<boolean>(false);

	const openForm = () => {
		setFormOpen(true);
	};
	const closeForm = () => {
		setFormOpen(false);
	};

	return (
		<LabelledOutline id={id} required={required} label={label} error={error} helperText={helperText}>
			<ClosableModal maxWidth={"sm"} draggable title={strings.file_uploading} fullWidth open={isFormOpen} closeModal={closeForm}>
				<UploadFileForm
					onSuccess={(data) => {
						copyStringToClipboard(data.url);
					}}
				/>
			</ClosableModal>
			<Paper
				sx={{ display: "flex", justifyContent: "flex-end", p: "4px", borderRadius: "2px", borderBottom: "none" }}
				variant={"outlined"}
			>
				<Tooltip title={strings.upload_file}>
					<IconButton sx={{ borderRadius: 1, padding: "5px" }} size={"small"} color={"action.hover"} onClick={openForm}>
						<CloudUploadIcon />
					</IconButton>
				</Tooltip>
			</Paper>
			<CKEditor
				editor={DecoupledEditor}
				config={configuration}
				data={value}
				onReady={(editor: DecoupledEditor) => {
					// Insert the toolbar before the editable area.
					editor.editing.view.change((writer) => {
						writer.setStyle("min-height", "400px", editor.editing.view.document.getRoot());
					});
					editor.ui
						.getEditableElement()
						.parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
				}}
				onError={(error, { willEditorRestart }) => {
					if (willEditorRestart) {
						this.editor.ui.view.toolbar.element.remove();
					}
				}}
				onChange={(event: any, editor: any) => {
					const data = editor.getData();
					onChange(data as string);
				}}
			/>
		</LabelledOutline>
	);
};

export default RichTextField;
