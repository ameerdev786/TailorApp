import { IonIcon } from "@ionic/react";
import { chevronDown, chevronUp } from "ionicons/icons";
import { useToggle } from "../helpers/util";

export const ToggleChevron = (props: any) => {
    const toggle = useToggle();
    return (
        <div className="rounded-full h-6 text-skin-accent w-6 bg-gray-100 flex"
            onClick={e => toggle.toggle() as any || props.onChage(toggle.isShow)}
        >
            {
                !toggle.isShow ?
                    <IonIcon className="m-auto" icon={chevronDown}></IonIcon>
                    :
                    <IonIcon className="m-auto" icon={chevronUp}></IonIcon>
            }
        </div>)
}
