import React from "react";

const Popup = (props, message) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                { message }
            </div>
        </div>
    ) : "";
}

export default Popup;