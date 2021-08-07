import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="Header">
      <a
        href="https://media.wizards.com/2021/downloads/MagicCompRules%2020210712.pdf"
        target="_blank"
        rel="noreferrer"
        className="Header-rulebook"
      >
        CONSULT THE RULEBOOK
      </a>
      <img
        className="img-fluid mx-auto d-block"
        src="https://www.cruiseplanners.com/static/imago/5556/magic_banner-1000x2821.jpg"
        alt="magic the gathering"
      />
    </header>
  );
}

export default Header;
