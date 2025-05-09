import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_AVATAR } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser);
        navigate("/");
      }
    });

    // Cleanup subscription on unmount
    // This is important to prevent memory leaks and to ensure that the listener is removed when the component unmounts
    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line
  }, []);

  return (
    <div className="absolute px-12 py-2 bg-gradient-to-b from-black w-full z-10 flex justify-between items-center">
      <img className="w-32" src={LOGO} alt="logo" />

      {user && (
        <div className="flex">
          <img
            alt="usericon"
            src={user?.photoURL || { USER_AVATAR }}
            className="w-10 h-10 rounded-sm object-cover"
          />
          <button onClick={handleSignOut} className="font-bold text-white px-2">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
