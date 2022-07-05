import { IonIcon } from "@ionic/react"
import { reloadOutline } from "ionicons/icons"

export function IconButton(props: any) {

    return (
        <button
            className="w-1/2 bg-skin-main space-x-2 text-white flex items-center justify-center"
            {...props}
            disabled={props.saving.isSaving}
        >
            {props.saving.isSaving && <IonIcon icon={reloadOutline} className='animate-spin'  ></IonIcon>}
            <div> {props.value}  </div>
        </button>
    )
}