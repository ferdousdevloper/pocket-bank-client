import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hook/useAxiosPublic";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const FirebaseAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
  
    //create user
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    // sign in user
    const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    
  
    //logout
    const logout = () => {
      setUser(null);
      signOut(auth);
    };
  
    // observer
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
          setUser(currentUser);
          if (currentUser) {
              // get token and store client
              const userInfo = { email: currentUser.email };
              axiosPublic.post('/jwt', userInfo)
                  .then(res => {
                      if (res.data.token) {
                          localStorage.setItem('access-token', res.data.token);
                          setLoading(false);
                          console.log(res.data.token)
                          console.log(userInfo)
                      }
                  })
          }
          else {
              // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
              localStorage.removeItem('access-token');
              setLoading(false);
          }
          
      });
      return () => {
          return unsubscribe();
      }
  }, [axiosPublic])
  
    const allValues = {
      signInUser,
      createUser,
      loading,
      setLoading,
      user,
      logout,
    };
    return (
      <div>
        <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
      </div>
    );
  };
  
  export default FirebaseAuthProvider;