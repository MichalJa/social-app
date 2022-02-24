import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Popup.css";
import PropTypes from "prop-types";


const CustomPopup = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0"
      }}
      className="overlay"
    >
      <div className="popup">
        <span className="xSpan" onClick={closeHandler}>
          &times;
        </span>
        <h2>{props.title}</h2>

        <div className="close">{props.children}</div>

        <Link className="linkClass close" to="/SignUp" onClick={closeHandler}>Sign Up</Link>
      </div>
    </div>
  );
};

CustomPopup.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default CustomPopup;

