import "./App.css";
import { CodeWithHighlights } from "./components/CodeHighlightTest";
import { libContextDefinition, libHookUsage, libProviderUsage, standardContextDefinition, standardHookUsage, standardProviderUsage } from "./examples";



function App() {
	return (
		<>
			<h1>hold-my-context</h1>
			<p>creating a new context shouldn't feel like a chore</p>
			<p>a single custom hook can define your entire context</p>

			<div className="card">
				<h2>Context Definition</h2>

				<code>standard</code>
				<code />
				<code>hold my context</code>

				<CodeWithHighlights code={standardContextDefinition} />
				<code>{'===>'}</code>
				<CodeWithHighlights code={libContextDefinition} />

				<code />
				<code />
				<code>
					default value is opptional in hold my context -
					passing no default will cause the hook to
					throw when not within a context provider, which sometimes is better than failing silently or defining irrelevant default values.
				</code>

				<code />
				<code />
				<code>
					the library can do this, because the type of the context data is not inferred from the default value, rather the computed value from the hook passed to the context factory
				</code>

				<h2>Provider Usage</h2>

				<code>standard</code>
				<code />
				<code>hold my context</code>

				<CodeWithHighlights code={standardProviderUsage} />
				<code>{'===>'}</code>
				<CodeWithHighlights code={libProviderUsage} />

				<h2>Hook Usage</h2>

				<code>standard</code>
				<code />
				<code>hold my context</code>

				<CodeWithHighlights code={standardHookUsage} />
				<code>{'===>'}</code>
				<CodeWithHighlights code={libHookUsage} />
			</div>
		</>
	);
}

export default App;
