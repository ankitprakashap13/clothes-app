import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
} from "../../util/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUserWithPopup = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div className="sign-in">
            Sign in
            <button onClick={logGoogleUserWithPopup}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    );
}

export default SignIn;
