export const templateForStyledComponent = (name: string) => {
  return `import styled from "styled-components";

	export const ${name}Styled = styled.div\`\``;
};
