import { AiFillGithub } from "react-icons/ai";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <a href="https://github.com/ashychiu/" target="_blank" rel="noreferrer">
        <span>Created by Ashley Chiu © 2022</span>
        <AiFillGithub size={20} className="footer__icon" />
      </a>
    </footer>
  );
};

export default Footer;
