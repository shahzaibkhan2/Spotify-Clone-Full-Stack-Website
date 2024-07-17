import { useContext } from "react";
import { GiCrossMark } from "react-icons/gi";
import { PlayerContext } from "../../context/PlayerContext";

const SignUpLogin = () => {
  const {
    currentState,
    setCurrentState,
    setShowLogin,
    onLogin,
    nameRef,
    emailRef,
    passRef,
  } = useContext(PlayerContext);

  return (
    <main className="h-screen w-screen absolute top-0 bg-black bg-opacity-80 grid place-content-center z-50">
      <form
        className="w-96 px-8 py-6 bg-white bg-opacity-90 text-black h-max rounded-2xl"
        onSubmit={onLogin}
      >
        <div className="flex justify-between mb-6">
          <h2 className="font-bold text-3xl">{currentState}</h2>
          <GiCrossMark
            onClick={() => setShowLogin(false)}
            className="w-6 h-7 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-10">
          {currentState === "Sign Up" && (
            <input
              className="border  rounded-lg border-gray-400 outline-[#f95d70] p-3"
              name="name"
              ref={nameRef}
              type="text"
              placeholder="Your Name..."
              required
            />
          )}
          <input
            className="border  rounded-lg border-gray-400 outline-[#f95d70] p-3"
            name="email"
            ref={emailRef}
            type="email"
            placeholder="Your Email..."
            required
          />
          <input
            className="border  rounded-lg border-gray-400 outline-[#f95d70] p-3"
            name="password"
            ref={passRef}
            type="password"
            placeholder="Your Password..."
            required
          />
        </div>
        <button
          className="bg-black text-white px-9 py-2 my-4 rounded-lg"
          type="submit"
        >
          {currentState === "Sign Up" ? "Sign Up" : "Login"}
        </button>
        <div className="flex gap-2">
          <input
            className="mt-[-22px] cursor-pointer"
            type="checkbox"
            required
          />
          <p>By proceeding, I agree to the terms of use and privacy policy. </p>
        </div>
        {currentState === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              className="cursor-pointer text-[#f95d70]"
              onClick={() => setCurrentState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              className="cursor-pointer text-[#f95d70]"
              onClick={() => setCurrentState("Sign Up")}
            >
              Create here
            </span>
          </p>
        )}
      </form>
    </main>
  );
};

export default SignUpLogin;
