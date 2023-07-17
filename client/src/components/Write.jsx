import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import Navbar from "./Navbar";



export default function Write() {

  axios.defaults.withCredentials = true;

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [name, setName] = useState("")
  const [date, setDate] = useState("")



  const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get("https://blog-project-server-phi.vercel.app/api/username").then((response) => {


            setUser(response.data);
            console.log(response.data);

        });
    }, []);

  

  
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setDate(formattedDate);
  }, []);





  const submitForm = (event) => {

    event.preventDefault();


    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('name', name);
    formData.append('date', date);



    axios.post("https://blog-project-server-phi.vercel.app/api/blog", formData).then(() => {
      alert('success for insert')
    })

  }



  return (
    <>

      <Navbar />

      <br />

      <div class="typewriter">
        <div class="slide"><i></i></div>
        <div class="paper"></div>
        <div class="keyboard"></div>
      </div>

      

      <div> {date} </div>


      <form class="formw">
        <p class="title">Publish</p>
        <p class="message">What are your thoughts Today</p>


        <label >
          <input required="" placeholder="Title" type="text" class="input" onChange={(e) => {
            setTitle(e.target.value)
          }} />
          <span></span>
        </label>

        <label>
          <input id="here" required="" placeholder="Write here" type="text" class="input" onChange={(e) => {
            setBody(e.target.value)
            setName(user)
          }} />
          <span></span>
        </label>
        
        <button class="submit" onClick={submitForm}>Submit</button>
        <p class="signin">Already have an acount ? <a href="#">Signin</a> </p>
      </form>

    </>
  )

}
