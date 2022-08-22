import React from "react";

function PopupWithForm({isOpen, name, title, onClose, btnText, children, onSubmit}) {
    return (
        <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}>
            <form
                name="{props.name}"
                className="popup__container"
                onSubmit={onSubmit}
            >
                <button
                    className="popup__close-button"
                    onClick={onClose}
                    type="button"
                    aria-label="Закрыть попап"
                ></button>
                <h2 className="popup__title">{title}</h2>
                {children}
                <button className="popup__save-button" type="submit">
                    {btnText}
                </button>
            </form>
        </div>
    );
}

export default PopupWithForm;