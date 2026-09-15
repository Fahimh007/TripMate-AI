import { MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="site-footer">
      <span className="footer-brand">TRIPMATE AI</span>
      <span className="footer-tagline">Travel planning, with a point of view.</span>
      <span className="footer-location">
        <MapPin size={13} aria-hidden="true" />
        Made for the next departure
      </span>
    </footer>
  );
};

export default Footer;
