import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";

import { loadSlim } from "@tsparticles/slim"; 
import { Container } from "@tsparticles/engine";
import options from "../assets/particlesConfig";

const HomeView = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container: Container): Promise<void> => {
    console.log(container);
    return;
  };

  return (
    <div className="w-full h-full relative">
      {init && (
        <>
          <Particles
            className="absolute top-0 bottom-0 left-0 right-0"
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
          />
          <div className="landing-title absolute top-[25vh] left-0 right-0 lg:top-[45vh] drop-shadow ">
            <div className="py-10">E-Permit Verification</div>
          </div>
        </>
      )}
      {!init && "initializing"}
    </div>
  );
};
export default HomeView;
