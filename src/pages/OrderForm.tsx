import { IonIcon } from '@ionic/react';
import { cameraOutline } from 'ionicons/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IconButton } from '../components/IconButton';
import { collectionSnapshot, createDoc, getDocById, createOrder, useQueryParams, useSaving, updateDoc } from '../helpers/util';
import { storage, db } from '../services/firestore.config';
import { ECollection, EStatus, INaap, IOrder } from '../types';

function OrderForm() {

    const [order, setOrder] = useState<Partial<IOrder>>({
        ...createOrder(),
    });

    const [savedOrder, setSavedOrder] = useState<Partial<IOrder>>({
        ...createOrder()
    });

    const [naaps, setNaaps] = useState<INaap[]>([] as any);
    const [images, setImages] = useState<any[]>([]);
    const [, setTotalProgress] = useState<number>(0);
    const [objectUrls, setObjectUrls] = useState<string[]>([]);
    let [refUploadInput, setRef] = useState<any>(null);
    const getStatusColors = () => {
        if (EStatus.ready === order.status) return 'text-green-600';
        else if (EStatus.delivered === order.status) return 'text-gray-400';
    }


    const saving = useSaving();
    const query = useQueryParams();
    const history = useHistory();



    const onSetImage = (e: any) => {
        if (e.target.files.length !== 0) {
            setImages(Array.from(e.target.files));
            setOrder({
                ...order,
                numberOfSuits: `${e.target.files.length}`
            })
        }
    }

    useEffect(() => {
        collectionSnapshot<INaap[]>(ECollection.naaps, ((list) => {
            setNaaps(list);
            setOrder({
                // eslint-disable-next-line react-hooks/rules-of-hooks
                ...order,
                naap: list[0]
            })
        }))
        if (query.id) {
            getDocById<IOrder>(ECollection.orders, query.id).then((resp: IOrder) => {
                const obj: IOrder = { ...resp, dueDate: moment(resp.dueDate).format('YYYY-MM-DD') }
                setSavedOrder(obj);
                setOrder(obj);
                setObjectUrls(obj.images);
            });
        }
    }, []);

    useEffect(() => {
        setObjectUrls(images.map((item) => URL.createObjectURL(item)));
    }, [images])

    const startUpload = (imageFile: any, callback = (progress: number) => { }) => {
        return new Promise((resolve, reject) => {
            var storageRef = storage.ref('clothes/' + imageFile.name);
            //Upload file
            var task = storageRef.put(imageFile);

            //Update progress bar
            task.on('state_changed',
                function progress(snapshot) {
                    var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    callback(percentage);
                },
                function error(err) {
                    reject(err);
                },
                async () => {
                    resolve(await storageRef.getDownloadURL());
                }
            );
        });
    }

    const handleOnChange = (key: string, value: any) => {
        setOrder({
            ...order,
            [key]: value
        });
    }

    const onSaveOrder = async () => {
        saving.start();
        if (query && query.id) {
            await db.collection(ECollection.orders).doc(query.id).set({
                ...createDoc(order, 'dueDate', true),
            });
        } else {
            let progress = 0;
            const promises = images.map((image) => startUpload(image, (imageProgress: number) => {
                progress += imageProgress;
                setTotalProgress(Math.round(progress / images.length));
            }));
            const urls = await Promise.all(promises);
            const resp = await db.collection(ECollection.orders).add({
                ...createDoc(order, 'dueDate'),
                images: urls
            });
            await updateDoc<Partial<INaap>>(ECollection.naaps, order.naap?.id as any, {
                relatedOrdersIds: [...(order.naap?.relatedOrdersIds as any), resp.id]
            })
        }
        saving.stop();
        history.push('/orders');
    }

    const onClickUploadButton = () => {
        refUploadInput && refUploadInput.click();
    }


    const caculateRemaining = (total: any, paid: any) => {
        order.remainingAmount = `${+total - +paid}`;
        return false;
    }


    return (
        <div className="space-y-2 card">
            <div className="w-full flex space-x-2 bg-skin-base rounded-t-xl">
                <div className="font-bold rounded w-2/5 h-12  px-2 inline-block text-skin-accent flex items-center justify-center">
                    <div className=""># {order.naap && order.naap.naapId ? order.naap.naapId : '--'}</div>
                </div>
                {
                    objectUrls && !objectUrls.length &&
                    <div className="bg-gray-100 flex rounded flex-grow p-2 px-4 text-center font-bold text-gray-600 " onClick={e => onClickUploadButton()}>
                        <IonIcon icon={cameraOutline} className="m-auto" />
                    </div>
                }
                <input hidden type="file" ref={input => setRef(input as any)} className="w-full" multiple onChange={onSetImage} />
                {
                    objectUrls && objectUrls.length > 0 &&
                    <div className="flex -space-x-4 px-3 pt-1 h-12 rounded flex-grow justify-end " onClick={e => onClickUploadButton()}>
                        {
                            objectUrls && objectUrls.length > 0 && objectUrls.map((image, i) => (
                                <div key={i} className="h-10 w-10 transform rounded-full border overflow-hidden">
                                    <img src={image} alt="imagelocal" className="h-12 w-12 object-cover" />
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            <div className="flex w-full space-x-2">
                <div className="w-full">
                    <select className="w-full"
                        value={order.naap?.id}
                        onChange={({ target: { value } }) => value && handleOnChange('naap', naaps.find((item) => item.id === value))}>
                        <option> Select Naap {order.naap?.naapId} </option>
                        {
                            naaps.map((item: INaap, i) => (
                                <option key={i} value={item.id}>{item.customerName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="w-32">
                    <button onClick={e => history.push('/naap-form')} className="w-full bg-skin-accent font-bold text-white flex items-center  justify-center">
                        <div className="mr-1">
                            <img src="assets/tape.png" className="h-6" alt="" />
                        </div>
                        <div>
                            New
                        </div>
                    </button>
                </div>
            </div>
            <div className="flex space-x-2">
                <div className="w-1/2">
                    <label>Date</label>
                    <input type="date" className="w-full" disabled placeholder="todayDate"
                        value={moment().format('YYYY-MM-DD')}
                        onChange={e => handleOnChange('createdDate', e.target.value)} />
                </div>
                <div className="w-1/2">
                    <label>Due Date</label>
                    <input type="date" className="w-full" value={order.dueDate} placeholder=""
                        onChange={e =>
                            handleOnChange('dueDate', e.target.value)
                        } />
                </div>
            </div>
            <div className="flex space-x-2">
                <div className="w-1/2">
                    <label>Type of Cloth</label>
                    <select name="" id="" className="w-full" onChange={e => handleOnChange('clothType', e.target.value)}>
                        <option>Cloth</option>
                        <option>Waist-Coat</option>
                    </select>
                </div>
                <div className="w-1/2">
                    <label>Number of Suits</label>
                    <input type="number" name="" id="" value={order.numberOfSuits} className="w-full" onChange={e => handleOnChange('numberOfSuits', e.target.value)} />
                </div>
            </div>
            <div className="flex space-x-2">
                <div className="w-1/3">
                    <label>Total Amount</label>
                    <input className="w-full" type="number" value={order.totalAmount} name="" id="" onChange={e =>
                        handleOnChange('totalAmount', caculateRemaining(e.target.value, order.paidAmount) || e.target.value)
                    } />
                </div>
                <div className="w-1/3">
                    <label>Paid Amount</label>
                    <input className="w-full" type="number" value={order.paidAmount} name="" id="" onChange={e =>
                        handleOnChange('paidAmount', caculateRemaining(order.totalAmount, e.target.value) || e.target.value)
                    } />
                </div>
                <div className="w-1/2">
                    <label>Remaining Amount</label>
                    <input className="w-full" disabled type="number" value={order.remainingAmount} name="" id="" />
                </div>
            </div>

            <div className="flex space-x-4">
                <div className="w-full">
                    <select
                        className={getStatusColors()}
                        value={savedOrder.status} onChange={e => handleOnChange('status', e.target.value)}>
                        <option value={EStatus.inprogress}>{EStatus.inprogress}</option>
                        <option value={EStatus.ready}>{EStatus.ready}</option>
                        <option value={EStatus.delivered}>{EStatus.delivered}</option>
                    </select>
                </div>
                <IconButton onClick={onSaveOrder} value="Save" saving={saving} />
            </div>

        </div >
    )
}

export default OrderForm;
