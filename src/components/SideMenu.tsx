import { IonIcon } from "@ionic/react";
import { callOutline, locateOutline, locationOutline, pinOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Link from "react-dom"
import { AppContext } from "../context/app-context";
import { useToggle, collectionSnapshot } from "../helpers/util";
import { tailorInfo, ECollection } from "../types";


export interface ISideMenuItem {
    name: string;
    icon: any;
    link: string;
    event: (e: any) => void;
}

export interface ISideMenuProps {
    list: ISideMenuItem[]
}

export function SideMenu({ list }: ISideMenuProps) {

    const history = useHistory();
    const { sideMenuToggle } = useContext(AppContext);
    const [info, setInfo] = useState<tailorInfo[]>([])

    useEffect(() => {
        collectionSnapshot<tailorInfo[]>(ECollection.tailorInfo, ((list) => {
            setInfo(list);
        }))
    }, [])

    return (
        <div>
            {
                sideMenuToggle.isShow &&
                <div
                    style={{
                        backdropFilter: 'blur(2px)'
                    }}
                    className="absolute  bg-skin-base bg-opacity-80 z-40 h-screen w-full" onClick={e => sideMenuToggle.hide()} >
                    <div

                        className="t-0 h-full left-0 w-2/3 z-40  space-y-4  bg-white bg-opacity-90 shadow-2xl"
                        onClick={e => e.stopPropagation()}>
                        {info.map((item) => (
                            <div key={item.id} className="flex space-x-2 border-b bg-skin-main text-skin-base py-4 p-4 rounded-br-2xl">
                                <div>
                                    <div onClick={()=>history.push('/settings')} className="h-12 w-12 rounded-full bg-skin-base">
                                        <img   className="w-12 h-12 rounded-full" src={item.banner} alt={item.banner} />
                                    </div>
                                </div>
                                <div >
                                    <h1 className="text-md font-bold mb-2">{item.tailorName}</h1>
                                    <div className="text-xs "> <IonIcon icon={locationOutline}></IonIcon> {item.adress} </div>
                                    <div className="text-xs "> <IonIcon icon={callOutline}></IonIcon> {item.phone}</div>
                                </div>
                            </div>

                        ))

                        }
                        {
                            list.map((item: any) =>
                                <div key={item.name} className="flex items-center text-skin-main text-sm space-x-2 ml-2" onClick={e => history.push(item.link) as any  /* || (item && item.event(e) ) */} >
                                    <div className="h-4"><IonIcon icon={item.icon} /></div>
                                    <div>{item.name}</div>
                                </div>
                            )
                        }
                     <button className="w-11/12 ml-2 text-blue-700" onClick={()=>{history.push('/membership')}}>MemberShip</button>
                     <button className="w-11/12 ml-2 text-blue-700" onClick={()=>{history.push('/login')}}>login</button>
                     <button className="w-11/12 ml-2 text-blue-700" onClick={()=>{history.push('/pay')}}>Pay</button>
                     <button className="w-11/12 ml-2 text-blue-700" onClick={()=>{history.push('success')}}>success</button>
                    </div>
                </div>
            }
        </div>

    )
}