import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

export const Tabs: React.FC = () => {

    const [tab, selectTab] = useState('/orders');
    const history = useHistory();

    function handleClick(path: string) {
        selectTab(path);
        history.push(path);
    }

    const isTabSelected = (link: string) => {
        const res = tab === link;
        const style = `flex flex-col items-center w-1/3 rounded-2xl justify-center h-20 w-20  bg-opacity-30 
        ${link === '/orders' && ''}
        ${link === '/kareegars' && ''} 
        `
        return res ? style + 'bg-skin-accent' : style;
    }

    return (
        <div>
            <div className="flex font-bold bg-skin-base items-center justify-center  m-auto">
                <div onClick={e => handleClick('/orders')} className={isTabSelected('/orders')} >
                    <div>
                        <img src="assets/checklist.png" alt="tape" className="h-8 ml-3" />
                    </div>
                    <div className="text-xs mt-2">Orders</div>
                </div >
                <div onClick={e => handleClick('/naaps')} className={isTabSelected('/naaps')}>
                    <div>
                        <img src="assets/tape.png" alt="tape" className="h-8" />
                    </div>
                    <div className="text-xs mt-1">Naaps</div>
                </div >
                {/* <div onClick={e => handleClick('/kareegars')} className={isTabSelected('/kareegars')} >
                    <div>
                        <img src="assets/machine.png" alt="tape" className="h-8" />
                    </div>
                    <div className="text-xs mt-1">Kareegar</div>
                </div > */}
            </div>
        </div>
    )


}


