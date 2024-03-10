import React from 'react'

export default function Alert(props) {
  return (
    <div className='alertContainer container'>
      <div className="d-flex align-items-center alertbox">
        {/* {props.alert} */}
        <i className="fa-solid fa-circle-check" style={{ color: "#198754", fontSize: '28px' }}></i>
        <p style={{ marginTop: '16px', marginLeft: '5px', fontSize: '18px' }}>{props.alert}</p>
        <div className="timer"></div>
      </div>
    </div>
  )
}
