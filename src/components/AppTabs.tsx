import { useEffect, useLayoutEffect, useState } from "react"


export default function AppTabs({ list, selected, onSelect }: any) {

    const [selectedTab, selectTab] = useState('');

    useLayoutEffect(() => {
        selectTab(list[0]);
    }, [])

    const getStyle = (item: string) => {
        return `text-xs bg-skin-base  p-3 rounded-xl ${selectedTab === item ? 'font-bold' : ''}`
    }

    return (
        <div className="flex items-center space-x-1">
            {
                list.map((item: string) => (
                    <div key={item} onClick={e => selectTab(item) as any || (onSelect && onSelect(item))} className={getStyle(item)}>{item}</div>
                ))
            }
        </div>
    )
}