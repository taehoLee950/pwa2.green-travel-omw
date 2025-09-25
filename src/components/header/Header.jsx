import "./Header.css";
import headerImg from "../../assets/header-img.png";
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
  rel="stylesheet"
></link>;

function Header() {
  return (
    <>
      <div className="header-container">
        <div className="header-contents">
          <img src={headerImg} alt="헤더 이미지" className="header-image" />{" "}
          <h1 className="header-header">Green Travel</h1>
        </div>
      </div>
    </>
  );
}

export default Header;
