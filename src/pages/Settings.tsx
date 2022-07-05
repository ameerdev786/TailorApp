import React, { useEffect, useState } from "react";
import { cameraOutline, person, informationCircleOutline, brush, callOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { collectionSnapshot, useSaving } from '../helpers/util';
import { tailorInfo, ECollection } from "../types"
import { db, storage } from "../services/firestore.config";
import loader from "../services/last.gif";
import { IconButton } from '../components/IconButton';

const Settings: React.FC = () => {
    const [Name, setTailorName] = useState<string>('')
    const [showInput, setShowInput] = useState<boolean>(false);
    const [showAdress, setShowAdress] = useState<boolean>(false);
    const [showPhone, setShowPhone] = useState<boolean>(false);
    const [loading,setLoading]= useState<boolean>(false)
    const [alert,setAlert]= useState<boolean>(false)
    const [adress, setTailorAdress] = useState<string>('')
    const [file, setFile] = useState<any>();
    const [mobile, setMobile] = React.useState("");
    const [info, setInfo] = useState<tailorInfo[]>([]);
    const saving = useSaving()
    const id: any = [];


    info.map((item) => id.push(item.id))

    const onFileChange = (e: any) => {
        setFile(e.target.files[0])
    }

    /// image upload
    const onUpload = async (e:any) => {
        if(!file){
            setAlert(true)
        }else {
            setAlert(false)
        setLoading(true)
        const storageRef = storage.ref()
       const fileRef =  storageRef.child(file.name)
      
        await fileRef.put(file)
        if (info.length > 0) {
            db.collection(ECollection.tailorInfo).doc(id[0]).update({
                banner: await fileRef.getDownloadURL()
            })
            setFile('')
        } else if (info.length < 0 || info.length === 0) {

            db.collection(ECollection.tailorInfo).add({
                banner: await fileRef.getDownloadURL()
            })
            setFile('')

        } else {
            return
        }
        setLoading(false)
    }

    }
     const onUploadAdress=()=>{
        if (info.length > 0) {
            db.collection(ECollection.tailorInfo).doc(id[0]).update({
                adress: adress
            })
            setTailorAdress('')
        } else if (info.length < 0 || info.length === 0) {
            db.collection(ECollection.tailorInfo).add({
                adress: adress
            })
            setTailorAdress('')
        } else {
            return
        }

     }
     const onUploadName=()=>{
        if (info.length > 0) {
            db.collection(ECollection.tailorInfo).doc(id[0]).update({
                tailorName: Name
            })
            setTailorName('')
        } else if (info.length < 0 || info.length === 0) {
            db.collection(ECollection.tailorInfo).add({
                tailorName: Name
            })
            setTailorName('')
        } else {
            return
        }

     }
     const onUploadPhone=()=>{
        if (info.length > 0) {
            db.collection(ECollection.tailorInfo).doc(id[0]).update({
                phone: mobile
            })
            setMobile('')
        } else if (info.length < 0 || info.length === 0) {
            db.collection(ECollection.tailorInfo).add({
                phone: mobile
            })
            setMobile('')
        } else {
            return
        }

     }
    // validate value
    const numberHandler = (val: any) => {
        const validatedValue = val.replace(/[^0-9]/g, "");
        setMobile(validatedValue);
    };


// get data form firebase firebase
    useEffect(() => {
        collectionSnapshot<tailorInfo[]>(ECollection.tailorInfo, ((list) => {
            setInfo(list);
        }))
    }, [])


    return (
        <div className="w-full overflow-scroll flex items-center space-y-1  flex-col h-screen pb-24">
            {info.map((item) => (

                <>
                  {loading?<img className="w-20 absolute z-30 mt-8" src={loader} alt={loader} />:""}
                 <img key={item.id} src={item.banner} alt={item.banner} className={` ${loading?" rounded-full z-20 w-32 h-32 border-3 border-yellow-300 opacity-30":"rounded-full z-20 w-32 h-32 border-3 border-yellow-300"} `} />
               
                    
                    <label className="">
                        <IonIcon icon={cameraOutline}  className="text-4xl relative z-30 bottom-8 text-blue-700 p-2 rounded-full bg-gray-50 left-9" />
                        <input onChange={onFileChange} type="file" style={{ display: "none" }} />
                    </label>
                    <button className={  `${alert?"bg-yellow-600 w-24 relative z-30 bottom-7 text-white":"bg-blue-500 w-24 relative z-30 bottom-7 text-white"}`} onClick={onUpload}>{alert?'upload img':'upload'}</button>

                    <div className="w-11/12  rounded-md items-center  flex">
                        <IonIcon icon={person} className="text-3xl text-yellow-400 pl-4" />
                        <div className="pl-8 flex flex-col justify-center  ">
                            <p className="font-bold  ">Name</p>
                            <h2 className="text-xl mb-4 capitalize">{item.tailorName}</h2>
                        </div>
                        <IonIcon onClick={() => setShowInput(!showInput)} icon={brush} className="text-2xl absolute right-8 text-gray-500  " />

                    </div>

                    <div className="flex  w-11/12 items-center">
                        <input value={Name} type="text" className={`${showInput ? "text-center  capitalize  font-light text-lg w-11/12" : "text-center hidden capitalize mt-1 font-light text-lg w-11/12"} `} onChange={e => setTailorName(e.target.value)} placeholder=" save your Name" />
                        <IconButton onClick={()=>{onUploadName()
                         setShowInput(false)}} value="Save" className={`${showInput ? 'bg-blue-600 py-1 ml-2 w-24 text-white' : 'hidden'} `} saving={saving} />

                    </div>

                    <div className="w-11/12  rounded-md items-center  flex">
                        <IonIcon icon={informationCircleOutline} className="text-4xl text-yellow-400 pl-4" />
                        <div className="pl-8 flex flex-col justify-center  ">
                            <p className="font-bold  ">Adress</p>
                            <h2 className="text-xl mb-4 capitalize">{item.adress}</h2>
                        </div>
                        <IonIcon icon={brush} onClick={() => setShowAdress(!showAdress)} className="text-2xl absolute right-8 text-gray-500  " />

                    </div>
                    <div className="flex  w-11/12 items-center">
                        <input value={adress} type="text" className={`${showAdress ? "text-center  capitalize  font-light text-lg w-11/12" : "text-center hidden capitalize mt-1 font-light text-lg w-11/12"} `} onChange={e => setTailorAdress(e.target.value)} placeholder="save adress" />
                        <IconButton onClick={()=>{ onUploadAdress()
                         setShowAdress(false) }} value="Save" className={`${showAdress ? 'bg-blue-600 ml-2 w-24 text-white' : 'hidden'} `} saving={saving} />

                    </div>

                    <div className="w-11/12  rounded-md items-center  flex">
                        <IonIcon icon={callOutline} className="text-4xl text-yellow-400 pl-4" />
                        <div className="pl-8 flex flex-col justify-center  ">
                            <p className="font-bold  ">Phone</p>
                            <h2 className="text-xl  mb-4 capitalize">{item.phone}</h2>
                        </div>
                        <IonIcon icon={brush} onClick={() => setShowPhone(!showPhone)} className="text-2xl absolute right-8 text-gray-500  " />

                    </div>
                
                    <div className="flex  w-11/12 items-center">
                        <input value={mobile}  type="tel" className={`${showPhone ? "text-center  capitalize  font-light text-lg w-11/12   " : "text-center hidden capitalize mt-1 font-light text-lg w-11/12"} `} onChange={e => numberHandler(e.target.value)} placeholder="save your whatsapp" />
                        <IconButton onClick={()=>{onUploadPhone()
                         setShowPhone(false)}} value="Save" className={`${showPhone ? 'bg-blue-600 ml-2 w-24 text-white' : 'hidden'} `} saving={saving} />
                    </div>
                  
                </>
            ))}

        </div>
    )

}
export default Settings;