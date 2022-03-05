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
      console.log("bottom ", bottom);
      if (bottom < -50) {
        setStickyNav(true);
      } else {
        setStickyNav(false);
      }
    }
  };
  const { pathname } = useRouter();
  const commonStyles = {
    nav: "navbar navbar-light navbar-expand-lg fixed-top flex-nowrap z-to-150 shadow-sm transition-2s",
    menu: "navbar-toggler border-2 outline-none no-shadow-btn p-1",
  };
  return (
    <>
      <nav
        ref={navRef}
        className="navbar navbar-expand-lg h-104 w-100 border-bottom border-gray-300"
      >
        <NavbarLinks />
      </nav>
      <nav
        className="navbar navbar-expand-lg h-104 w-100 bg-light position-fixed start-0"
        style={{
          top: stickyNav ? "0" : "-105px",
          left: stickyNav ? "0" : "-2px",
          transition: stickyNav ? "top .4s ease-out" : "none",
        }}
      >
        <NavbarLinks />
      </nav>
      <div className="position-fixed start-0 top-0 w-100 h-90-vh z-1">
        <div className="position-relative w-100 h-100 cover-img-bottom">
          <Image src="/bg-img.jpeg" layout="fill" alt="Kodishamlango.com" />
          <div className="position-absolute start-0 top-0 w-100 h-100 hero-bg"></div>
        </div>
      </div>
    </>
  );
}

const navbarLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Rent",
    url: "/houses-for-rent",
  },
  {
    name: "Buy",
    url: "/houses-for-sell",
  },
  {
    name: "Short stay",
    url: "/short-stay",
  },
];
