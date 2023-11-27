// @ts-nocheck
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
