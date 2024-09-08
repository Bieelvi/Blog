import { Editor } from "@tinymce/tinymce-react";

export default function EditorTinyMCE({ editorRef, value, id }) {
    return (
        <Editor
            id={id}
            name={id}
            required
            initialValue={value}
            apiKey="frw955t9upxyjtvbkysywn5gpgca5ydbrgjduj7w6g57ffly"
            onInit={(_evt, editor) => editorRef.current = editor}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'codesample'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help | codesample'
            }}
        ></Editor>
    );
}