import Link from "next/link"
import { ICustomLinkProps } from "./interfaces"

const CustomLink = ({
    href,
    theme,
    value
}: ICustomLinkProps) => {
    return (
        <Link href={href} className={`link ${theme}`}>
            {value}
        </Link>
    )
}

export default CustomLink