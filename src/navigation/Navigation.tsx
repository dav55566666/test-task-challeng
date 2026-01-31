import { Route, Routes } from "react-router-dom"
import { ContactsPage, Footer, Header, HomePage, ReviewsPage, ServicesDetailPage, SideBar } from "../core"
import { useState } from "react"

export const Navigation = () => {
  const [isActiveSideBar, setIsActiveSideBar] = useState<boolean>(false)
  return (
    <>
      <SideBar {...{isActiveSideBar, setIsActiveSideBar}} />
      <Header />
      <main className="page">
        <Routes>
          <Route index element={<HomePage {...{isActiveSideBar, setIsActiveSideBar}} />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/services/:slug" element={<ServicesDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
