import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const useSignIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("1")
    // const auth = getAuth();

    console.log("2", auth)
    const provider = new GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // provider.setCustomParameters({ 'login_hint': '
    console.log("clicked SignIn")
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // setUser(user);
            dispatch(userInfo(user))
            localStorage.setItem("userLocal", JSON.stringify(user))
            return user
            console.log("user ", user)
            alert("Login Successfull")
            navigate("/")
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("error login", errorCode, errorMessage, email, credential)
            return errorCode;
            // ...
        });
}

export default useSignIn;