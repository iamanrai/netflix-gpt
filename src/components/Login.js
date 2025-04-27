import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/98df3030-1c2b-4bd1-a2f5-13c611857edb/web/IN-en-20250331-TRIFECTA-perspective_247b6f06-c36d-4dff-a8eb-4013325c3f8e_large.jpg"
          alt="bg-img"
          className="bg-cover bg-gradient-to-t from-black bg-opacity-40"
        />
      </div>
      <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-md bg-opacity-80 text-white min-w-96">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In " : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full rounded-md bg-black bg-opacity-80 border-[1px]
        
          "
          />
        )}
        <input
          type="text"
          placeholder="Email or mobile number"
          className="p-4 my-2 w-full rounded-md bg-black bg-opacity-80 border-[1px]
        
          "
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full rounded-md bg-black bg-opacity-80 border-[1px]"
        />
        <button className="w-full p-2 my-4 bg-red-600 rounded-md">
          {isSignInForm ? "Sign In " : "Sign Up"}
        </button>

        {isSignInForm && <h2 className="text-center">OR</h2>}

        {isSignInForm && (
          <button className="w-full p-2 my-4 bg-gray-600 rounded-md bg-opacity-70">
            Use a sign-in code
          </button>
        )}
        {isSignInForm && (
          <div className="text-center">
            <p className="underline">Forgot password?</p>
          </div>
        )}

        {isSignInForm && (
          <div className="flex my-4">
            <input type="checkbox" />
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
        <Link className="my-2 underline text-blue-700">Learn more.</Link>
      </form>
    </div>
  );
};

export default Login;
