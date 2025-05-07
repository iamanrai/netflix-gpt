import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { GOOGLE_LOGO, NETFLIX_BG_IMAGE, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      //SignUp logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // SignIn Logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // eslint-disable-next-line
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  // Forgot Button Logic

  const handleForgotButtonClick = () => {
    sendPasswordResetEmail(auth, email.current.value)
      .then(() => {
        console.log(email.current.value);
        alert("Password rest link send to your email id");
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "+" + errorMessage);
        // ..
      });
  };

  // Sign In with Google

  const handleGoogleSignInButtonClick = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // eslint-disable-next-line
        const token = credential.accessToken;
        const user = result.user;

        updateProfile(user, {
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
          })
          .catch((error) => {
            setErrorMessage(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        setErrorMessage(
          errorCode + "-" + errorMessage + "-" + email + "-" + credential
        );
        // ...
      });
  };

  return (
    <div>
      <Header />
      <div className="absolute w-full">
        <img
          src={NETFLIX_BG_IMAGE}
          alt="bg-img"
          className="max-w-fit bg-gradient-to-t from-black bg-opacity-40"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-md bg-opacity-80 text-white min-w-96"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In " : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full rounded-md bg-black bg-opacity-80 border-[1px]
        
          "
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email ID"
          className="p-4 my-2 w-full rounded-md bg-black bg-opacity-80 border-[1px]
        
          "
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full rounded-md bg-black bg-opacity-80 border-[1px]"
        />

        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

        <button
          className="w-full p-2 my-4 bg-red-600 rounded-md text-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In " : "Sign Up"}
        </button>

        {isSignInForm && <h2 className="text-center">OR</h2>}

        {isSignInForm && (
          <button
            className="w-full my-4 bg-neutral-800 p-2 rounded-md"
            onClick={handleGoogleSignInButtonClick}
          >
            <div className="flex items-center justify-center text-md">
              <img alt="googleLogo" src={GOOGLE_LOGO} className="w-10 px-2" />
              <p>Sign in with Google</p>
            </div>
          </button>
        )}
        {isSignInForm && (
          <div className="text-center">
            <button className="underline" onClick={handleForgotButtonClick}>
              Forgot password?
            </button>
          </div>
        )}

        {isSignInForm && (
          <div className="flex my-4 items-center">
            <input
              type="checkbox"
              className="w-4 h-4 bg-gray-100 border-gray-300"
            />
            <p className="pl-2">Remember me</p>
          </div>
        )}
        <div className="flex my-4">
          <p className="text-gray-400">
            {isSignInForm ? "New to Netflix? " : "Already registered?"}
          </p>
          <p className="font-bold cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm ? "Sign up now. " : "Sign in now."}
          </p>
        </div>
        <p className="text-xs text-gray-400">
          This page is protected by Google reCAPTCHA to
        </p>
        <p className="text-xs text-gray-400">ensure you're not a bot.</p>
        <p className="my-2 underline text-blue-700">Learn more.</p>
      </form>
    </div>
  );
};

export default Login;
