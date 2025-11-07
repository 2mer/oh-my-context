import { highlight } from "./components/CodeHighlightTest";

const parts = {
	name: { color: "gray", tooltip: "context name", text: "PointContext" },
	defaultValue: {
		color: "orange",
		tooltip: "default value",
		text: "{ value: { x: 0, y: 0 }, setValue: () => {} }",
	},
	providerComponentProps: {
		color: "green",
		tooltip: "provider component props",
		text: "{ initialValue, children }",
	},
	providerComponentPropsInline: {
		color: "green",
		tooltip: "provider component props",
		text: "initialValue={{ x: 2, y: 3 }}",
	},
	hookContent: {
		color: "red",
		tooltip: "hook content",
		text: "const [value, setValue] = useState(initialValue);",
	},
	providerValue: {
		color: "blue",
		tooltip: "provider value",
		text: "{ value, setValue }",
	},
};

export const standardContextDefinition = highlight`\
import { createContext, useState, useContext } from 'react';

const ${parts.name} = createContext(
	${parts.defaultValue}
);

function use${parts.name}() {
	return useContext(${parts.name});
}

const ${parts.name}Provider = (${parts.providerComponentProps}) => {
	${parts.hookContent}

	return (
		<${parts.name}.Provider value={${parts.providerValue}}>
			{children}
		</${parts.name}.Provider>
	);
}\
`;

export const libContextDefinition = highlight`\
import { useState, useContext } from 'react';
import { createContext } from 'hold-my-context';

const DEFAULT = ${parts.defaultValue};

const ${parts.name} = createContext(
	(${parts.providerComponentProps}) => {
		${parts.hookContent}

		return ${parts.providerValue};
	},
	DEFAULT,
);`;

export const standardProviderUsage = highlight`\
<${parts.name}Provider ${parts.providerComponentPropsInline}>
	{/* ... */}
</${parts.name}Provider>\
`;

export const libProviderUsage = highlight`\
<${parts.name}.Provider ${parts.providerComponentPropsInline}>
	{/* ... */}
</${parts.name}.Provider>\
`;

export const standardHookUsage = highlight`\
const { value, setValue } = use${parts.name}()\
`;

export const libHookUsage = highlight`\
const { value, setValue } = ${parts.name}.use()\
`;
