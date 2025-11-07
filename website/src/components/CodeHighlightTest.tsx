import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Tippy from "@tippyjs/react";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import "tippy.js/dist/tippy.css";

/**
 * Tagged template literal for inline highlight definitions
 */
export function highlight(
	strings: TemplateStringsArray,
	...interpolations: any[]
) {
	const result: { text: string; color?: string; tooltip?: string }[] = [];

	strings.forEach((str, i) => {
		// Push the normal part
		if (str) result.push({ text: str });

		const next = interpolations[i];
		if (next === undefined) return;

		if (typeof next === "object") {
			// New style directive
			// currentStyle = next;
			result.push(next);
		} else if (typeof next === "string") {
			// Just inline string content
			result.push({ text: next });
		}
	});

	return result;
}

function highlightedToString(code: ReturnType<typeof highlight>) {
	return code.map((part, i) => {
		const content = (
			// <span
			// 	key={i}
			// 	style={{
			// 		backgroundColor: part.color || "transparent",
			// 		borderRadius: part.color ? "4px" : undefined,
			// 	}}
			// >
			// 	{part.text}
			// </span>
			part.text
		);
		return part.tooltip ? (
			// <Tippy key={i} content={part.tooltip} delay={[100, 0]}>
			// 	{content}
			// </Tippy>
			content
		) : (
			content
		);
	}).join('');
}

/**
 * React component that renders a highlighted code block
 */
export function CodeWithHighlights({ code }: { code: ReturnType<typeof highlight> }) {
	// const rendered = code.map((part, i) => {
	// 	const content = (
	// 		// <span
	// 		// 	key={i}
	// 		// 	style={{
	// 		// 		backgroundColor: part.color || "transparent",
	// 		// 		borderRadius: part.color ? "4px" : undefined,
	// 		// 	}}
	// 		// >
	// 		// 	{part.text}
	// 		// </span>
	// 		part.text
	// 	);
	// 	return part.tooltip ? (
	// 		// <Tippy key={i} content={part.tooltip} delay={[100, 0]}>
	// 		// 	{content}
	// 		// </Tippy>
	// 		content
	// 	) : (
	// 		content
	// 	);
	// });

	return (
		<div style={{ position: 'relative' }}>
			{/* syntax highlighting */}
			<SyntaxHighlighter
				language="tsx"
				style={oneDark}
				// wrapLines
				// showLineNumbers
				PreTag="div"
				customStyle={{
					borderRadius: "8px",
					padding: "1em",
					fontSize: "0.9rem",
					tabSize: 4,
					background: 'transparent',
					margin: 0,
				}}
			>
				{highlightedToString(code).trim()}
			</SyntaxHighlighter>

			{/* codeblock highlight */}
			<code style={{
				inset: 0, position: "absolute", textAlign: 'start', borderRadius: "8px",
				padding: "1em",
				fontSize: "0.9rem",
				pointerEvents: "none",

				tabSize: 4,
				wordSpacing: 'normal',
				wordBreak: 'normal',
				lineHeight: 1.5,
				// color: 'transparent',
				background: 'rgb(40, 44, 52)',
				zIndex: -1,
			}}>
				<pre style={{ margin: 0, fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace', }}>
					{code.map((c, i) => <span key={i} style={{ borderRadius: '4px', boxShadow: c.color ? `0px 0px 0px 4px ${c.color}` : undefined, background: c.color, opacity: 0.10 }}>{c.text}</span>)}
				</pre>
			</code>
		</div>
	);
}
