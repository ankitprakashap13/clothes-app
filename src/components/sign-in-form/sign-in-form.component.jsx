import { useState } from "react";
import { signInAuthUser, signInWithGooglePopup } from "../../util/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

const defaulFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaulFormFields);
    const {email, password} = formFields;

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInAuthUser(email, password);
        } catch (e) {
            alert(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value});
    }

    return (
        <div className="sign-in-container">
            <h1>Sign in</h1>
            <form onSubmit={handleOnSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    name="email"
                    onChange={handleChange}
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    name="password"
                    onChange={handleChange}
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button
                        type="button"
                        buttonType='google'
                        onClick={signInWithGooglePopup}
                    >
                        Google Sign in
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;