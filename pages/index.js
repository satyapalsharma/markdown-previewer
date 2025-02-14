import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import MarkdownEditor from '../components/MarkdownEditor';
import MarkdownPreview from '../components/MarkdownPreview';
import { parseMarkdownToHtml } from '../utils/markdownParser'; // Assuming a named export

/**
 * HomePage Component
 *
 * This is the main page component for the Markdown Previewer application.
 * It orchestrates the Markdown editor and preview components, managing the
 * state of the Markdown input and the rendered HTML output.
 */
export default function HomePage() {
  // Initialize markdown state with some default content to showcase features
  const [markdownInput, setMarkdownInput] = useState(
    `# Welcome to the Markdown Previewer!

This is an interactive web tool where you can type Markdown syntax on one pane and see the rendered HTML output in real-time on another.

## Features:
*   **Real-time Preview**: See your changes instantly.
*   **Syntax Highlighting**: (Future enhancement)
*   **Cross-Project Integration**: Part of a larger ecosystem including services like the [Recipe Finder](/recipe-finder) (conceptual link).

### Examples:

\`\`\`javascript
// Code Block Example
function helloWorld() {
  console.log("Hello, Markdown!");
}
\`\`\`

**Bold Text** and *Italic Text* are easy.
You can also create [links](https://www.example.com) and add images:
![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg "React Logo")

> Blockquotes are great for emphasizing text.

- List item one
- List item two
  - Nested list item

1. Ordered list item one
2. Ordered list item two

---

Enjoy creating your Markdown!
`
  );
  const [htmlOutput, setHtmlOutput] = useState('');

  /**
   * Memoized callback to handle changes from the MarkdownEditor.
   * Updates the markdownInput state.
   */
  const handleMarkdownChange = useCallback((newMarkdown) => {
    setMarkdownInput(newMarkdown);
  }, []);

  /**
   * useEffect hook to parse markdown to HTML whenever markdownInput changes.
   * This ensures the preview is always up-to-date.
   */
  useEffect(() => {
    // Asynchronously parse markdown to prevent blocking the main thread for very large inputs
    // and to allow for potential future server-side rendering or more complex parsing.
    const renderMarkdown = async () => {
      try {
        const parsedHtml = await parseMarkdownToHtml(markdownInput);
        setHtmlOutput(parsedHtml);
      } catch (error) {
        console.error('Error parsing markdown:', error);
        // Optionally, display an error message in the preview pane
        setHtmlOutput('<p style="color: red;">Error rendering markdown.</p>');
      }
    };

    renderMarkdown();
  }, [markdownInput]); // Dependency array: re-run effect when markdownInput changes

  return (
    <div className="container">
      <Head>
        <title>Markdown Previewer - Real-time Editor</title>
        <meta name="description" content="An interactive web tool to write Markdown and see the rendered HTML output in real-time. Part of a larger microservice ecosystem." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main-content">
        <h1 className="title">Markdown Previewer</h1>
        <p className="description">Type Markdown on the left, see HTML on the right.</p>

        <div className="editor-preview-grid">
          {/* Markdown Editor Component */}
          <section className="editor-pane">
            <h2>Editor</h2>
            <MarkdownEditor
              value={markdownInput}
              onChange={handleMarkdownChange}
            />
          </section>

          {/* Markdown Preview Component */}
          <section className="preview-pane">
            <h2>Preview</h2>
            <MarkdownPreview
              htmlContent={htmlOutput}
            />
          </section>
        </div>
      </main>

      <style jsx global>{`
        /* Global styles for the layout, typically in styles/globals.css */
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          background-color: #f0f2f5;
          color: #333;
        }

        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1200px;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
          text-align: center;
          color: #0070f3;
        }

        .description {
          text-align: center;
          line-height: 1.5;
          font-size: 1.25rem;
          margin-bottom: 2rem;
          color: #555;
        }

        .editor-preview-grid {
          display: flex;
          flex-wrap: wrap; /* Allows wrapping on smaller screens */
          width: 100%;
          gap: 20px; /* Space between panes */
          min-height: 70vh; /* Ensure content takes up vertical space */
        }

        .editor-pane,
        .preview-pane {
          flex: 1; /* Each pane takes equal width */
          min-width: 300px; /* Minimum width before wrapping */
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
        }

        .editor-pane h2,
        .preview-pane h2 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #0070f3;
          border-bottom: 1px solid #eee;
          padding-bottom: 0.5rem;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .editor-preview-grid {
            flex-direction: column; /* Stack panes vertically */
          }
        }
      `}</style>
    </div>
  );
}