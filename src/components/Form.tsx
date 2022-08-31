import React from 'react'
import IFormData from '../types/formData'

interface IProps {
    handleSubmit: any
    handleChange: any
    formData: IFormData
}

const Form = (props: IProps) => {
  return (
      <form onSubmit={props.handleSubmit}>
          <input
              type="text"
              value={props.formData.name}
              onChange={props.handleChange}
              name="name"
              placeholder="Name"
              autoFocus
          />
          <select name="alive" value={props.formData.alive} onChange={props.handleChange}>
              <option value="">-- Select status --</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
          </select>
          <button>Search</button>
      </form>
  )
}

export default Form