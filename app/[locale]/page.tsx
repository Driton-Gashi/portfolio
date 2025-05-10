"use client";

import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { navItems } from "@/data";
// import Clients from "@/components/Clients";
// import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import GoTopBtn from "@/components/GoTopBtn";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { useState } from "react";

const Home = () => {
  const [hasUsedNavbar, setHasUsedNavbar] = useState<boolean>(false);
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav setHasUsedNavbar={setHasUsedNavbar} navItems={navItems} />
        <Hero hasUsedNavbar={hasUsedNavbar} />
        <Grid />
        <RecentProjects />
        {/* <Clients /> */}
        <Experience />
        {/* <Approach /> */}
        <Footer />
        <GoTopBtn />
      </div>
    </main>
  );
};

export default Home;
