import React from 'react';
import PropTypes from 'prop-types';

/**
 * Editor Component
 *
 * Renders a textarea for users to input markdown text.
 * It's a controlled component, meaning its value is controlled by its parent component.
 *
 * @param {object} props - The component's properties.
 * @param {string} props.markdownText - The current markdown text to display in the editor.
 * @param {function(string): void} props.onMarkdownChange - Callback function to be called when the markdown text changes.
 */
const Editor = ({ markdownText, onMarkdownChange }) => {
  /**
   * Handles changes to the textarea's content.
   * Extracts the new value from the event and calls the onMarkdownChange prop.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event from the textarea.
   */
  const handleChange = (event) => {
    onMarkdownChange(event.target.value);
  };

  return (
    <div className="editor-container">
      <label htmlFor="markdown-input" className="sr-only">
        Markdown Editor
      </label>
      <textarea
        id="markdown-input"
        className="markdown-editor"
        placeholder="Start typing your markdown here..."
        value={markdownText}
        onChange={handleChange}
        aria-label="Markdown Input Editor"
        // Add some common markdown editor attributes for better UX
        rows={20} // Default number of rows
        cols={80} // Default number of columns
        spellCheck="true"
      ></textarea>
    </div>
  );
};

// Define PropTypes for better type checking and documentation in development
Editor.propTypes = {
  markdownText: PropTypes.string.isRequired,
  onMarkdownChange: PropTypes.func.isRequired,
};

export default Editor;