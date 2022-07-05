import { useEffect, useState } from "react"
import { collectionSnapshot } from "../helpers/util"
import lodash from 'lodash';


export const TemplateItem = ({ template, isEdit, naap, onChange }: any) => {

    return (
        <>
            <div className="flex flex-wrap items-center w-full text-sm">
                {template.map(([name, value]: any[]) => (
                    <div className="w-1/2 px-1" key={name}>
                        <label className="capitalize font-bold text-gray-600">{name}</label>
                        {
                            value.type === 'select' &&
                            <select value={lodash.get(naap, `design.${name}`)} className="text-xs text-skin-mainDark" disabled={!isEdit} onChange={(e) => onChange(name, e.target.value)}>
                                {
                                    value.options.map((item: string) => <option key={item} value={item}>{item}</option>)
                                }
                            </select>
                        }
                    </div>
                ))}
            </div>
        </>
    )
}

export const Template = ({ isEdit, naap, onChange }: any) => {

    const [, setTemplates] = useState<any[]>([]);
    const [selectedTemplate, selectTemplate] = useState<any[]>([]);

    useEffect(() => {
        collectionSnapshot('templates', (temp: any[]) => {
            setTemplates(temp);
          temp!==undefined &&  selectTemplate(Object.entries(temp[0]).filter(([key, value]: any) => typeof value === 'object'));
        });
    }, []);

    const onChangeItem = (key: string, value: string) => {
        const obj = {
            ...naap,
            design: {
                ...naap.design,
                [key]: value
            }
        }
        onChange(obj);
    }

    return (
        <div className="">
            {
                <TemplateItem template={selectedTemplate} naap={naap} isEdit={isEdit} onChange={onChangeItem} />
            }
        </div>
    )
}