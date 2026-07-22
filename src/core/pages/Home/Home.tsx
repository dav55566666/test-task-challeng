import {
  HomeLogosAbout,
  Main,
  MainDirections,
  OurProjects,
  Partners,
} from "../../components";
import "./styles/home.scss";

export const Home = () => {
  return (
    <div className="home-page">
      <div className="home-page__hero">
        <Main />
      </div>
      <OurProjects featured />
      <MainDirections />
      <Partners />
      <HomeLogosAbout />
    </div>
  );
};
