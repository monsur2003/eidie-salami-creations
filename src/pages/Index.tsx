
import { Helmet } from "react-helmet";
import EidSalamiGenerator from "@/components/EidSalamiGenerator";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>EID Salami QR Generator</title>
        <meta name="description" content="Create your own Eid Salami QR card - সালামি দেন, সহজায় স্ক্যান" />
      </Helmet>
      <div className="min-h-screen pb-12 relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 -z-10 grid-pattern opacity-50"></div>
        
        <EidSalamiGenerator />
      </div>
    </>
  );
};

export default Index;
