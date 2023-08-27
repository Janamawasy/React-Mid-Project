import {useState} from 'react'

const AddUserComp = ({onAddUser,onCancelUser}) => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const handleAddUser = ()=>{
        onAddUser(name,email)
    }
    const handleCanceling = ()=>{
        onCancelUser(false)
    }

    return (
    <div style={{border:`3px solid black`,width:'400px'}}>
        Name : <input onChange={(e)=>setname(e.target.value)}/><br/>
        Email : <input onChange={(e)=>setemail(e.target.value)}/><br/><br/>
        <button onClick={handleAddUser}>Add</button>
        <button onClick={handleCanceling}>Cancel</button>
        
    </div>
  )
}

export default AddUserComp
