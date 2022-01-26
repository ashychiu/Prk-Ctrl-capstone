import React from "react";
import MediaQuery from "react-responsive";
import logo from "../../assets/logo/logo-horizontal-center.png";
import "./HomePage.scss";
import Login from "../../components/Login/Login";
import MobileLogin from "../../components/MobileLogin/MobileLogin";
import homepageHero from "../../assets/images/homepage-hero-crop.png";

const HomePage = () => {
  return (
    <main className="homepage">
      <div className="homepage__container">
        <h1 className="homepage__heading">Welcome!</h1>
        <img className="homepage__logo" src={logo} alt="Prk Ctrl Logo" />
        <img
          className="homepage__image"
          src={homepageHero}
          alt="Prk Ctrl hero"
        />
      </div>
      <div className="homepage__login">
        <MediaQuery minWidth={768}>
          <Login />
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <MobileLogin />
        </MediaQuery>
      </div>
    </main>
  );
};

export default HomePage;
