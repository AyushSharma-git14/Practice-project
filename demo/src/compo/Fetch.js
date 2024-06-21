import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

function Fetch() {
    const[data,setData]=useState([])
    const getdata=()=>{
        fetch("http://localhost:5000/fetch")
        .then(res =>res.json())
        .then((json)=>{
            //console.log(json)
            setData(json)
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        getdata()
    },[])

    
    const deleted=async(id)=>{
        let d= await fetch('http://localhost:5000/delete/'+id, {
             method: 'DELETE',
         });
         if(d){
             getdata()
         }
    }
  return (
    <>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Address</th>
      <th scope="col">Mobile</th>
      <th scope="col">Date</th>
      <th scope="col">action</th>
    </tr>
  </thead>
  <tbody>
    {
        data.map((v,i)=>
        <tr key={i}>
      <th scope="row">{i+1}</th>
      <td>{v.name}</td>
      <td>{v.email}</td>
      <td>{v.address}</td>
      <td>{v.mobile}</td>
      <td>{v.date.slice(0,10)}</td>
      <td>
        <button className='btn btn-danger' onClick={()=>deleted(v._id)}>Delete</button>
        <Link to={`/update/${v._id}`}><button className='btn btn-warning'>Update</button></Link>
      </td>
    </tr>
        )
    }
  </tbody>
</table>
    
    </>
  )
}

export default Fetch
