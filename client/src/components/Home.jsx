import React from "react";

import pic1 from "./photos/pic1.jpg"
import pic2 from "./photos/pic2.png"

import necklace from "./photos/necklace.jpg"
import hand from "./photos/jewel.jpg"
import earings from "./photos/earings.jpg"
import logo from "./photos/logo.png"
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState, useEffect } from "react";


export default function Home() {

    axios.defaults.withCredentials = true;


    useEffect(() => {

        axios.get("https://toddle-server.vercel.app/api/login").then((response) => {
            console.log(response);
        })

    }, [])







    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get("https://toddle-server.vercel.app/api/username").then((response) => {


            setUser(response.data);
            console.log(response.data);




        });
    }, []);


    if (user.length === 0) {
        console.log("no user");
    } else {
        console.log("user present");
    }







    const addcart = (name,id, prod_name, description, price, qty) => {

        if(user.length === 0){
            alert("Login to add to cart");
        }

        else{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('id', id);
            formData.append('prod_name', prod_name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('qty', 1);


            axios.post("https://toddle-server.vercel.app/api/addcart", formData).then(() => {
                alert('added to cart')
            })

            
        }

    }


    const [list, setList] = useState([]);


    useEffect(() => {
        axios.get("https://toddle-server.vercel.app/api/get").then((response) => {


            setList(response.data);

        });
    }, []);






    if (list.length === 0) {
        return (
            <div class="loadingspinner">
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
            </div>
        )
    } else {



        return (

            <>
                <Navbar />



                <div class="containerdisp">
                    <div class="cardisp">
                        <div class="box">
                            <div class="content">
                                <span class="heading">01</span>
                                <span class="content">Best designs </span>
                                <p>Our design philosophy revolves around pushing the boundaries of creativity. We constantly seek inspiration from global trends, art, culture, and nature to create jewelry pieces that are as unique as you are.</p>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                        
                    </div>
                    <div class="cardisp">
                        <div class="box">
                            <div class="content">
                                <span class="heading">02</span>
                                <span class="content">Exclusive Collections </span>
                                <p>Our Exclusive Collection features limited edition designs that are meticulously crafted to be truly unique. </p>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div class="cardisp">
                        <div class="box">
                            <div class="content">
                                <span class="heading">03</span>
                                <span class="content">Easy Exchange </span>
                                <p>We offer a generous exchange window, allowing you to make changes if you're not completely satisfied with your purchase. You can exchange any item within 1 week from the date of purchase.</p>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div class="cardisp">
                        <div class="box">
                            <div class="content">
                                <span class="heading">04</span>
                                <span class="content">Transparent Pricing </span>
                                <p>We're proud to state that our pricing is free from any hidden fees or surprises. The price you see is the price you pay. </p>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                
                </div>






                <div class="heading">Explore</div>




                <div class="holder" >

                    {
                        list && list.length > 0
                            ?
                            list.map((val) => {

                                return (



                                    <div class="cardc">
                                        <div class="cardc-img"><img src={val.photo}></img></div>
                                        <div class="cardc-info">
                                            <p class="text-title">{val.prod_name} </p>
                                            <p class="text-body">{val.description}</p>
                                        </div>
                                        <div class="cardc-footer">
                                            <span class="text-title">₹{val.price}</span>
                                            <button type="submit" class="cardc-button" onClick={() => { { addcart(user,val.id, val.prod_name, val.description, val.price, val.qty) } }}>
                                                <svg class="svg-icon" viewBox="0 0 20 20">
                                                    <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                                                    <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                                                    <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                                                </svg>
                                            </button>
                                            
                                            
                                        </div>
                                        <span >{val.qty} In stock</span>
                                        </div>


                                )
                            })
                            :
                            "No data available"


                    }

                </div>

                <Footer />


            </>
        )




    }



}
