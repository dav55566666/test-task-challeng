import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';
import { ButtonBgs, ButtonTypesEnum } from "./enums";
import { FontFamilyEnum, FontSizesEnum, FontStyleEnum, FontWeightEnum } from "../Text";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "click": fn(),
    "type": ButtonTypesEnum.DEFAULT,
    value: "",
    label: "",
    bg: ButtonBgs.DARK_BROWN,
    gap: 14,
    textStyles: {
      fontFamily: FontFamilyEnum.INTER,
      fontSize: FontSizesEnum.M,
      fontStyle: FontStyleEnum.NORMAL,
      fontWeight: FontWeightEnum.REGULAR,
      color: '#FFF'
    }
  },
};