import SiteNav from "../../components/SiteNav";
import Footer from "../../components/Footer";
import CaseHero from "../../components/case/CaseHero";
import DeviceStrip from "../../components/case/DeviceStrip";
import DecisionDiagram from "../../components/case/DecisionDiagram";
import StatusColumns from "../../components/case/StatusColumns";
import CaseProblem from "../../components/case/CaseProblem";
import CaseStack from "../../components/case/CaseStack";
import CaseCta from "../../components/case/CaseCta";

export const metadata = {
  title: "Hajime — Hoàng Bảo Phúc",
  description: "Case study: dạy tiếng Nhật cho người Việt từ con số 0.",
};

export default function HajimePage() {
  return (
    <>
      <SiteNav home={false} />
      <main>
        <CaseHero />
        <DeviceStrip />
        <CaseProblem />
        <DecisionDiagram />
        <CaseStack />
        <StatusColumns />
        <CaseCta />
      </main>
      <Footer />
    </>
  );
}
