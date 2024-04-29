// Skrevet av Sondre
'use client';
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const ArticleEditor = ({ initialContent, handleEditorChange }) => {
  return (
    <Editor
    apiKey='er9zpdxj4m98bmh0iw4l8b6eew8v0nvfml8qurvih265ag7b'
    init={{
      
      plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      tinycomments_mode: 'embedded',
      tinycomments_author: 'Author name',
      mergetags_list: [
        { value: 'First.Name', title: 'First Name' },
        { value: 'Email', title: 'Email' },
      ],
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default ArticleEditor;


