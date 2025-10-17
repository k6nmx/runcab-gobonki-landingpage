"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

const IsScrolledContext = createContext<boolean>(false);

export const IsScrolledProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 0.1;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll(); // Check on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <IsScrolledContext.Provider value={isScrolled}>
      {children}
    </IsScrolledContext.Provider>
  );
};

export const useIsScrolled = () => {
  const context = useContext(IsScrolledContext);
  if (context === undefined) {
    throw new Error("useIsScrolled must be used within an IsScrolledProvider");
  }
  return context;
};
