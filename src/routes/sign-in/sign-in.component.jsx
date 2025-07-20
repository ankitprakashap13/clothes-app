import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../util/firebase/firebase.utils";


const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div className="sign-in">
            Sign in
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    );
}

export default SignIn;
