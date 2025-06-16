import React from 'react';
import PropTypes from 'prop-types';

/**
 * Previewer Component
 *
 * This component is responsible for displaying the rendered HTML output
 * of the markdown content. It receives an HTML string as a prop and
 * injects it directly into the DOM using `dangerouslySetInnerHTML`.
 *
 * It is critical that the `htmlContent` passed to this component has been
 * properly sanitized by the `markdownConverter` utility to prevent
 * Cross-Site Scripting (XSS) vulnerabilities.
 */
const Previewer = ({ htmlContent }) => {
  return (
    <div
      className="previewer-container"
      // dangerouslySetInnerHTML is used here to render the raw HTML string
      // generated from markdown. It's named "dangerous" because if the HTML
      // content is not sanitized, it can lead to XSS attacks.
      // In this project, the `markdownConverter` utility is expected to handle
      // the necessary sanitization before passing the content here.
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      // Accessibility attributes for better user experience, especially for screen readers.
      aria-live="polite" // Indicates that updates to this region should be announced.
      aria-atomic="true" // Ensures the entire region is announced as a single unit when updated.
      role="region" // Defines the element as a perceivable region of the content.
      aria-label="Markdown Preview Output" // Provides an accessible name for the region.
    />
  );
};

/**
 * Prop Types for the Previewer component.
 *
 * Defines the expected types and requirements for the props passed to this component.
 * - `htmlContent`: A string containing the HTML to be displayed, and it is required.
 */
Previewer.propTypes = {
  htmlContent: PropTypes.string.isRequired,
};

export default Previewer;