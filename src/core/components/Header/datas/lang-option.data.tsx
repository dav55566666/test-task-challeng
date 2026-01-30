import { EnFlagIcon, RuFlagIcon } from "../../../assets";
import type { IOption } from "../../../uikit";

export const langOptionsData: Array<IOption> = [
    {
        label: 'Русский',
        value: 0,
        Icon: <RuFlagIcon />,
        isSelected: true
    },
    {
        label: 'English',
        value: 1,
        Icon: <EnFlagIcon />,
        isSelected: false
    },
]