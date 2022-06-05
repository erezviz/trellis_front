import React from "react";
import { ReactComponent as Close } from '../../assets/icon/close.svg'


export const PopOver = ({ children, isShown, title, cb, pos }) => {

    return (

        <div className={`pop-over ${isShown ? 'shown' : ''} `} style={pos}>
            <header className="pop-over-header flex">
                <h5 className="popover-title">{title}</h5>
                <button className="pop-over-btn" onClick={() => cb()}>
                    <span>
                        <Close />
                    </span>

                </button>
            </header>
            <div className="children-container">
                {children}

            </div>
        </div>
    )
}