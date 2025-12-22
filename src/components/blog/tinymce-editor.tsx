"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

interface TinyMCEEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
}

export default function TinyMCEEditor({
  value,
  onChange,
  height = 500,
}: TinyMCEEditorProps) {
  const editorRef = useRef<any>(null);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key"}
      onInit={(_evt, editor) => {
        editorRef.current = editor;
      }}
      value={value}
      onEditorChange={(content) => {
        onChange(content);
      }}
      init={{
        height: height,
        menubar: true,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help | code | link image | table",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
        language: "ko_KR",
        branding: false,
      }}
    />
  );
}

