import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
import ChildComp from './ChildComp'
import AddUserComp from './AddUserComp'

const ParentComp = () => {
    const urlusers = 'https://jsonplaceholder.typicode.com/users'

    const [users,setUsers] = useState([])
    const [searched,setSearched] =useState('')
    const [searchedusers,setSearchedusers] =useState([])
    const [newuser,setnewuser] = useState(false)

    useEffect(()=>{
        const fetchData = async()=>{
            const {data :usersdata} = await axios.get(`${urlusers}`)
            setUsers(usersdata.map((user)=>({id:user.id,name:user.name,email:user.email,otherdata:{street:user.address.street, city:user.address.city ,zipcode:user.address.zipcode}})))
            console.log(users.otherdata)
        };fetchData()
    },[])

    useEffect(()=>{
        const searchedData = ()=>{
            const matchingUsers =  users.filter((user) =>
                user.name.toLowerCase().includes(searched.toLowerCase()) || user.email.toLowerCase().includes(searched.toLowerCase())
            );
            setSearchedusers(matchingUsers);
        };searchedData()
    },[searched,users])

    const handleDataUpdate = (newData) => {
        setUsers(users.map((user) => {
            if (user.id === newData.id) {
                return { ...user, name: newData.name,email : newData.email};
            }else{
                return user
            }}))};

    const handleDataDelete = (e) => {
        setUsers(users.filter((user)=>user.id !== e))
        console.log(e)
    }

    const handleAddUser = (name,email) => {
        const newuserID = users.length + 1
        setUsers([...users,{id:newuserID,name:name,email:email,otherdata:{}}])
    }

    const handleCancelUser = (e) => {
        setnewuser(e)
    }

  return (
    <div>
        Search <input type='text' onChange={(e)=>setSearched(e.target.value)}/>
        <button onClick={()=>setnewuser(true)}>Add</button><br/><br/>
        {newuser? (
            <AddUserComp onAddUser={(name,email)=>handleAddUser(name,email)} onCancelUser={handleCancelUser}/>
        ):(null)}
        {searched.length === 0 && searchedusers.length === 0 ? (
      users.map((user) => (
        <ChildComp key={user.id} id={user.id} name={user.name} email={user.email} otherdata={user.otherdata} onDataUpdate={handleDataUpdate} onDataDelete={(e)=>handleDataDelete(e)}/>
      ))
    ) : (
      searchedusers.map((user) => (
        <ChildComp key={user.id} id={user.id} name={user.name} email={user.email} otherdata={user.otherdata} onDataUpdate={handleDataUpdate} onDataDelete={(e)=>handleDataDelete(e)}/>
      ))
    )}      
    </div>
  )
}
export default ParentComp


