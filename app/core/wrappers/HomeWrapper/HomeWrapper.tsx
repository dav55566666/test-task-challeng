import { Footer, Header } from "../../components"
import { IHomeWrapperProps } from "./interfaces"

const HomeWrapper = ({children}: IHomeWrapperProps) => {
  return (
    <div className='wrapper'>
        <Header />
        <main className="page">{children}</main>
        <Footer />
    </div>
  )
}

export default HomeWrapper