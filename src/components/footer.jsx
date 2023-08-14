import "../css/footer.css";

function Footer() {
  return (
    <div className="footer-main">
      <h4>Blogim!</h4>
      <p>&#169; Copyright {new Date().getFullYear()} All Rights Reserved</p>
    </div>
  );
}

export default Footer;
