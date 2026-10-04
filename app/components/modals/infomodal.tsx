type InfoModal = {
    text: string;
    action: string;
}

import * as Icons from "@/app/components/icons"
import { act, useState } from "react";

export default function InformationModal({text, action}: InfoModal) {
    // const [classname, setClassName] = useState(action)

    // sanity check
    let actiontype = -1

    if (action === "inform") {actiontype = 1}
    else if (action === "warning") {actiontype = 2}
    else if (action === "error") {actiontype = 3}
    else {
        actiontype = 1
        action = "inform"
    }

    var inter = setInterval(() => {
        action = action + " hide"
        // setClassName(action + " hide")
        clearInterval(inter)
    }, 5000)

    return (
        <div id="notification-box" className={action}>
            {actiontype == 1 ? (<Icons.InfoIcon />) : actiontype == 2 ? (<Icons.Warning />) : actiontype == 3 ? (<Icons.Error />) : null}
            {text}
        </div>
    )
}