import {useState} from "react";
import {Link} from "react-router-dom";

function Register({handleRegister}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(email, password);
    };

    return (
        <div className="register">
            <form
                name="register"
                className="register__container"
                onSubmit={handleSubmit}
            >
                <h2 className="register__title">Регистрация</h2>
                <fieldset className="register__fields">
                    <input
                        className="register__field register__field_type_email"
                        type="email"
                        id="email-input"
                        value={email}
                        onChange={handleChangeEmail}
                        placeholder="Email"
                        required
                    />
                    <span className="error email-input-error"></span>
                    <input
                        className="register__field register__field_type_password"
                        id="password-input"
                        value={password}
                        onChange={handleChangePassword}
                        type="password"
                        placeholder="Пароль"
                        minLength="2"
                        maxLength="100"
                        required
                    />
                    <span className="error password-input-error"></span>
                    <button
                        className="register__submit-button"
                        type="submit"
                        aria-label="Зарегистрироваться"
                    >Зарегистрироваться
                    </button>
                </fieldset>

            </form>
            <div className="register__signup">
                <p className="register__text">Уже зарегистрированы?</p>
                <Link to="/signin" className="register__signin-link">Войти</Link>
            </div>
        </div>
    );
}

export default Register;