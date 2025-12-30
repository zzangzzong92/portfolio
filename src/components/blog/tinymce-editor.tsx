"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, useEffect } from "react";

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
  const [isMounted, setIsMounted] = useState(false);
  
  const apiKey = 
    process.env.NEXT_PUBLIC_TINY_MCE_KEY || 
    "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div 
        className="border border-gray-300 rounded"
        style={{ height: `${height}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div>Loading editor...</div>
      </div>
    );
  }

  if (!apiKey) {
    console.warn(
      "TinyMCE API key is missing. Please add NEXT_PUBLIC_TINY_MCE_KEY to your .env file and restart the dev server."
    );
  }

  return (
    <Editor
      apiKey={apiKey}
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


