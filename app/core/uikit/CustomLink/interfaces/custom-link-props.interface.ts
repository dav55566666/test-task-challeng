import { ETheme } from "@/app/core/common";
import type { UrlObject } from 'url';

export interface ICustomLinkProps {
    theme: ETheme;
    value: string;
    href: string | UrlObject;
}