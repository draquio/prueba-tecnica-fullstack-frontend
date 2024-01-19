import React from 'react'
import "./Nodata.scss"
const Nodata = (props) => {
    const {title} = props;
  return (
    <div className='nodata'>
      No hay <strong>{title}</strong> para mostrar
    </div>
  )
}

export default Nodata
