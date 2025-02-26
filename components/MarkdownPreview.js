import React from 'react';

/**
 * @typedef {object} MarkdownPreviewProps
 * @property {string} htmlContent - The HTML string to be rendered in the preview pane.
 */

/**
 * MarkdownPreview Component
 *
 * Renders the HTML output generated from Markdown. This component takes an HTML string
 * and displays it directly in the DOM, allowing users to see the rich text representation
 * of their Markdown input.
 *
 * @param {MarkdownPreviewProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered HTML preview component.
 */
const MarkdownPreview = ({ htmlContent }) => {
  /**
   * Renders raw HTML using `dangerouslySetInnerHTML`.
   *
   * IMPORTANT: `dangerouslySetInnerHTML` is used here because the core functionality
   * of this application is to render user-typed Markdown as HTML. While generally
   * discouraged due to XSS risks, it is appropriate in this context where:
   * 1. The input is provided directly by the user for their own preview.
   * 2. The `utils/markdownParser.js` module is expected to handle any necessary
   *    sanitization of the HTML output to mitigate potential vulnerabilities,
   *    especially if this content were ever to be persisted or shared.
   *
   * For a client-side previewer where the user is the sole consumer of their input,
   * the risk is contained, but robust sanitization in the parser is crucial for
   * production readiness and security best practices.
   */
  return (
    <div
      className="markdown-preview-pane"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      aria-live="polite" // Indicates that updates to this region should be announced by screen readers politely.
      aria-label="Markdown Preview Output" // Provides an accessible label for the preview region.
      role="region" // Defines this as a perceivable section of content.
    ></div>
  );
};

export default MarkdownPreview;