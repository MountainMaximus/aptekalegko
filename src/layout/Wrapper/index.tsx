import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components";
import { Preloader } from "../Preloader";

export const Wrapper: React.FC = () => {
  const [isLoad, setIsLoad] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }, []);
  return (
    <div className="page__wrapper">
      {isLoad && <Preloader mask={true} />}
      <Header />
      <div className="page__container">
        <div className="page__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
