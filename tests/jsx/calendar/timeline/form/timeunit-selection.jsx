import React from 'react'

export default (props) => {
  return (
    <select onChange={props.handleChange} value={props.selected}>
      {
        props.options.map((item, i) => <option key={i} value={item}>{item}</option>)
      }
    </select>
  )
}
