import { Route, Routes } from "react-router-dom"
import { ContactsPage, Footer, Header, HomePage, ReviewsPage, ServicesDetailPage, SideBar } from "../core"

export const Navigation = () => {
  return (
    <>
      <SideBar />
      <Header />
      <main className="page">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/services/:slug" element={<ServicesDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
