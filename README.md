React Markdown:
. The component converts Markdown text into React elements while customizing how links (<a>) are rendered.
. It intentionally avoids dangerouslySetInnerHTML (common anti-pattern for raw HTML) and instead uses ReactMarkdown to safely convert Markdown to React nodes, reducing XSS risk.
. ReactMarkdown accepts components — a map where you can override how specific Markdown elements are rendered.
. We override the a (anchor/link) element with a custom renderer function.
=> Security and XSS
. Using ReactMarkdown instead of dangerouslySetInnerHTML is safer because the library parses Markdown and builds React nodes rather than injecting raw HTML.
. However, ReactMarkdown can still render raw HTML if configured to allow it (via rehypeRaw). Since the component doesn’t enable rehypeRaw, raw HTML in Markdown will not be rendered as HTML by default — good.