import { settingsOutline } from "ionicons/icons"
import { useState } from "react"
import { SideMenu } from "./SideMenu"
import { ISideMenuItem } from "./SideMenu"


export const AppLayout: React.FC = (props) => {

    const [menu, setMenu] = useState<Partial<ISideMenuItem>[]>([{
        icon: settingsOutline,
        name: 'Settings',
        link: '/settings'
    }])


    return (
        <div className="h-screen w-full text-skin-mainDark">
            <SideMenu list={menu as any} />
            <div className="flex flex-col">
                {props.children}
            </div>
        </div>
    )
}