import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
	ClassicEditor,
	AccessibilityHelp,
	Autoformat,
	AutoImage,
	Autosave,
	BlockQuote,
	Bold,
	CKBox,
	CKBoxImageEdit,
	CloudServices,
	Essentials,
	Heading,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	PictureEditing,
	SelectAll,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextTransformation,
	TodoList,
	Underline,
	Undo,
	EditorConfig,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import { Form, FormInstance } from "antd";
import Typography from "./Typography";

interface CkProps {
	form: FormInstance;
	dynamicField: string;
	label: string;
}

export default function GenericCkEditor({
	form,
	dynamicField,
	label,
}: CkProps) {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig: Partial<EditorConfig> = {
		toolbar: {
			items: [
				"undo",
				"redo",
				"|",
				"heading",
				"|",
				"bold",
				"italic",
				"underline",
				"|",
				"fontSize",
				"fontFamily",
				"fontColor",
				"fontBackgroundColor",
				"|",
				"link",
				"insertImage",
				"ckbox",
				"mediaEmbed",
				"insertTable",
				"blockQuote",
				"|",
				"bulletedList",
				"numberedList",
				"todoList",
				"outdent",
				"indent",
			],
			shouldNotGroupWhenFull: false,
		},
		plugins: [
			FontBackgroundColor,
			FontColor,
			FontFamily,
			FontSize,
			AccessibilityHelp,
			Autoformat,
			AutoImage,
			Autosave,
			BlockQuote,
			Bold,
			CKBox,
			CKBoxImageEdit,
			CloudServices,
			Essentials,
			Heading,
			ImageBlock,
			ImageCaption,
			ImageInline,
			ImageInsert,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
			Indent,
			IndentBlock,
			Italic,
			Link,
			LinkImage,
			List,
			ListProperties,
			MediaEmbed,
			Paragraph,
			PasteFromOffice,
			PictureEditing,
			SelectAll,
			Table,
			TableCaption,
			TableCellProperties,
			TableColumnResize,
			TableProperties,
			TableToolbar,
			TextTransformation,
			TodoList,
			Underline,
			Undo,
		],
		fontSize: {
			options: [10, 12, 14, "default", 18, 20, 22],
			supportAllValues: true,
		},

		heading: {
			options: [
				{
					model: "paragraph",
					title: "Paragraph",
					class: "ck-heading_paragraph",
				},
				{
					model: "heading1",
					view: "h1",
					title: "Heading 1",
					class: "ck-heading_heading1",
				},
				{
					model: "heading2",
					view: "h2",
					title: "Heading 2",
					class: "ck-heading_heading2",
				},
				{
					model: "heading3",
					view: "h3",
					title: "Heading 3",
					class: "ck-heading_heading3",
				},
				{
					model: "heading4",
					view: "h4",
					title: "Heading 4",
					class: "ck-heading_heading4",
				},
				{
					model: "heading5",
					view: "h5",
					title: "Heading 5",
					class: "ck-heading_heading5",
				},
				{
					model: "heading6",
					view: "h6",
					title: "Heading 6",
					class: "ck-heading_heading6",
				},
			],
		},
		image: {
			toolbar: [
				"toggleImageCaption",
				"imageTextAlternative",
				"|",
				"imageStyle:inline",
				"imageStyle:wrapText",
				"imageStyle:breakText",
				"|",
				"resizeImage",
				"|",
				"ckboxImageEdit",
			],
		},
		// initialData:
		//   '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n    You\'ve successfully created a CKEditor 5 project. This powerful text editor will enhance your application, enabling rich text editing\n    capabilities that are customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n    <li>\n        <strong>Integrate into your app</strong>: time to bring the editing into your application. Take the code you created and add to your\n        application.\n    </li>\n    <li>\n        <strong>Explore features:</strong> Experiment with different plugins and toolbar options to discover what works best for your needs.\n    </li>\n    <li>\n        <strong>Customize your editor:</strong> Tailor the editor\'s configuration to match your application\'s style and requirements. Or even\n        write your plugin!\n    </li>\n</ol>\n<p>\n    Keep experimenting, and don\'t hesitate to push the boundaries of what you can achieve with CKEditor 5. Your feedback is invaluable to us\n    as we strive to improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n    <li>📝 <a href="https://orders.ckeditor.com/trial/premium-features">Trial sign up</a>,</li>\n    <li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n    <li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n    <li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n    <li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n    See this text, but the editor is not starting up? Check the browser\'s console for clues and guidance. It may be related to an incorrect\n    license key if you use premium features or another feature-related requirement. If you cannot make it work, file a GitHub issue, and we\n    will help as soon as possible!\n</p>\n',
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: "https://",
			decorators: {
				toggleDownloadable: {
					mode: "manual",
					label: "Downloadable",
					attributes: {
						download: "file",
					},
				},
			},
		},
		initialData: form?.getFieldValue(dynamicField),
		list: {
			properties: {
				styles: true,
				startIndex: true,
				reversed: true,
			},
		},
		placeholder: "Type or paste your content here!",
		table: {
			contentToolbar: [
				"tableColumn",
				"tableRow",
				"mergeTableCells",
				"tableProperties",
				"tableCellProperties",
			],
		},
	};

	return (
		<div>
			<div className="main-container">
				<div
					className="editor-container editor-container_classic-editor"
					ref={editorContainerRef}
				>
					<div className="editor-container__editor">
						<div ref={editorRef}>
							<Typography variant="bodyMediumMedium" className="mb-2">
								{label}
							</Typography>

							<Form.Item name={dynamicField}>
								{isLayoutReady && (
									<CKEditor
										editor={ClassicEditor}
										config={editorConfig}
										onChange={(_event, editor) => {
											const data = editor?.getData();
											form?.setFieldsValue({ [dynamicField]: data });
										}}
										onBlur={(_event, editor) => {
											const data = editor.getData();
											form?.setFieldsValue({ [dynamicField]: data });
										}}
									/>
								)}
							</Form.Item>
						</div>
					</div>
				</div>
			</div>
			{/* <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
			<Form />
		</div>
	);
}
