import { LuUtensilsCrossed } from "react-icons/lu";
import { useRef } from "react";
import { GiCrossMark } from "react-icons/gi";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpLogin = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const onLogin = async (event) => {
    event.preventDefault();
    let newUri = envVars.userServerUri;
    if (currentState === "Login") {
      newUri += "/login";
      const response = await axios.post(newUri, {
        password: passRef.current.value,
        email: emailRef.current.value,
      });

      if (response.data.success) {
        dispatch(stateActions.setAccessToken(response.data.data.accessToken));
        localStorage.setItem("accessToken", response.data.data.accessToken);
        dispatch(stateActions.setShowLogin(false));
        navigate("/");
        dispatch(stateActions.setMenu("home"));
      }
    } else {
      newUri += "/register";
      const response = await axios.post(newUri, {
        name: nameRef.current.value,
        password: passRef.current.value,
        email: emailRef.current.value,
      });

      if (response.data.success) {
        dispatch(stateActions.setShowLogin(false));
        navigate("/");
        dispatch(stateActions.setMenu("home"));
        console.log("Sign up successful !");
      }
    }
  };

  return (
    <div>
      <form onSubmit={onLogin}>
        <div>
          <h2>{currentState}</h2>
          <GiCrossMark />
        </div>
        <div>
          {currentState === "Sign Up" && (
            <input
              name="name"
              ref={nameRef}
              type="text"
              placeholder="Your Name..."
              required
            />
          )}
          <input
            name="email"
            ref={emailRef}
            type="email"
            placeholder="Your Email..."
            required
          />
          <input
            name="password"
            ref={passRef}
            type="password"
            placeholder="Your Password..."
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Sign Up" : "Login"}
        </button>
        <div>
          <input type="checkbox" required />
          <p>By proceeding, I agree to the terms of use and privacy policy. </p>
        </div>
        {currentState === "Sign Up" ? (
          <p>
            Already have an account?
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        ) : (
          <p>
            Create a new account?
            <span onClick={() => setCurrentState("Sign Up")}>Create here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUpLogin;
