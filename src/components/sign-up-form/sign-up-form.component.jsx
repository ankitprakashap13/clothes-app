import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../util/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaulFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaulFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaulFormFields);
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await createAuthUserWithEmailAndPassword(formFields.email, formFields.password);
            const { user } = response;
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (e) {
            alert(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleOnSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    name="displayName"
                    onChange={handleChange}
                    value={displayName}
                />

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

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;