import { Outlet } from "react-router-dom";
import { AppMenu, Header } from "../../components";
import "./styles/style.scss";

export const HomeWrapper = () => {
  return (
    <div className="app-shell flex min-h-svh w-full flex-1 flex-col">
      <Header />
      <AppMenu />
      <Outlet />
    </div>
  );
};
