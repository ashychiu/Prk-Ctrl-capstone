import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MediaQuery from "react-responsive";
import logo from "../../assets/logo/logo-horizontal-center.png";
import "./HomePage.scss";
import Login from "../../components/Login/Login";
import MobileLogin from "../../components/MobileLogin/MobileLogin";
import HomeModal from "../../components/HomeModal/HomeModal";
import homepageHero from "../../assets/images/homepage-hero-crop.png";

const HomePage = () => {
  const [showModal, setShowModal] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleAdmin = () => {
    window.open(`/admin`, "_blank");
  };

  const onCloseHandler = () => {
    setShowModal(false);
  };

  const handleLogin = () => {
    setUsername("prkctrl.app@gmail.com");
    setPassword("ashley");
    setShowModal(false);
  };
  useEffect(() => {
    document.title = "PRK CTRL - Visitor Parking Made Easy";
  }, []);
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
          <Login username={username} password={password} />
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <MobileLogin username={username} password={password} />
        </MediaQuery>
      </div>
      <HomeModal
        show={showModal}
        onCloseHandler={onCloseHandler}
        handleLogin={handleLogin}
        handleAdmin={handleAdmin}
      />
    </main>
  );
};

export default HomePage;
