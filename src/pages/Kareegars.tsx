
import React, { useState, useEffect } from "react";
import { db } from "../services/firestore.config";
import { useHistory } from "react-router-dom";
import { INaap } from "../types";
import { add, call } from 'ionicons/icons';
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";

const Kareegars: React.FC = () => {
    const [list, setList] = useState<INaap[]>([]);
    const [filtered, setFiltered] = useState<INaap[]>([]);

    useEffect(() => {
        db.collection('naaps').onSnapshot((resp) => {
            let naaps = resp.docChanges();
            const naapList = naaps.map(customer => customer.doc.data());
            setList(naapList as any);
            setFiltered(naapList as any);
        });
    }, []);

    const onSearch = (searchTerm: string) => {
        const filteredList = list.filter((item) => item.customerName.includes(searchTerm));
        setFiltered(filteredList);
    }


    const history = useHistory();
    const showDetail = (path: string) => {
        history.push(path)
    }


    return (
        <div className="w-full overflow-scroll h-screen ">
            <div>
                <input type="text" className="w-full mb-2 font-bold text-white text-pink-600" onChange={e => onSearch(e.target.value)} />
            </div>
            <div >
                {
                    filtered.map((item, index) => (item && item.customerName &&
                        <div className='card mb-2' key={index}>
                            <div onClick={e => showDetail('/naaps')} className="flex items-center space-x-4">
                                <div className="text-white rounded-full ">
                                    <img src="assets/machine.png" alt="icon" className="h-12" />
                                </div>
                                <div className="capitalize flex-grow font-bold">{item.customerName}</div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )

}
export default Kareegars;