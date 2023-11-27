// @ts-nocheck
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface commentsState {
	data: number;
}

const initialState: commentsState = {
	data: 1,
};

export const commentsSlice = createSlice({
	name: `comments`,
	initialState,
	reducers: {
		action: (state, action: PayloadAction<number>) => {
			state.data = action.payload;
		},
	},
});

export const dataSelector = (state: IRootState): number => state.comments.data;

export const { action } = commentsSlice.actions;
