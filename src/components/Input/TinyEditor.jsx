/** @format */

import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const TinyEditor = ({
  id,
  setValue,
  label,
  register,
  errors,
  validate,
  value,
}) => {
  return (
    <div>
      <span className="block mb-[6px] text-base font-medium text-gray-900 ">
        {label}
      </span>
      <Editor
        apiKey="dhlxleeqnprm5fginnh3rftr5cvbvcvc3pkxzfke213luzxe"
        {...register(id, validate)}
        initialValue={value}
        onChange={(e) => setValue(id, e.target.getContent())}
        init={{
          height: 500,
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
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      {errors[id] && (
        <small className="text-[12px] text-error italic  ">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default TinyEditor;
