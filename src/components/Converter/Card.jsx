import { useState } from "react";
import CurrencyHeader from "./CurrencyHeader";
import CurrencyDashBoard from "./Currency/CurrencyDashBoard";
import ChartDashBoard from "./Chart/ChartDashBoard";

export default function Card() {
  const [activeSection, setActiveSection] = useState(0)

  function handleSectionChange(section) {
    setActiveSection(section)
  }

  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className={`bg-gradient-to-r ${activeSection ? 'from-slate-200 to-slate-400' : 'from-slate-400 to-slate-200'} rounded-lg mx-auto md:w-3/4 w-4/5 text-white`}>
            <CurrencyHeader 
              handleSectionChange={handleSectionChange}
              activeSection={activeSection}
            />
            <div className="container p-7">
              {
                activeSection === 0 ?
                  <CurrencyDashBoard />
                :
                  <ChartDashBoard />
              }
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
