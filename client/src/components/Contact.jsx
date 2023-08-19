import React from "react";

import Navbar from "./Navbar";
import axios from "axios";

export default function Contact() {

    axios.defaults.withCredentials = true;



    return (
        <>

             <Navbar />


            <div class="cardcon">
                <div class="infos">
                    <div class="image"></div>
                    <div class="info">
                        <div>
                            <p class="name">
                                Saksham
                            </p>
                            <p class="function">
                                developer
                            </p>
                        </div>
                        <div class="stats">
                            <p class="flex flex-col">
                                E-Mail
                                <span class="state-value">
                                    saksham.somra@gmail.com
                                </span>
                            </p>
                            <p class="flex">
                                Contact
                                <span class="state-value">
                                    +91 9646486947
                                </span>
                            </p>

                        </div>
                    </div>
                </div>
                
            </div>



        </>
    )
}
