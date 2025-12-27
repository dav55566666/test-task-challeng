import Link from 'next/link'
import { ILogoProps } from './interfaces'
import { LogoIcon } from '../../svgs'
import { ELogoDirection } from './enums'

const Logo = ({
    direction
}: ILogoProps) => {
    return (
        <Link href={'/'} className='logo'>
            <LogoIcon
                width={direction === ELogoDirection.IN_HEADER ? 54 : 65}
                height={direction === ELogoDirection.IN_HEADER ? 54 : 65}
                color={direction === ELogoDirection.IN_HEADER ? '#141416' : '#FFF'}
            />
            {
                direction === ELogoDirection.IN_FOOTER && 'DiveSea'
            }
        </Link>
    )
}

export default Logo