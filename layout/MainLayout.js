import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import AppFooter from "./AppFooter";

export default function MainLayout({ children }) {
  const [navbarBg, setNavbarBg] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleScroll = () => {
    let elementBounds = navRef.current;
    if (elementBounds) {
      let { top } = elementBounds.getBoundingClientRect();
      if (top < -70) {
        setNavbarBg(true);
      } else {
        setNavbarBg(false);
      }
    }
  };
  return (
    <>
      <Navbar navbarBg={navbarBg} />
      <div ref={navRef} className="navbar-placeholder"></div>
      {children}
      <AppFooter />
    </>
  );
}
