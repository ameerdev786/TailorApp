import React, { useState, useContext, useEffect } from 'react';
import subs from "../services/subs.png";
import firebase from "firebase";
import { useHistory } from "react-router"
import { AppContext } from '../context/app-context';
import { db } from "../services/firestore.config";
import { ECollection, IUseAuth, IUser, memberShip } from "../types";
import { free, Monthly, Yearly, halfYear } from "../helpers/util";
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collectionSnapshot, getDocById, format, useToggle } from "../helpers/util";
const axios = require('axios');

const key = "pk_test_51JhcbKD8fwNdDWK1YUrWJ3GbRBPJ8z9wawGTknJ93qTbdszHxGP4zcKXPAsAjOsyOr5DCojDHVJvwmn00Rrl9PSR00io27Q0rO"


function MemberShip() {


    const { auth } = useContext(AppContext);
    const history = useHistory();
    const [style1, setStyle1] = useState<string>('');
    const [style2, setStyle2] = useState<string>('');
    const [message, setMessage] = useState<string>();
    const [style3, setStyle3] = useState<string>('');
    const [style4, setStyle4] = useState<string>('');
    const [freeMember, setFreeMember] = useState<memberShip>();
    const [monthlyMember, setMontlyhMember] = useState<memberShip>();
    const [yearlyMember, setYearlyMember] = useState<memberShip>();
    const [halfYearMember, setHalfYearMember] = useState<memberShip>();
    const [price, setPrice] = useState<number>();
    const [monthly, setMonthly] = useState<any>();
    const [yearly, setYearly] = useState<any>();
    const [halfyear, setHalfYear] = useState<boolean>();
    const [Free, setFree] = useState<any>();
    const [stripeToken, setStripeToken] = useState<any>(null);

    const freePlan = () => {
        setStyle1('border-4 border-yellow-700    ')
        setStyle2('')
        setStyle3('')
        setStyle4('')
        setFreeMember({ ...free() })
        setFree(true)
        setMonthly(false)
        setYearly(false)
        setHalfYear(false)

    }
    const monthlyPlan = () => {
        setStyle2('border-4 border-yellow-700 h-full flex items-center flex-col justify-center')
        setStyle3('')
        setStyle4('')
        setStyle1('')
        setMontlyhMember({ ...Monthly() })
        setMonthly(true)
        setYearly(false)
        setFree(false)
        setHalfYear(false)
        setPrice(100)
    }
    const yearlyPlan = () => {
        setStyle3('border-4 border-yellow-700 h-full flex items-center flex-col justify-center ')
        setStyle2('')
        setStyle4('')
        setStyle1('')
        setYearlyMember({ ...Yearly() })
        setYearly(true)
        setFree(false)
        setMonthly(false)
        setHalfYear(false)
        setPrice(500)
    }
    const halfYearPlan = () => {
        setStyle4('border-4 border-yellow-700 h-full flex items-center flex-col justify-center')
        setStyle3('')
        setStyle2('')
        setStyle1('')
        setHalfYearMember({ ...halfYear() })
        setYearly(false)
        setFree(false)
        setMonthly(false)
        setHalfYear(true)
        setPrice(250)
    }

    const submit_subscription = () => {

        if (!monthly === true && !yearly === true && !Free === true && !halfyear === true) {
            toast.error('🦄 please select any plan to proceed', {
                position: "top-center",
                autoClose: false,
                closeOnClick: true,
            });
        } else {

            if (firebase.auth().currentUser?.providerData[0]?.uid === auth.user.uid && Free === true) {
                db.collection("membership").doc(firebase.auth().currentUser?.providerData[0]?.uid).set({
                    [auth.user.uid]: freeMember
                })
                // history.push('/naaps')
            } else if (monthly === true) {
                db.collection('membership').doc(firebase.auth().currentUser?.providerData[0]?.uid).set({
                    [auth.user.uid]: monthlyMember
                })
                // history.push('/naaps')

            } else if (yearly === true) {
                db.collection("membership").doc(firebase.auth().currentUser?.providerData[0]?.uid).set({
                    [auth.user.uid]: yearlyMember
                })
                // history.push('/naaps')
            }
            else if (halfyear === true) {
                db.collection('membership').doc(firebase.auth().currentUser?.providerData[0]?.uid).set({
                    [auth.user.uid]: halfYearMember
                })
            }

        }
        console.log(firebase.auth().currentUser?.providerData[0]?.uid)
    }

    const onToken = (token: any) => {
        setStripeToken(token)
    }


    /// stripe payment effect and function
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post("http://localhost:3000/api/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: price,
                    });
                console.log(res, "//////////////////");
                setMessage(res.data.status)
            } catch (error:any) {
                console.log(error.message)
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken])


    // for giving message for sucess payment 
    useEffect(() => {
        if (message) {
            toast.success(`🦄 congrdulation your plan is updated ${message}!`);
        }
    }, [message]);

    useEffect(() => {
        setStyle4('border border-yellow-700 h-full flex-col flex items-center justify-center');
    }, []);

    return (
        <div className=" space-x-4   pt-24 h-screen w-full">
            <img className="w-32 absolute top-10  left-32 " src={subs} alt={subs} />

            <h1 className="w-full text-center font-bold relative text-2xl top-8 text-blue-600">upgrade to premium</h1>
           
            <div onClick={freePlan} className={`${style1} w-11/12 mx-auto relative bottom-20  mt-32 flex  rounded-md capitalize  py-1 text-center  items-center justify-evenly shadow-xl bg-white`}>
                <h1 className={` ${Free ? "  relative text-yellow-700  text-xl font-bold" : "text-yellow-700 text-xl font-bold"} `}>Free</h1>
                <h2 className="text-2xl font-semibold font-helvetica text-red-400">0 Rs</h2>
                <p className="w-24 text-xl font-helvetica text-center">free for 1 week</p>
            </div>

            <div className="flex justify-center relative bottom-12  items-center space-x-2  h-1/4 w-11/12 mx-auto">
                <div onClick={monthlyPlan} className={` ${style2} W-12   space-y-2 rounded-md capitalize px-1 py-2 text-center h-11/12  shadow-xl bg-white`}>
                    <h1 className={` ${monthly ? "bg-blue-600 text-white w-full  relative  text-xl font-bold" : "text-yellow-700 text-xl font-bold"} `}>1 Month</h1>
                    <h2 className="text-2xl font-semibold font-helvetica text-red-400">100 Rs</h2>
                    <p className="w-24  text-center">Use for 1 Month</p>
                </div>
                <div onClick={halfYearPlan} className={` ${style4} W-12   space-y-2 rounded-md capitalize px-1 py-2  text-center  h-11/12 shadow-xl bg-white`}>
                    <h1 className={` ${halfyear ? "bg-blue-600 w-full text-white  relative  text-xl font-bold" : "text-yellow-700 text-xl font-bold"} `}>6 Month</h1>
                    <h2 className="text-2xl font-semibold font-helvetica text-red-400">300 Rs</h2>
                    <p className="w-24  text-center">Use for 6 Month</p>
                </div>
                <div onClick={yearlyPlan} className={` ${style3}  W-12  space-y-2 rounded-md capitalize px-1 py-2 text-center  h-11/12 shadow-xl bg-white`}>
                    <h1 className={` ${yearly ? "bg-blue-600  w-full text-center text-white  relative  text-xl font-bold" : "text-yellow-700 text-xl font-bold"} `}>Yearly</h1>
                    <h2 className="text-2xl  font-semibold font-helvetica text-red-400">600 Rs</h2>
                    <p className="w-24 font-center text-center">User for 1 Year</p>
                </div>
            </div>

            <StripeCheckout image="https://happybirthdaycakepic.com/pic-preview/Ameer%20Hamza/80/blue-stars-birthday-cake-for-Ameer%20Hamza.jpg"
                name={`${!monthly === true && !yearly === true && !Free === true && !halfyear === true ? "please select any plan from app" : "Kashif tech Lead"}`}
                billingAddress
                shippingAddress
                amount={price}
                token={onToken}
                stripeKey={key}
            >
                <button onClick={submit_subscription} className="w-11/12 relative bottom-4  bg-yellow-700 text-white font-semibold text-xl rounded-md h-14 ">Continue</button>
            </StripeCheckout>
            
            <div className="w-11/12 h-32  text-center">
                <h2 className="text-xl font-bold ">when will i be billed?</h2>
                <h3 className="mt-3">you will billed when you select any plan and pay cash via jazzcash or easypaisa</h3>
            </div>

            <ToastContainer  closeOnClick autoClose={false}/>
        </div>
    )
}

export default MemberShip;
