import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./photos/logo.png";



export default function Navbar() {

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();


    const [user, setUser] = useState([]);
    const [search, setSearch] = useState("");
    const [res, setRes] = useState([]);

    useEffect(() => {
        axios.get("https://toddle-server.vercel.app/api/username").then((response) => {


            setUser(response.data);
            console.log(response.data);

        });
    }, []);


    useEffect(() => {
        axios.get(`https://toddle-server.vercel.app/api/search/?search=${search}`).then((response) => {

            setRes(response.data);


        });
    }, [search]);




    const log = () => {

        axios.post("https://toddle-server.vercel.app/api/logout").then((response) => {
            if (response.data) {
                alert(response.data);
            }

            navigate("/");

        })

    }

    return (
        <>

            <nav class="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
                <div class="container-fluid">
                    
                    <div class="navbar-brand" ></div>
                    <a class="navbar-brand" href="#">Welcome, {user}</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarScroll">
                        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to={"/home"}>Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to={"/signup"}>Sign Up</Link>
                            </li>
                            <li class="nav-item">

                                <button  onClick={log} id="logout"  class="nav-link" >Log Out</button>
                            </li>
                            <li class="nav-item">

                                <Link type="button" class="nav-link" to={"/orders"}>Orders</Link>
                            </li>
                            <li class="nav-item">

                                <Link type="button" class="nav-link" to={"/cart"}>Cart</Link>
                            </li>
                            <li class="nav-item">

                                <Link type="button" class="nav-link" to={"/contact"}>Contact</Link>
                            </li>

                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => {
                                setSearch(e.target.value) />

                        </form>
                            {search.trim() !== '' && Array.isArray(res) && res.length > 0 ? (
                            res.map((item) => (
                                <div key={item.id}>
                                    {item.prod_name}
                                </div>
                            ))
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            </nav>






        </>
    )
}
