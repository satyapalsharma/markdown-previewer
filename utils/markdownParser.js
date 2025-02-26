/**
 * @file utils/markdownParser.js
 * @description Utility function for parsing Markdown text into sanitized HTML.
 * This module leverages 'marked' for Markdown parsing and 'dompurify' for
 * sanitizing the resulting HTML to prevent XSS vulnerabilities.
 */

import { marked } from 'marked';
import DOMPurify from 'dompurify';

/**
 * Configures the 'marked' library with sensible defaults for a Markdown previewer.
 * - `gfm`: Enable GitHub Flavored Markdown (tables, strikethrough, task lists).
 * - `breaks`: Render <br> tags for newlines.
 * - `pedantic`: Conform to the original markdown.pl, rather than CommonMark.
 * - `sanitize`: Deprecated in newer versions of marked, as sanitization should be
 *   handled by a dedicated library like DOMPurify for better security.
 */
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
  // Sanitize option is deprecated and should be handled by DOMPurify for security
  // sanitize: true, // Do not use this, use DOMPurify instead
});

/**
 * Parses a Markdown string into sanitized HTML.
 *
 * @param {string} markdownText The Markdown string to parse.
 * @returns {string} The sanitized HTML string.
 */
export function parseMarkdown(markdownText) {
  if (typeof markdownText !== 'string') {
    console.warn('parseMarkdown received non-string input:', markdownText);
    return ''; // Return empty string for invalid input
  }

  try {
    // 1. Convert Markdown to HTML using 'marked'
    const rawHtml = marked(markdownText);

    // 2. Sanitize the HTML using 'DOMPurify' to prevent XSS attacks.
    //    DOMPurify is run in a browser-like environment (if available) or
    //    can be configured for server-side rendering (SSR) if needed.
    //    For Next.js, this typically runs client-side or during SSR with proper setup.
    const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true }, // Use default HTML profile
      FORBID_TAGS: ['script', 'style'], // Explicitly forbid script/style tags
      FORBID_ATTR: ['onerror', 'onload', 'onmouseover'], // Explicitly forbid common event handlers
    });

    return sanitizedHtml;
  } catch (error) {
    console.error('Error parsing or sanitizing Markdown:', error);
    // In a production environment, you might want to log this error to a monitoring service
    // and return a user-friendly message or an empty string.
    return `<p style="color: red;">Error rendering markdown: ${error.message}</p>`;
  }
}

// Example usage (for testing purposes, not typically run in production build)
/*
if (process.env.NODE_ENV === 'development') {
  const testMarkdown = `
# Hello Markdown!

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

\`\`\`javascript
console.log('Code block');
\`\`\`

[Link to Google](https://www.google.com)

<script>alert('XSS attempt!');</script>
`;

  const htmlOutput = parseMarkdown(testMarkdown);
  console.log('Parsed HTML Output:');
  console.log(htmlOutput);

  const maliciousMarkdown = `<img src="x" onerror="alert('XSS!')">`;
  const sanitizedMalicious = parseMarkdown(maliciousMarkdown);
  console.log('Sanitized Malicious HTML:');
  console.log(sanitizedMalicious); // Should not contain onerror
}
*/