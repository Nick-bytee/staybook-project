import React from 'react'

type Props = {label : string, placeholder : string, type : string, value : string|number, onChangeEvent : any, name:string, disabled : boolean}

export default function FormInput({label, placeholder, type, name, onChangeEvent, value, disabled}: Props) {
  return (
    <>
    {disabled ? (
      <div className='d-flex flex-col mr-5 mt-3'>
        <label htmlFor="hotelname">{label}</label>
        <input id="hotelname" name={name} value={value} onChange={onChangeEvent} type={type} placeholder={placeholder} disabled required></input>
    </div>
    ) : (
      <div className='d-flex flex-col mr-5 mt-3'>
      <label htmlFor="hotelname">{label}</label>
      <input id="hotelname" name={name} value={value} onChange={onChangeEvent} type={type} placeholder={placeholder} required></input>
  </div>
    )}
    </>
  )
}