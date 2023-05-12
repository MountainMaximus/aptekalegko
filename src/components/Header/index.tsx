import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">PharmacyPost</div>
        <div className="header__right">
          <Link className="header__link" to="/">
            Главная
          </Link>
          <Link className="header__link" to="/favorite">
            Избранное
          </Link>
        </div>
      </div>
    </header>
  );
};
