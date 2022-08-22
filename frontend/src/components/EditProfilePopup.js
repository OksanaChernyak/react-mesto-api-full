import {useState, useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = useState("John Doe");
    const [description, setDescription] = useState("Nobody");
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        currentUser.name !== undefined && setName(currentUser.name);
        currentUser.about !== undefined && setDescription(currentUser.about)
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name, about: description
        })
    }

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name="edit-form"
                       title="Редактировать профиль" btnText="Сохранить"
                       children={<fieldset className="popup__fields">
                           <input
                               className="popup__field popup__field_type_name"
                               id="name-input"
                               type="text"
                               value={name}
                               onChange={handleNameChange}
                               placeholder="Введите имя"
                               minLength="2"
                               maxLength="40"
                               required
                           />
                           <span className="error name-input-error"></span>
                           <input
                               className="popup__field popup__field_type_description"
                               id="description-input"
                               type="text"
                               value={description}
                               onChange={handleDescriptionChange}
                               placeholder="Укажите профессию"
                               minLength="2"
                               maxLength="200"
                               required
                           />
                           <span className="error description-input-error"></span>
                       </fieldset>}/>
    );
}

export default EditProfilePopup;