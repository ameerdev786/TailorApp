import { reloadOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Template } from '../components';
import AppTabs from '../components/AppTabs';
import { IconButton } from '../components/IconButton';
import { getDocById, createNaap, useQueryParams, useSaving, setDoc, addDoc, updateDoc, createDoc } from '../helpers/util';
import { db } from "../services/firestore.config";
import { ECollection, INaap, ISize } from '../types';
import { Tabs } from './Tabs';


const NaapSelect = (props: any) => {

    const [options] = useState(new Array(80).fill(1).map((item, i) => '' + i));
    const [fractionOptions] = useState(['', '.2', '.3', '.5', '.7', '.8']);
    const [fraction, setFraction] = useState('');
    const [inch, setInch] = useState('');

    useEffect(() => {
        if (props.naap && props.naap[props.name]) {
            setFraction(props.naap[props.name].fraction);
            setInch(props.naap[props.name].inch);
        }
    }, [props.naap]);

    return (
        <div className="w-full flex items-end font-bold text-sm space-x-2">
            <div className="w-full bg-skin-base flex flex-col h-10 justify-center p-2 pr-4 rounded">
                <div className="flex items-center justify-between">
                    <div className="capitalize">
                        {props.name}
                    </div>
                    <div>
                        {inch}" {fraction}
                    </div>
                </div>
            </div>
            <div className="w-32">
                <label>Inch</label>
                <select value={inch} onChange={e => setInch(e.target.value) as any || (props.onChange && props.onChange({ fraction, inch: e.target.value }) as any)}>
                    {
                        options.map((item: string) => (
                            <option value={item} key={item}>{item}</option>
                        ))
                    }
                </select>
            </div>
            <div className="w-32" >
                <select value={fraction} onChange={e => setFraction(e.target.value) as any || (props.onChange && props.onChange({ fraction: e.target.value, inch }) as any)}>
                    {
                        fractionOptions.map((item: string) => (
                            <option value={item} key={item}>{item}</option>
                        ))
                    }
                </select>
            </div>

        </div >
    )
}

function NaapForm() {
    const [naap, setNaap] = useState<INaap>(createNaap());
    const [savedNaap, setSavedNaap] = useState<INaap>(createNaap())
    const history = useHistory();
    const query = useQueryParams();
    const saving = useSaving();
    const [selectedTab, selectTab] = useState('Naap');

    // onmount
    useEffect(() => {
        const init = async () => {
            if (query && query.id) {
                const resp: INaap = await getDocById<INaap>(ECollection.naaps, query.id);
                setNaap(resp);
                setSavedNaap(resp)
            }
        }
        init()
    }, []);


    const saveCustomer = async () => {
        return db.collection(ECollection.customer)
            .doc(naap.customerPhone).set({
                ...createDoc({
                    customerName: naap.customerName,
                    customerPhone: naap.customerPhone
                })
            });
    }

    const onSave = async () => {
        saving.start();
        await saveCustomer();
        // Update
        if (query && query.id) {
            await setDoc(ECollection.naaps, query.id, naap);
            naap.relatedOrdersIds.map((id: string) => updateDoc(ECollection.orders, id, { naap }));
        } else { // Add new
            await addDoc(ECollection.naaps, naap);
        }
        saving.stop();
        history.push('/naaps');
    }

    return (
        <div className="space-y-2 overflow-y-auto  card">
            <div className="flex items-center">
                <input type="text" className="bg-skin-base text-skin-accent flex-grow mr-2 font-bold " value={naap.naapId} onChange={e => setNaap({ ...naap, naapId: e.target.value })} />
                <AppTabs list={['Naap', 'Design']} onSelect={selectTab} />
            </div>
            <div className="flex space-x-2">
                <div>
                    <label>Customer Name</label>
                    <input value={naap?.customerName} className="w-full" type="text" placeholder="Customer Name" onChange={e => setNaap({ ...naap, customerName: e.target.value })} />
                </div>
                <div>
                    <label>Customer Phone Number</label>
                    <input value={naap?.customerPhone} className="w-full" type="text" placeholder="Phone Number" onChange={e => setNaap({ ...naap, customerPhone: e.target.value })} />
                </div>
            </div>
            {
                selectedTab === 'Naap' ?
                    <div className="">
                        <div className="space-y-2 w-full">
                            <NaapSelect naap={savedNaap} name="lambai" onChange={(lambai: ISize) => setNaap({ ...naap, lambai })} />
                            <NaapSelect naap={savedNaap} name="bazoo" onChange={(bazoo: ISize) => setNaap({ ...naap, bazoo })} />
                            <NaapSelect naap={savedNaap} name="teera" onChange={(teera: ISize) => setNaap({ ...naap, teera })} />
                            <NaapSelect naap={savedNaap} name="kalar" onChange={(kalar: ISize) => setNaap({ ...naap, kalar })} />
                            <NaapSelect naap={savedNaap} name="chatee" onChange={(chatee: ISize) => setNaap({ ...naap, chatee })} />
                            <NaapSelect naap={savedNaap} name="geera" onChange={(geera: ISize) => setNaap({ ...naap, geera })} />
                            <NaapSelect naap={savedNaap} name="pancha" onChange={(pancha: ISize) => setNaap({ ...naap, pancha })} />
                        </div>

                    </div> :
                    <div>
                        <Template isEdit={true} naap={naap} onChange={(e: any) => setNaap(e)} />
                    </div>
            }
            <div className="flex w-full justify-start space-x-2 mt-2">
                <IconButton icon={reloadOutline} saving={saving} onClick={onSave} value="Save"></IconButton>
            </div>

        </div>
    )
}

export default NaapForm
