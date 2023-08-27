import React, { useState , useEffect } from 'react'
import axios from 'axios'

const TodosComp = ({todo,active,onCompleted}) => {
    const [clicked,setclicked]=useState(false)
    useEffect(()=>{
        if (clicked==true){
            todo.completed = true
            console.log(todo)
            onCompleted(todo.idtask)
        }
    },[clicked])


    if (active===true){
        return(
            <div style={{border : `2px solid purple`,textAlign:'left',float:'left',width:'300px'}}>
                Title: {todo.title}<br/>
                Completed:{todo.completed? 'True':!todo.completed &&clicked?'True':'False'}
                {todo.completed===false && !clicked?<button onClick={()=>setclicked(true)}>Mark Completed</button>: null}
            </div>
    )}
    
        
}

export default TodosComp
