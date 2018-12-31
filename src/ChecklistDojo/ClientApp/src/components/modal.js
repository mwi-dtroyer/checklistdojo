import React from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.el = document.createElement("div");
  }

  componentDidMount() {
    document.getElementById("modal").appendChild(this.el);
  }

  componentWillUnmount() {
    document.getElementById("modal").removeChild(this.el);
  }
  render() {
    return createPortal(this.props.children, this.el);
  }
}

export default Modal;
