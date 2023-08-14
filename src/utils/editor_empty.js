import { convertToRaw } from "draft-js";

function isEditorEmpty(blogContent) {
  const contentState = blogContent.getCurrentContent();
  const rawContent = convertToRaw(contentState);
  return rawContent.blocks.every((block) => block.text === "");
}

export default isEditorEmpty;
