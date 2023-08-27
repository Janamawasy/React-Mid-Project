
import React, { useState } from 'react'

const AddTodoComp = ({onAddTodo,onCancel}) => {
    const [newtitle,setnewtitle] = useState('')
    const handleAddTodo = ()=>{
        onAddTodo(newtitle)
        console.log(newtitle)
    }
    const handleCancelTodo =()=>{
        onCancel(false)
    }
  return (
    <div>
        Title : <input onChange={(e)=>setnewtitle(e.target.value)}/>
        <br/><br/>
        <button onClick={handleCancelTodo}>Cancel</button>
        <button onClick={handleAddTodo}>Add</button>
    </div>
  )
}

export default AddTodoComp
