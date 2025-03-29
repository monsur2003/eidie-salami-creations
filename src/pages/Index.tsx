
import EidSalamiGenerator from "@/components/EidSalamiGenerator";

const Index = () => {
  return (
    <div className="min-h-screen pb-12 relative overflow-hidden">
      {/* Full page background gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-moving animate-gradient-movement opacity-30"></div>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 grid-pattern opacity-50"></div>
      
      <EidSalamiGenerator />
    </div>
  );
};

export default Index;
