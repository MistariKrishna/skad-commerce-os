import Header from "./Header";
import Hero from "./Hero";
import BrandStrip from "./BrandStrip";
import Journey from "./Journey";
import HeroMobile from "./mobile/HeroMobile";
import Problem from "./Problem";
import Platform from "./Platform";
import Connects from "./Connects";
import Method from "./Method";
import BuiltOn from "./BuiltOn";
import Solutions from "./Solutions";
import WaysToWork from "./WaysToWork";
import JourneyMobile from "./mobile/JourneyMobile";
import Enquire from "./Enquire";
import Footer from "./Footer";
import SectionScroll from "./SectionScroll";
import ProblemMobile from "./mobile/ProblemMobile";
import PlatformMobile from "./mobile/PlatformMobile";
import ConnectsMobile from "./mobile/ConnectsMobile";
import BuiltOnMobile from "./mobile/BuiltOnMobile";
import SolutionsMobile from "./mobile/SolutionsMobile";
import WaysMobile from "./mobile/WaysMobile";
export default function HomePage({ path = "/" }: { path?: string }) {
  return (
    <>
      <SectionScroll path={path} />
      <Header />
      <main>
       <div className="hidden lg:block"><Hero /></div><div className="lg:hidden"><HeroMobile /></div>
        <BrandStrip />
        <div className="hidden lg:block"><Journey /></div><div className="lg:hidden"><JourneyMobile /></div>
       <div className="hidden lg:block"><Problem /></div><div className="lg:hidden"><ProblemMobile /></div>
        <div className="hidden lg:block"><Platform /></div><div className="lg:hidden"><PlatformMobile /></div>
        <div className="hidden lg:block"><Connects /></div><div className="lg:hidden"><ConnectsMobile /></div>
        <Method />
        <div className="hidden lg:block"><BuiltOn /></div><div className="lg:hidden"><BuiltOnMobile /></div>
        <div className="hidden lg:block"><Solutions /></div><div className="lg:hidden"><SolutionsMobile /></div>
       <div className="hidden lg:block"><WaysToWork /></div><div className="lg:hidden"><WaysMobile /></div>
        <Enquire />
      </main>
      <Footer />
    </>
  );
}