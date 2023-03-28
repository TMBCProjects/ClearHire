import React, { useEffect } from 'react'

export default function InputField(props) {
    const [value, setValue] = useState("")
    useEffect(()=>{
        setValue(props.value)
    }, [])

    onChange
  return (
      <div className="form-group">
          <label className="control-label">{props.label}</label>
          <div className="input">
              <input type={props.type} className="form-control" name="email" value={value} placeholder={props.placeholder} />
          </div>
      </div>
  )
}
