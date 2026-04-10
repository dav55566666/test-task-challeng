import { Route, Routes } from "react-router-dom";
import { Home, HomeWrapper } from "../../core";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<HomeWrapper />} >
            <Route index element={<Home />} />
        </Route>
    </Routes>
  )
}
