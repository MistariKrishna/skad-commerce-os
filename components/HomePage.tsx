import Header from "./Header";
import Hero from "./Hero";
import BrandStrip from "./BrandStrip";
import Journey from "./Journey";
import Problem from "./Problem";
import Platform from "./Platform";
import Connects from "./Connects";
import Method from "./Method";
import BuiltOn from "./BuiltOn";
import Solutions from "./Solutions";
import WaysToWork from "./WaysToWork";
import Enquire from "./Enquire";
import Footer from "./Footer";
import SectionScroll from "./SectionScroll";

export default function HomePage({ path = "/" }: { path?: string }) {
  return (
    <>
      <SectionScroll path={path} />
      <Header />
      <main>
        <Hero />
        <BrandStrip />
        <Journey />
        <Problem />
        <Platform />
        <Connects />
        <Method />
        <BuiltOn />
        <Solutions />
        <WaysToWork />
        <Enquire />
      </main>
      <Footer />
    </>
  );
}