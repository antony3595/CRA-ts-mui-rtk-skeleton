// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import LabelledOutline from "./LabelledOutline";
import uploadPlugin from "../../../plugins/myEditor";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

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
			"numberedList",
			"bulletedList",
			"|",
			"outdent",
			"indent",
			"|",
			"link",
			"blockquote",
			"uploadImage",
			"insertTable",
			"|",
			"undo",
			"redo",
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
	value: string;
}
// TODO declare this
const RichTextField: React.FC<RichTextFieldProps> = ({ onChange, helperText, label, error, value }) => {
	return (
		<LabelledOutline label={label} error={error} helperText={helperText}>
			<CKEditor
				editor={DecoupledEditor}
				config={configuration}
				data={value}
				onReady={(editor: DecoupledEditor) => {
					// Insert the toolbar before the editable area.
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
