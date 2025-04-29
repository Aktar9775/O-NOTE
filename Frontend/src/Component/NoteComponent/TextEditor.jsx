import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { db, auth } from "../../../../Backend/services/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function TextEditor() {
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

  const saveNote = async () => {
    const user = auth.currentUser;

    if (!user) {
      setStatus("Please log in to save the note.");
      return;
    }

    const content = editorRef.current?.getContent();
    if (!fileName || !content) {
      setStatus("Please provide a file name and some content.");
      return;
    }

    try {
      await addDoc(collection(db, "notes"), {
        userId: user.uid,
        fileName: fileName,
        content: content,
        createdAt: Timestamp.now(),
      });
      setStatus("Note saved successfully.");
      setFileName("");
      editorRef.current.setContent("");
    } catch (error) {
      console.error("Error saving note:", error);
      setStatus("Error saving note. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
    
      <div className="flex ml-6 flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
        <input
          type="text"
          placeholder="Enter file name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/2"
        />
        <button
          onClick={saveNote}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save file
        </button>
      </div>

  
      <Editor
        apiKey="00ahn8k9bjbwhafcx153kj2opbujo8tuiaiuj2i7768yfcb8"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 560,
          branding: false,
          menubar: 'file edit insert view format tools table',
          plugins: [
            'print preview paste importcss searchreplace autolink autosave save directionality',
            'code visualblocks visualchars fullscreen image link media template codesample table charmap hr',
            'pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern',
            'noneditable help charmap quickbars emoticons',
          ],
          toolbar:
            'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | ' +
            'alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist | ' +
            'forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | ' +
            'preview save print | link image media template anchor codesample | ltr rtl | ' +
            'fullscreen code help',
          toolbar_mode: 'sliding',
          quickbars_selection_toolbar:
            'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          quickbars_insert_toolbar: 'image media table hr',
          contextmenu: 'link image imagetools table',
          images_upload_url: '/upload',
          automatic_uploads: true,
          file_picker_types: 'file image media',
          file_picker_callback: (cb, value, meta) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');

            if (meta.filetype === 'file') {
              input.setAttribute('accept', '*/*');
            } else if (meta.filetype === 'image') {
              input.setAttribute('accept', 'image/*');
            } else if (meta.filetype === 'media') {
              input.setAttribute('accept', 'video/*,audio/*');
            }

            input.onchange = function () {
              const file = input.files[0];
              const reader = new FileReader();

              reader.onload = function () {
                const id = 'blobid' + new Date().getTime();
                const blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                const base64 = reader.result.split(',')[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                cb(blobInfo.blobUri(), {
                  title: file.name,
                  text: file.name,
                });
              };

              reader.readAsDataURL(file);
            };

            input.click();
          },
        }}
      />

      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
}
