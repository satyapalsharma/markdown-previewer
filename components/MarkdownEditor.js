import React from 'react';

/**
 * @typedef {object} MarkdownEditorProps
 * @property {string} markdown - The current Markdown content to display in the editor.
 * @property {(newMarkdown: string) => void} onMarkdownChange - Callback function to be called when the Markdown content changes.
 */

/**
 * MarkdownEditor Component
 *
 * A controlled component that provides a textarea for users to input Markdown syntax.
 * It displays the current Markdown content passed via props and notifies the parent
 * component of any changes through a callback function.
 *
 * @param {MarkdownEditorProps} props - The properties for the component.
 * @returns {JSX.Element} The Markdown editor UI.
 */
const MarkdownEditor = ({ markdown, onMarkdownChange }) => {
  /**
   * Handles changes to the textarea content.
   * Calls the `onMarkdownChange` prop with the new value.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event from the textarea.
   */
  const handleChange = (event) => {
    onMarkdownChange(event.target.value);
  };

  return (
    <div className="markdown-editor-container">
      <label htmlFor="markdown-input" className="sr-only">
        Markdown Input
      </label>
      <textarea
        id="markdown-input"
        className="markdown-editor"
        value={markdown}
        onChange={handleChange}
        placeholder="Start typing your Markdown here..."
        rows={20} // Default rows, can be overridden by CSS
        spellCheck="false" // Markdown often contains code snippets, disable spell check for better UX
        aria-label="Markdown content editor"
      />
    </div>
  );
};

export default MarkdownEditor;