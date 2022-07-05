
import React, { useState, useEffect } from "react";
import { ECollection, EStatus, IOrder } from "../types";
import { callOutline, createOutline, timeOutline } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";
import { useHistory } from "react-router";
import { collectionSnapshot, format, useToggle } from "../helpers/util";
import { ToggleChevron } from "../components";


const OrderStatus = ({ status }: any) => {
    const getStyle = (st: EStatus) => {
        if (st === EStatus.ready) return 'text-green-600'
        if (st === EStatus.delivered) return 'text-gray-400'
    }
    return (
        <div className={`rounded-full text-xs bg-skin-base  p-1 px-4 ${getStyle(status)}`}>{status}</div>
    )
}

const OrderCard = ({ order }: { order: IOrder }) => {

    const history = useHistory();
    const toggle = useToggle(false);

    return (
        <div className="card">
            <div className="flex items-center">
                <div
                    onClick={e => history.push(`/order-form?id=${order.id}`)}
                    className="text-white rounded bg-gray-100 rounded-full text-xs text-skin-accent font-bold flex items-center p-1 px-2">
                    <IonIcon className="mr-1" icon={createOutline}></IonIcon>
                    <div> # {order.naap.naapId}
                    </div>

                </div>
                <div className="pl-2">
                    <OrderStatus status={order.status} />
                </div>
                <div className="flex-grow"></div>
                <ToggleChevron className="self-end" onChage={(show: any) => toggle.setShow(!show)} />
            </div>
            <div className="flex justify-between items-center">
                <div className="font-bold  capitalize">{order.naap.customerName}</div>
                <div className="flex items-center -space-x-2  ">
                    <div className="flex -space-x-4">
                        {
                            order.images &&
                            order.images.map((item, i) =>
                                <img src={item} key={i} className="h-8 w-8 transform object-cover rounded-full" alt="" />
                            )
                        }
                    </div>
                    <div className="rounded-full h-8 w-8 bg-gray-200 flex relative z-20">
                        <div className="font-bold m-auto text-gray-600 ">{order.numberOfSuits}</div>
                    </div>
                </div>
            </div>
            <div className='flex font-bold text-gray-400 text-xs  justify-between items-center'>
                <div className="flex items-center space-x-2 text-gray-600">
                    <IonIcon className="text-gray-400" icon={callOutline}></IonIcon>
                    <div className="text-gray-400">{order.naap.customerPhone}</div>
                </div>
                <div className="flex items-center space-x-2">
                    <IonIcon icon={timeOutline}></IonIcon>
                    <div>{format(order.dueDate)}</div>
                </div>
            </div>
            {
                toggle.isShow &&
                <div className="pt-4">
                    <div className="flex items-center font-bold text-xs text-gray-600">
                        <div className="w-1/3">Total</div>
                        <div className="w-1/3 text-center">Paid</div>
                        <div className="w-1/3 text-right">Remaining</div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                        <div className="w-1/3">{order.totalAmount} Rs</div>
                        <div className="w-1/3 text-center">{order.paidAmount} Rs</div>
                        <div className="w-1/3 text-right">{order.remainingAmount} Rs</div>
                    </div>
                </div>
            }
        </div>
    )
}


const Orders: React.FC = () => {
    const [list, setList] = useState<IOrder[]>([]);
    const [filtered, setFiltered] = useState<IOrder[]>([]);
    const history = useHistory();

    useEffect(() => {
        collectionSnapshot<IOrder[]>(ECollection.orders, (list: IOrder[]) => {
            setList(list);
            setFiltered(list);
        })
    }, []);

    const onSearch = (searchTerm: string) => {
        const filteredList = list.filter((item) => item.naap.customerName.toLowerCase().includes(searchTerm.toLowerCase()));
        setFiltered(filteredList);
    }



    return (
        <div className="w-full overflow-scroll h-screen">
            <div className="flex items-center space-x-2 mb-2">
                <div className="flex-grow">
                    <input type="text" placeholder="Search" className="w-full font-bold text-white text-skin-accent" onChange={e => onSearch(e.target.value)} />
                </div>
                <div>
                    <button className="btn-accent px-4" onClick={e=> history.push('/order-form')}>New</button>
                </div>
            </div>
            <div className="space-y-4" >
                {
                    filtered.map((item, index) => (
                        <OrderCard order={item} key={index} />
                    ))
                }
            </div>

        </div>
    )

}
export default Orders;