import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Orders() {

    axios.defaults.withCredentials = true;


    const [list, setList] = useState([]);


    useEffect(() => {
        axios.get("https://toddle-server.vercel.app/api/orders").then((response) => {


            setList(response.data);

        });
    }, []);


    return (

        <>

        <Navbar/>


           


            <table className="orders">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>qty</th>
                    </tr>
                </thead>



                {
                    list && list.length > 0
                        ?
                        list.map((val) => {

                            return (

                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>{val.prod_name}</td>
                                        <td>{val.qty}</td>
                                    </tr>
                                    


                                </tbody>




                            )
                        })
                        :
                        "No data available"


                }

            </table>




        </>


    )
}
