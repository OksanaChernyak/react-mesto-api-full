import {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    useEffect(() => {
        return () => {
            setName("");
            setLink("")
        }
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        })
    }

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name="add-form"
                       title="Новое место" btnText="Создать" children={<fieldset className="popup__fields">
            <input
                className="popup__field popup__field_type_place"
                id="place-input"
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Введите название места"
                minLength="2"
                maxLength="30"
                required
            />
            <span className="error place-input-error"></span>
            <input
                className="popup__field popup__field_type_link"
                id="link-input"
                type="url"
                name="link"
                onChange={handleLinkChange}
                value={link}
                placeholder="Укажите ссылку на картинку"
                required
            />
            <span className="error link-input-error"></span>
        </fieldset>}/>
    )
}

export default AddPlacePopup;