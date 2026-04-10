import { BrowserRouter } from "react-router-dom"
import type { IAppProvidersProps } from "./interfaces"

export const AppProviders = ({children}: IAppProvidersProps) => {
  return (
    <>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </>
  )
}
