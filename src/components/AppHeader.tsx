import { IonIcon } from '@ionic/react';
import { filter, menu, search } from 'ionicons/icons';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AppContext } from '../context/app-context';

export const AppHeader: React.FC = () => {

    const { sideMenuToggle, auth } = useContext(AppContext);
    const history = useHistory();

    // useEffect(() => {
    //     try {
    //         history.push('/');
    //     } catch (error:any) {
    //         console.log(error.message);
    //     }
    // }, [auth.user]);

    return (
        auth.isAuth() ?
            <div className="text-skin-main pt-3 px-4  font-bold text-sm  flex items-center p-2 justify-between" >
                <div onClick={e => sideMenuToggle.toggle()}>
                    <IonIcon icon={menu} className="text-2xl" />
                </div>
                <div className="space-x-4 text-xl">
                    <IonIcon icon={search} />
                    <IonIcon icon={filter} />
                </div>
            </div> :
            <div></div>
    )
}