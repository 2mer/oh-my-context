import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CodeWithHighlights, highlight } from "./components/CodeHighlightTest";

const parts = {
	defaultValue: { color: 'orange', tooltip: 'default value', text: '{ value: { x: 0, y: 0 }, setValue: () => {} }' },
	providerComponentProps: { color: 'green', tooltip: 'provider component props', text: '{ initialValue, children }' },
	hookContent: { color: 'red', tooltip: 'hook content', text: 'const [value, setValue] = React.useState(initialValue);' },
	providerValue: { color: 'blue', tooltip: 'provider value', text: '{ value, setValue }' }
}

const standardCode = highlight`\
const PointContext = React.createContext(
	${parts.defaultValue}
);

function usePointContext() {
	return React.useContext(PointContext);
}

const PointContextProvider = (${parts.providerComponentProps}) => {
	${parts.hookContent}

	return (
		<PointContext.Provider value={${parts.providerValue}}>
			{children}
		</PointContext.Provider>
	);
}\
`;

const shortCode = highlight`\
const PointContext = createContext((${parts.providerComponentProps}) => {
	${parts.hookContent}

	return ${parts.providerValue};
}, ${parts.defaultValue});
// optional default value
// if not specified will yell at you if you .use outside of context provider`;

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			{/* <div>
				<a href="https://vite.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div> */}
			<h1>hold-my-context</h1>
			<p>creating a new context shouldn't feel like a chore</p>

			<div className="card">
				{/* <button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p> */}
				<CodeWithHighlights code={standardCode} />
				<code>{'===>'}</code>
				<CodeWithHighlights code={shortCode} />
			</div>
			{/* <p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p> */}
		</>
	);
}

export default App;
