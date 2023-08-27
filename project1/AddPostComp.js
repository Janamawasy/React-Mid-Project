import React, { useEffect, useState } from 'react'

const AddPostComp = ({onAddPost,onPostCancel}) => {
    const [newtitle,setNewtitle] = useState('')
    const [newbody,setNewbody] = useState('')
  

    const handleAdd =()=>{
        onAddPost(newtitle,newbody);
    }
    const handleCancel = ()=>{
        onPostCancel(false)
    }
  return (
    <div>
        Title: <input onChange={(e)=>setNewtitle(e.target.value)}/>
        <br/>
        Body: <input onChange={(e)=>setNewbody(e.target.value)}/>
        <br/>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default AddPostComp
