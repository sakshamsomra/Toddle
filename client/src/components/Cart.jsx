import React from "react";
import { useState, useEffect } from "react";

import earings from "./photos/earings.jpg"
import Navbar from "./Navbar";
import jsPDF from "jspdf";
import axios from "axios";
import GooglePayButton from '@google-pay/button-react';


export default function Cart() {
    axios.defaults.withCredentials = true;



    const generateReceiptPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);

        doc.text('Receipt', 10, 10); // Add title
        doc.text('Order Date: 2023-07-16', 10, 20); 
        let startY = 40;
        const lineHeight = 10;
        list.forEach((item) => {
            doc.text(` ${item.prod_name} X ${item.qty}`, 10, startY);
            startY += lineHeight;
        });

        doc.text(`Order Total: ₹ ${cartprice}`, 10, startY + lineHeight); 
        doc.addImage(earings, 'JPEG', 10, startY + lineHeight * 2, 40, 40); 
       
        const pdfBlob = doc.output('blob');

        // Create a URL from the blob
        const pdfURL = URL.createObjectURL(pdfBlob);

        
        // const downloadLink = document.createElement('a');
        // downloadLink.href = pdfURL;
        // downloadLink.download = 'receipt.pdf';
        // downloadLink.click();
        window.open(pdfURL);
    };


    const order = () => {



        axios.post("http://localhost:3001/api/order").then(() => {
            alert("order placed");
        })

        axios.put("http://localhost:3001/api/order").then(() => {

        })

        axios.delete("http://localhost:3001/api/order").then(() => {

        })

        generateReceiptPDF();

    }


    const addition = (id) => {

        const formData = new FormData();
        formData.append('id', id);

        axios.put("http://localhost:3001/api/inc", formData).then(() => {

        })

    }


    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const subtract = async (id) => {

        const formData = new FormData();
        formData.append('id', id);

        axios.put("http://localhost:3001/api/dec", formData).then(() => {

        })

        await delay(2000);


        axios.post("http://localhost:3001/api/dec", formData).then(() => {

        })



    }


    const [list, setList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/api/getcart").then((response) => {


            setList(response.data);

        });
    }, []);




    const [cartprice, setCartprice] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/api/getprice").then((response) => {


            const data = response.data;
            let total = 0;
            data.forEach(row => {
                total += row.totalPrice;
            });
            setCartprice(total);

        });
    }, []);



    return (

        <>

            <Navbar />

            <div class="master-container">
                <div class="card cart">
                    <label class="title">Your cart</label>


                    {
                        list && list.length > 0
                            ?
                            list.map((val) => {

                                return (

                                    <div class="products">
                                        <div class="product">
                                            <svg fill="none" viewBox="0 0 60 60" height="60" width="60" xmlns="http://www.w3.org/2000/svg">
                                                <rect fill="#FFF6EE" rx="8.25" height="60" width="60"></rect>
                                                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.25" stroke="#FF8413" fill="#FFB672" d="M34.2812 18H25.7189C21.9755 18 18.7931 20.5252 17.6294 24.0434C17.2463 25.2017 17.0547 25.7808 17.536 26.3904C18.0172 27 18.8007 27 20.3675 27H39.6325C41.1993 27 41.9827 27 42.4639 26.3904C42.9453 25.7808 42.7538 25.2017 42.3707 24.0434C41.207 20.5252 38.0246 18 34.2812 18Z"></path>
                                                <path fill="#FFB672" d="M18 36H17.25C16.0074 36 15 34.9926 15 33.75C15 32.5074 16.0074 31.5 17.25 31.5H29.0916C29.6839 31.5 30.263 31.6754 30.7557 32.0039L33.668 33.9453C34.1718 34.2812 34.8282 34.2812 35.332 33.9453L38.2443 32.0039C38.7371 31.6754 39.3161 31.5 39.9084 31.5H42.75C43.9926 31.5 45 32.5074 45 33.75C45 34.9926 43.9926 36 42.75 36H42M18 36L18.6479 38.5914C19.1487 40.5947 20.9486 42 23.0135 42H36.9865C39.0514 42 40.8513 40.5947 41.3521 38.5914L42 36M18 36H28.5ZM42 36H39.75Z"></path>
                                                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.25" stroke="#FF8413" d="M18 36H17.25C16.0074 36 15 34.9926 15 33.75C15 32.5074 16.0074 31.5 17.25 31.5H29.0916C29.6839 31.5 30.263 31.6754 30.7557 32.0039L33.668 33.9453C34.1718 34.2812 34.8282 34.2812 35.332 33.9453L38.2443 32.0039C38.7371 31.6754 39.3161 31.5 39.9084 31.5H42.75C43.9926 31.5 45 32.5074 45 33.75C45 34.9926 43.9926 36 42.75 36H42M18 36L18.6479 38.5914C19.1487 40.5947 20.9486 42 23.0135 42H36.9865C39.0514 42 40.8513 40.5947 41.3521 38.5914L42 36M18 36H28.5M42 36H39.75"></path>
                                                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="#FF8413" d="M34.512 22.5H34.4982"></path>
                                                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.25" stroke="#FF8413" d="M27.75 21.75L26.25 23.25"></path>
                                            </svg>
                                            <div>
                                                <span>{val.prod_name}</span>
                                                <p>{val.description}</p>
                                            </div>
                                            <div class="quantity">
                                                <button type="submit" onClick={() => { subtract(val.id) }}>
                                                    <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
                                                    </svg>
                                                </button>
                                                <label>{val.qty}</label>

                                                <button type="submit" onClick={() => { addition(val.id) }}>
                                                    <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <label class="price small">₹{val.price}</label>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            "No data available"


                    }

                </div>



                <div class="card checkout">
                    <label class="title">Checkout</label>
                    <div class="details">
                        <span>Your cart subtotal:</span>
                        <span>₹{cartprice}</span>

                        <span>Shipping fees:</span>
                        <span>₹4.99</span>
                    </div>
                    <div class="checkout--footer">
                        <label class="price"><sup>$</sup>57.99</label>
                        {/* <button type="submit" class="checkout-btn" onClick={order}>Checkout</button> */}
                        <GooglePayButton
                          environment="TEST"
                          buttonSizeMode="fill"
                          paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            allowedPaymentMethods: [
                                {
                                    type: 'CARD',
                                    parameters: {
                                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                    },
                                    tokenizationSpecification: {
                                        type: 'PAYMENT_GATEWAY',
                                        parameters: {
                                            gateway: 'example',
                                            gatewayMerchantId: 'exampleGatewayMerchantId'
                                        },
                                    },
                                },
                            ],
                            merchantInfo: {
                                merchantId: 'BCR2DN4TZ3FZVMZK',
                                merchantName: 'Saksham'
                            },
                            transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: '100.00',
                                currencyCode: 'INR',
                                countryCode: 'IN'
                            },
                          }}
                          onLoadPaymentData={paymentRequest => {
                            console.log('oayment request', paymentRequest)
                          }}
                         />
                    </div>
                </div>
            </div>



        </>
    )
}