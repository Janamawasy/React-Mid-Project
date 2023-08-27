
import React, { useState , useEffect } from 'react'
import axios from 'axios'
import OtherDataComp from './OtherDataComp'
import PostsComp from './PostsComp'
import TodosComp from './TodosComp'
import AddTodoComp from './AddTodoComp'
import AddPostComp from './AddPostComp'

const ChildComp = ({id,name,email,otherdata,onDataUpdate,onDataDelete}) => {
    const urltodos = 'https://jsonplaceholder.typicode.com/todos'
    const urlpost = 'https://jsonplaceholder.typicode.com/posts'
    const [bordercoler,setBordercoler] = useState('')
    const [completed,setCompleted] = useState([])
    const [childname,setChildName] = useState(name)
    const [childemail,setChildEmail] = useState(email)
    const [backgroundcoler,setBackgroundcoler] = useState('')
    const [todoData,setTodoData] = useState([])
    const [postData,setPostData] = useState([])
    const [active, setActive] = useState(false)
    const [addtodo,setAddtodo] = useState(false)
    const [addpost,setAddpost] = useState(false)

    useEffect(()=>{
        const fetchData = async()=>{
        const {data :todosdata} = await axios.get(`${urltodos}?userId=${id}`)
        setTodoData(todosdata.map((todo)=>({idtask:todo.id ,title :todo.title, completed : todo.completed})))
        const {data :postsdata} = await axios.get(`${urlpost}?userId=${id}`)
        setPostData(postsdata.map((post)=>({idtask:post.id ,title :post.title, body : post.body})))
        };
        fetchData()
    },[])

        
    useEffect(()=>{
        const completedcolor =()=>{
            if (todoData.some((todo) => !todo.completed)){
                setBordercoler('red')
            }else{
                setBordercoler('green')
            }
        };completedcolor()
    },[id,todoData])

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleDataChange = (childname,childemail) => {
        onDataUpdate(id,childname,childemail);
      };

    const handleDelete =() => {
        onDataDelete(id);
      }

    const handleClick =()=>{
        setActive(true)
        setBackgroundcoler('orange')
    }
    
    
      
    const handletodoData = (e) => {
        setTodoData(todoData.map((todo)=>{
            if (todo.idtask === e) {
                return { ...todo, completed: true };
              } else {
                return todo;
              }
        }
       ))
    };

    const handleTodoAdding = (e)=>{
        setTodoData([...todoData,{idtask:0,title:e,completed:false}])
        console.log(todoData)
    }

    const handleTodoCancel = (e)=>{
        setAddtodo(e)
        console.log('in handleCancel')
    }
      
    const handlePostCancel = (e)=>{
        setAddpost(e)
    }

    const handlePostAdding = (title,body)=>{
        setPostData([...postData,{title:title,body:body}])
    }

    const handledoubleclick = ()=>{
        setActive(false)
        setBackgroundcoler('')
    }

  return (
    <div style={{border : `5px solid ${bordercoler}`,width:'400px',backgroundColor:backgroundcoler,textAlign:'left'}}>        
        <br/>
        <label onClick={handleClick} onDoubleClick={() => handledoubleclick()}>ID: {id} </label> <br/>
        Name : <input type="text" value={childname} onChange={(e)=>setChildName(e.target.value)}/>  <br/>
        Email : <input type="text" value={childemail} onChange={(e)=>setChildEmail(e.target.value)}/> <br/>
        <button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Other Data</button>
        <button onClick={handleDataChange}>Update</button>
        <button onClick={handleDelete}>Delete</button>
        <span style={{position: 'relative',marginLeft:'410px',float:'left'}}>
        {isHovering && <OtherDataComp street={otherdata.street} city={otherdata.city} zipcode={otherdata.zipcode}/>}
        {active && (
            <div style={{position:'absolute', flexDirection: 'row',width:'300px',...(active && {border: '1px solid black'})}}>
            Todos - User {id}
            <button onClick={()=>setAddtodo(true)}>Add</button>  
            {addtodo ? (
                <AddTodoComp onAddTodo={(e)=>handleTodoAdding(e)} onCancel={handleTodoCancel}/>
            ) : (      
            active && todoData.map((todo)=> 
               <TodosComp key={todo.idtask} todo={todo} active={active} onCompleted={handletodoData}/> 
            ))}
            <br/><br/> Posts - User {id} 
            <button onClick={()=>setAddpost(true)}>Add</button>
            {addpost ? (
                <AddPostComp onAddPost={(title,body)=>handlePostAdding(title,body)} onPostCancel={handlePostCancel}/>
            ):(
            active && postData.map((post)=>
               <PostsComp key={post.idtask} post={post} active={active} /> 
            ))}

        </div>
        )}
        </span>

        

    </div>
  )
}

export default ChildComp