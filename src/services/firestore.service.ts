import { db, app } from './firestore.config';


const COLLECTIONS = {
    USERS: 'users',
    SHOPS: 'shops',
    CLIENTS: 'clients',
    ORDERS: 'orders',
    NAAPS: 'naaps'
}

// Authentication
export const createUserWithEmailAndPassword = async (email: string, password: string) => {
    const resp = await app.auth().createUserWithEmailAndPassword(email, password) as any;
    const userInfo = resp.user.toJSON();
    await db.collection(COLLECTIONS.USERS).doc(userInfo.uid).set(userInfo);
    return userInfo;
}

export const signInWithEmailAndPassowrd = async (email: string, password: string) => {
    const resp = await app.auth().signInWithEmailAndPassword(email, password) as any;
    const userInfo = resp.user.toJSON();
    const user = await db.collection(COLLECTIONS.USERS).doc(userInfo.uid).get();
    console.log("working",user.id);
    return user.data();
}

/////  pending 

export const onUsersSnapshot = (callback: Function) => {
    db.collection(COLLECTIONS.USERS).onSnapshot((usersDocs) => {
        const users = usersDocs.docs.map(item => item.data());
        callback && callback(users);
    });
}