import React from "react";

export default Checkbox = (props) => (
  <>
    <label >
      <input 
        type="checkbox" 
        checked={props.showNumbers}
        onChange={props.handleChange}
      />
      {props.label}
      </label>
  </>
)