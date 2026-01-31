import { Home, type ISideBarProps } from "../../components"

export const HomePage = ({
  setIsActiveSideBar,
  isActiveSideBar
}: ISideBarProps) => {
  return (
    <>
        <Home {...{isActiveSideBar, setIsActiveSideBar}} />
    </>
  )
}
