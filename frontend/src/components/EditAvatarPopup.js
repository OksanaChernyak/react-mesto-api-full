import {useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarReference = useRef("");

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarReference.current.value
        })
    }

    useEffect(() => {
            if (isOpen) {
                avatarReference.current.value = "";
            };
    }, [isOpen]);

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name="avatar-form"
                       title="Обновить аватар" btnText="Сохранить"
                       children={<fieldset className="popup__fields">
                           <input
                               className="popup__field popup__field_type_avatar"
                               id="avatar-input"
                               ref={avatarReference}
                               type="url"
                               name="avatar"
                               placeholder="Укажите ссылку на аватар"
                               required
                           />
                           <span className="error avatar-input-error"></span>
                       </fieldset>}/>
    )
}

export default EditAvatarPopup;