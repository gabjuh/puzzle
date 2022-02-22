import React from "react";

export default Button = props => (
  <button type="button" onClick={props.fn}>{props.text}</button>
)