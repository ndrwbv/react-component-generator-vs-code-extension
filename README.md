# Component generator extention for VSCode
## Features
### New React folder
Creates folder structure: 
```
└── ComponentName/
    ├── ComponentName.tsx
    └── ComponentName.styles.ts
```

### Create RTK Slice
```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComponentNameState {
	data: number;
}

const initialState: ComponentNameState = {
	data: 1,
};

export const ComponentNameSlice = createSlice({
	name: `ComponentName`,
	initialState,
	reducers: {
		action: (state, action: PayloadAction<number>) => {
			state.data = action.payload;
		},
	},
});

export const dataSelector = (state: IRootState): number => state.ComponentName.data;

export const { action } = ComponentNameSlice.actions;

```
### Create Single React component
```tsx
import { FC } from 'react';

import { ComponentNameStyled } from './ComponentName.styles';

export const ComponentName: FC = () => <ComponentNameStyled>ComponentName</ComponentNameStyled>;

```
### Create Story
```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { ComponentName } from './ComponentName';

const meta = {
	// eslint-disable-next-line @typescript-eslint/quotes
	tags: ['autodocs'],
	component: ComponentName,
	parameters: {}
} satisfies Meta<typeof ComponentName>;

export default meta;

type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
	args: {},
};

```

## Usage

1. Right click on the file or folder in the file explorer
2. Select one of the options:
    - Create React + Styled component folder
    - Create RTK Slice
    - Create Single React component
    - Create Story
3. Enter a name in the pop up
