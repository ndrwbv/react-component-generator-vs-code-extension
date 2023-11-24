export const templateForReactComponent = (name: string) => {
  return `import React, { FC } from "react"
	import { ${name}Styled } from './${name}.styles'
	
	export const ${name}: FC = () => {
		return (
			<${name}Styled>
				${name}
			</${name}Styled>
		)
	}`;
};
