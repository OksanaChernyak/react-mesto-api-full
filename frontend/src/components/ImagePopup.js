import React from "react";

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_image ${card && "popup_opened"}`}>
            <div className="popup__overlay">
                <img className="popup__pic" alt={card?.name}
                     src={card?.link}/>
                <p className="popup__pic-title">{card?.name}</p>
                <button
                    className="popup__close-button popup__close-button_type_pic"
                    type="button"
                    aria-label="Закрыть попап"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
}

export default ImagePopup;