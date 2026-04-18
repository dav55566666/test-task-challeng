import {
  HomeLogosAbout,
  Main,
  MainDirections,
  OurProjects,
  Partners,
  PromptInput,
  SiteFooter,
} from "../../components";
import "./styles/home.scss";

export const Home = () => {
  return (
    <div className="home-page">
      <div className="home-page__hero">
        <Main />
        <div className="home-page__prompt max-w-xs w-full">
          <PromptInput
            placeholder="Что вы хотите узнать?"
            aria-label="Что вы хотите узнать?"
          />
        </div>
      </div>
      <OurProjects limit={3} />
      <MainDirections />
      <Partners />
      <HomeLogosAbout />
      <SiteFooter />
    </div>
  );
};
