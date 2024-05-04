import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoButton : Story = {
  args: {
    label: 'Info',
    className : 'bg-blue-500 text-blue-200 border-blue-200 hover:border-200',
  },
};

export const WarningButton : Story = {
    args: {
        label: 'Warning',
        className : 'bg-orange-500 text-orange-200 border-orange-200 hover:border-orange-200',
    },
};


export const SuccessButton : Story = {
    args: {
      label: 'Success',
      className : 'bg-green-500 text-green-200 border-green-200 hover:border-green-200',
    },
};

export const ErrorButton : Story = {
    args: {
      label: 'Error',
      className : 'bg-red-500 text-red-200 border-red-200 hover:border-red-200',
    },
};