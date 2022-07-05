import React, { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');
const key = "pk_test_51JhcbKD8fwNdDWK1YUrWJ3GbRBPJ8z9wawGTknJ93qTbdszHxGP4zcKXPAsAjOsyOr5DCojDHVJvwmn00Rrl9PSR00io27Q0rO"

function Pay() {
    const [stripeToken, setStripeToken] = useState<any>(null);
    const [message,setMessage]=useState<string>();

    const onToken = (token: any) => {
        setStripeToken(token)
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post("http://localhost:3000/api/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 200,
                    });
                console.log(res.data.status, "//////////////////");
                setMessage(res.data.status)
            } catch (error) {
                console.log(error)
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken])

    useEffect(()=>{
        if(message){
        toast(`your payment is ${message}`)
        }
    },[message]);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center ">
            <h1>Choose any subscription and use this app</h1>
            <StripeCheckout image="https://happybirthdaycakepic.com/pic-preview/Ameer%20Hamza/80/blue-stars-birthday-cake-for-Ameer%20Hamza.jpg"
                name="Kashif Soft dev"
                billingAddress
                shippingAddress
                amount={200}
                token={onToken}
                stripeKey={key}
            >
                <button className=" bg-blue-600 ">Pay money</button>
            </StripeCheckout>
            <ToastContainer />
        </div>
    )
}

export default Pay;
