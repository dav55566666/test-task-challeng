import { ISvgSizeColorProps } from "../../common"

const FacebookIcon = ({
    width,
    height,
    color
}: ISvgSizeColorProps) => {
    return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M16.6296 12H13.6138V22H9.1164V13.6361V12H7V8.47059H9.1164V6.16667C9.1164 4.54902 9.96297 2 13.6138 2H16.9471V5.43137H14.5661C14.1958 5.43137 13.6138 5.62745 13.6138 6.41177V8.47059H17L16.6296 12Z" fill={color || "#535353"} />
        </svg>
    )
}

export default FacebookIcon