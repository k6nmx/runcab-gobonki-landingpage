
import dynamic from "next/dynamic";
import React from "react";


const HeaderClient = dynamic(() => import("../header/HeaderClient"),);

export default function Header() {

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <HeaderClient />
    </header>
  );
}
