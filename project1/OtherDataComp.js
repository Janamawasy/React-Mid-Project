import React from 'react'

const OtherDataComp = ({street,city,zipcode}) => {
  return (
    <div style={{border : `2px solid gray`,width:'400px',  justifyContent:'center', alignItems:'center'} }>
        Street : <input type="text" value={street}/>  <br/>
        City : <input type="text" value={city}/> <br/>
        Zip Code : <input type="text" value={zipcode}/>  <br/>
    </div>
  )
}

export default OtherDataComp
