// @ts-nocheck
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
