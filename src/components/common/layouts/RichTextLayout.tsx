import React from "react";

interface RichTextLayoutProps {
	text: string;
}

const RichTextLayout: React.FC<RichTextLayoutProps> = ({ text }) => {
	return <div className={"ck-content"} dangerouslySetInnerHTML={{ __html: text }}></div>;
};

export default RichTextLayout;
