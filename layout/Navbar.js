import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import Logo from "../components/Logo";
import Image from "next/image";
import NavbarLinks from "./NavbarLinks";

export default function Navbar(props) {
  const [stickyNav, setStickyNav] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleScroll = () => {
    let elementBounds = navRef.current;
    if (elementBounds) {
      let { bottom } = elementBounds.getBoundingClientRect();

      if (bottom < -50) {
        setStickyNav(true);
      } else {
        setStickyNav(false);
      }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="navbar navbar-expand-lg h-104 w-100 border-bottom border-gray-300 z-to-1000"
      >
        <NavbarLinks />
      </nav>
      <nav
        className="navbar navbar-expand-lg h-104 w-100 bg-light position-fixed start-0 z-to-1000"
        style={{
          top: stickyNav ? "0" : "-105px",
          left: stickyNav ? "0" : "-2px",
          transition: stickyNav ? "top .4s ease-out" : "none",
        }}
      >
        <NavbarLinks />
      </nav>
    </>
  );
}
