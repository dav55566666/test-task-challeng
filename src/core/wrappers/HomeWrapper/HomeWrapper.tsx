import { Outlet } from "react-router-dom";
import { AppMenu } from "../../components";

export const HomeWrapper = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-hidden">
      <AppMenu />
      <Outlet />
    </div>
  );
};
