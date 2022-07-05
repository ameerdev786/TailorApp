import firebase from "firebase";
import moment from "moment";
import { useState } from "react";
import { db } from "../services/firestore.config";
import {
  ECollection,
  EStatus,
  INaap,
  IOrder,
  ISize,
  IUser,
  UserType,
  tailorInfo,
  memberShip
} from "../types";
import lodash from "lodash";

export const createDoc = (doc: any, dateKey: any = null, isUpdate = false) => {
  if (dateKey) {
    return {
      ...doc,
      createdDate: isUpdate ? new Date(doc.createdDate).getTime() : Date.now(),
      updatedDate: Date.now(),
      [dateKey]: new Date(doc[dateKey]).getTime(),
    };
  } else {
    return {
      ...doc,
      createdDate: isUpdate ? new Date(doc.createdDate).getTime() : Date.now(),
      updatedDate: Date.now(),
    };
  }
};

// ======================== Firestore Uitilites STARTED ==============================///
export function collectionSnapshot<T>(
  collectionName: string,
  callback: (list: T) => any
) {
  db.collection(collectionName).onSnapshot((resp) => {
    const list: T = resp.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    })) as any;
    callback && callback(list);
  });
}

export async function setDoc<T>(
  collectionName: ECollection,
  id: string,
  data: T
) {
  return await db.collection(collectionName).doc(id).set(data);
}

export async function addDoc<T>(
  collectionName: ECollection,
  data: T,
  id: string = ""
) {
  if (id) {
    return await db.collection(collectionName).doc(id).set(data);
  } else {
    return await db.collection(collectionName).add(data);
  }
}

export async function updateDoc<T>(
  collectionName: ECollection,
  id: string,
  data: T
) {
  return db.collection(collectionName).doc(id).update(data);
}

export function getDocById<T>(collectionName: any, id:any): Promise<T> {
  return db
    .collection(collectionName)
    .doc(id)
    .get()
    .then((item) => {
      const data: any = item.data();
      return {
        ...data,
        id: item.id,
        createdDate: moment(data.createdDate).format("YYYY-MM-DD"),
        updatedDate: moment(data.updatedDate).format("YYYY-MM-DD"),
      };
    }) as Promise<T>;
}
// ======================== Firestore Uitilites END ==============================///

export const useQueryParams = () => {
  const queryList = window.location.search.split("?").filter((item) => item);
  const result = queryList.reduce((prev: any, curr: string) => {
    const [key, value] = curr.split("=");
    return {
      ...prev,
      [key]: value,
    };
  }, {});
  return result;
};

export const useSaving = () => {
  const [isSaving, setSaving] = useState(false);

  const start = () => setSaving(true);
  const stop = () => setSaving(false);

  return {
    isSaving,
    start,
    stop,
  };
};

export const createSize = (): ISize => {
  return {
    inch: "",
    fraction: "",
  };
};

export const createUser = (): IUser => {
  return {
    type: UserType.tailor,
    uid: "",
    photoUrl: "",
  };
};

export const createNaap = (): INaap => {
  return {
    naapId: "",
    lambai: createSize(),
    bazoo: createSize(),
    teera: createSize(),
    kalar: createSize(),
    chatee: createSize(),
    geera: createSize(),
    pancha: createSize(),
    customerName: "",
    customerPhone: "",
    user: createUser(),
    relatedOrdersIds: [],
    design: {},
  };
};

export const createOrder = (): IOrder => {
  return {
    id: "",
    naap: createNaap(),
    dueDate: moment().add(7, "days").format("YYYY-MM-DD"),
    clothType: "Cloth",
    numberOfSuits: "1",
    totalAmount: "",
    remainingAmount: "",
    paidAmount: "",
    images: [],
    status: EStatus.inprogress,
  };
};
export const free = (): memberShip => {
  return {
    membershipStatus:true,
    plan:'Free',
    price:0,
    startAt:'27 sep 2021',
    endAt:'4 oct 2021',
  };
}
export const Monthly = (): memberShip => {
  return {
    membershipStatus:true,
    plan:'monthly',
    price:100,
    startAt:'27 sep 2021',
    endAt:'27 oct 2021',
  };
}
export const Yearly = (): memberShip => {
  return {
    membershipStatus:true,
    plan:'Yearly',
    price:600,
    startAt:'27 sep 2021',
    endAt:'27 sep 2022',
  };
}
export const halfYear = (): memberShip => {
  return {
    membershipStatus:true,
    plan:'6 month',
    price:300,
    startAt:'27 sep 2021',
    endAt:'27 feb 2022',
  };
}


export const tailorData = (): tailorInfo => {
  return {
    tailorName: "",
    banner: "",
    logo: "",
    id:"",
    phone:"",
    adress:""
  };
};

export const useToggle = (value = false) => {
  const [isShow, setShow] = useState(value);

  const show = () => setShow(true);
  const hide = () => setShow(false);
  const toggle = () => setShow(!isShow);

  return {
    isShow,
    setShow,
    show,
    hide,
    toggle,
  };
};

export const format = (date: any) => {
  return moment(date).format("dddd, DD/MM/YY");
};

export const isMatched = (item: any, path: string, searchTerm: string) => {
  const value: string = lodash.get(item, path, "").toLowerCase();
  const term = searchTerm.toLowerCase();
  return value.includes(term);
};

const InitiateSystemTemplates = () => {
  // const templates = require('./templates.json');
  // db.collection('templates').add(templates[0])
};

export const getWindow = () => {
  return window as any;
};
