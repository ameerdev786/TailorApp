
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ECollection, INaap } from "../types";
import { call, createOutline } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";
import { collectionSnapshot, isMatched, useToggle } from "../helpers/util";
import { Template, ToggleChevron } from "../components";


const getSizeUi = (item: any, key: string) => {
    return (
        <div className="flex bg-skin-base rounded-xl p-2">
            <div className="font-bold flex-grow capitalize">{key}</div>
            <div>{item[key].inch} {item[key].fraction}"</div>
        </div>
    )
}

const NaapCard = ({ item, history }: any) => {
    
    const toggle = useToggle(false);
    const [sizes] = useState<string[]>(['lambai', 'bazoo', 'teera', 'kalar', 'chatee', 'geera', 'pancha']);

    return (
        <div className='card mb-2'>
            <div className="flex items-start space-x-4">
                <div className="">
                    <img src="assets/tape.png" alt="tape" className="h-14" />
                </div>
                <div className="capitalize font-bold flex-grow space-y-2">
                    <div className="flex justify-between text-gray-600 ">
                        <div>
                            {item.customerName}
                        </div>
                        <div className="font-bold  flex items-center" onClick={e => history.push(`/naap-form?id=${item.id}`)}>
                            <div className="mr-2">{item.naapId}</div>
                            <IonIcon icon={createOutline} className="m-auto"></IonIcon>
                        </div>
                    </div>
                    <div className="text-xs flex items-center space-x-1">
                        <div className="h-4 w-4 rounded-full flex bg-green-600 text-white">
                            <IonIcon icon={call} className="m-auto" />
                        </div>
                        <div className="text-gray-500 flex-grow">
                            {item.customerPhone}
                        </div>
                        <div className="text-xl">
                            <ToggleChevron onChage={(show: any) => toggle.setShow(!show)} />
                        </div>
                    </div>
                </div>
            </div>
            <div hidden={!toggle.isShow}>
                <div className="flex flex-wrap" >
                    {
                        sizes.map((s, i) => (<div className="w-1/2 p-1" key={i}> {getSizeUi(item, s)} </div>))
                    }
                </div>
                {/* <Template /> */}
            </div>
        </div>
    );
}

const Naaps: React.FC = () => {
    const [list, setList] = useState<INaap[]>([]);
    const [filtered, setFiltered] = useState<INaap[]>([]);
    const history = useHistory();


    useEffect(() => {
        collectionSnapshot<INaap[]>(ECollection.naaps, (list: INaap[]) => {
            setList(list);
            setFiltered(list);
        });
    }, []);

    const onSearch = (searchTerm: string) => {
        const filteredList = list.filter((item) =>
            isMatched(item, 'customerName', searchTerm) ||
            isMatched(item, 'naapId', searchTerm)
        );
        setFiltered(filteredList);
    }



    return (
        <div className="w-full overflow-scroll h-screen pb-24">
            <div className="flex items-center space-x-2 mb-2">
                <div className="flex-grow">
                    <input type="text" placeholder="Search" className="w-full font-bold text-white text-skin-accent" onChange={e => onSearch(e.target.value)} />
                </div>
                <div>
                    <button className="btn-accent px-4" onClick={e=> history.push('/naap-form')}>New</button>
                </div>
            </div>
            <div className="mb-32" >
                {
                    filtered.map((item, index) => (
                        item &&
                        item.customerName &&
                        <NaapCard key={index} item={item} history={history} />
                    ))
                }
            </div>
        </div>
    )

}
export default Naaps;