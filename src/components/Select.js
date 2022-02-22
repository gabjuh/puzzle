import React from "react";
import { setSelected } from "./helpers";

const Option = props => {
  const {value, label} = props
  return (
    <>
      <option 
        value={value} 
      > 
        {label}
      </option>
    </>
  )
}

export default Select = props => {
  const {options, defaultValue, fn} = props
  return (  
    <>
      <select
        defaultValue={defaultValue}
        onChange={fn}
      >
        {options.map(option => (
          <Option 
            key={option.value}
            value={option.value} 
            label={option.label}
            fn={fn}
          />
        ))}
      </select>
    </>
  )  
}