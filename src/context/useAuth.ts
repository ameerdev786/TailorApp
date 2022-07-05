import firebase from "firebase";
import { useState } from "react"
import { auth, db } from "../services/firestore.config";
import { ECollection, IUseAuth, IUser } from "../types";



export const useAuth = (): IUseAuth => {

    const [user, _setUser] = useState<any>(null);
    const isAuth = () => user && user.id;

    const setUser = async (resp: any) => {
        if (resp) {
            const userInfo: any = { ...resp.providerData[0] };
            const docRef = db.collection(ECollection.users).doc(userInfo.uid);
            const userSnapshot = await docRef.get();
            if (!userSnapshot.exists) {
                await db.collection(ECollection.users).doc(userInfo.uid).set(userInfo);
            }
            const user = await db.collection(ECollection.users).doc(userInfo.uid).get();
            _setUser({ ...user.data(), ...userInfo, id: userInfo.uid });
        }
    }

    const signOut = () => auth.signOut();

    return {
        user,
        isAuth,
        setUser,
        signOut
    }
}
