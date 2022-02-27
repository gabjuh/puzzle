import React from "react";

export default Button = props => (
  <button type="button" className="button" onClick={props.fn}>{props.text}</button>
)