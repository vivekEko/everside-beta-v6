import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import CompanyLogo from "../../assets/img/global-img/everside_logo.svg";
import UserAuthAtom from "../../recoil/atoms/UserAuthAtom";
import { BASE_API_LINK } from "../../utils/BaseAPILink";
import UserValidity from "../../recoil/atoms/UserValidity";
import goButtonStatus from "../../recoil/atoms/goButtonStatus";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useNavigate } from "react-router-dom";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { SyncLoader } from "react-spinners";
import activeInnerPage from "../../recoil/atoms/activeInnerPage";
import activeFilterButton from "../../recoil/atoms/activeFilterButton";

const Auth = () => {
  const signInEmailRef = useRef(null);
  const signInPasswordRef = useRef(null);
  const [user, setUser] = useRecoilState(UserAuthAtom);
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);
  const [userIsValid, setUserIsValid] = useRecoilState(UserValidity);
  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);
  const [loader, setLoader] = useState(false);
  const [activePageValue, setActivePageValue] = useRecoilState(activeInnerPage);

  useEffect(() => {
    setGoStatus(!goStatus);
  }, []);

  //   States
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const formData = new FormData();
  const navigate = useNavigate();

  //   Signin handler
  const signInHandler = (e) => {
    e.preventDefault();
    setLoginErrorMessage(null);
    setLoader(true);

    if (
      signInEmailRef?.current?.value?.length > 0 &&
      signInPasswordRef?.current?.value?.length > 0
    ) {
      const userEmail = signInEmailRef.current.value?.toLowerCase();
      const userPassword = signInPasswordRef.current.value;

      formData.append("username", userEmail);
      formData.append("password", userPassword);

      fetch(baseAPI + "userLogin", {
        mode: "cors",
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.Message === "TRUE") {
            setLoginErrorMessage(null);
            localStorage.setItem("adminType", result.admin_type);
            sessionStorage.setItem("useStatus", result.Message);
            sessionStorage.setItem("username", result.username);
            sessionStorage.setItem("token", result.token);
            setUserIsValid("TRUE");
            navigate("/");
            setActivePageValue("NPS_Overall");
            // window.location.reload(false);
            setLoader(false);
          } else if (result.Message === "FALSE") {
            setUserIsValid(null);
            setLoginErrorMessage(null);
            // setLoginErrorMessage("Incorrect credentials, please try again.");

            setTimeout(() => {
              setLoginErrorMessage("Incorrect credentials, please try again.");
              setLoader(false);
            }, 1);
          }
        })
        .catch((error) => {
          setLoginErrorMessage(null);
          setTimeout(() => {
            setLoginErrorMessage("Something went wrong, please try again.");
            setLoader(false);
          }, 1);
        });
    } else {
      setLoginErrorMessage(null);
      setTimeout(() => {
        setLoginErrorMessage("Please fill all the fields.");
        setLoader(false);
      }, 1);
    }
  };

  return (
    <section className="grid place-items-center h-screen bg-[whitesmoke] text-white cursor-default absolute top-0 bottom-0 right-0 left-0 z-[999]">
      <div className="p-[20px]  text-center bg-white rounded-lg drop-shadow-lg w-[90%] max-w-[300px]">
        <div className="flex justify-center  mb-[50px]">
          <img
            className="h-[80px] w-[200px]  grayscale-[40%]"
            src={CompanyLogo}
            alt="Everside Logo"
          />
        </div>

        <div className="">
          <form className="max-w-[250px] mx-auto">
            <input
              ref={signInEmailRef}
              type="text"
              placeholder="Username"
              required
              className="h-12 w-full outline-none px-5 mb-5 bg-[#00000025]  text-black border-b-2 border-opacity-0 focus:border-opacity-100 border-[#359b73] rounded "
            />
            <input
              ref={signInPasswordRef}
              type="password"
              placeholder="Password"
              required
              className={` ${
                loginErrorMessage ? "mb-3" : "mb-9"
              } h-12 w-full outline-none px-5  bg-[#00000025] text-black border-b-2 border-opacity-0 focus:border-opacity-100 border-[#359b73] rounded `}
            />
            <p
              className={`mb-2 text-[10px] text-left text-red-500 flex justify-start items-center gap-2 error ${
                loginErrorMessage ? "block" : "hidden"
              }`}
            >
              <ErrorOutlineRoundedIcon fontSize="small" />
              {loginErrorMessage}
            </p>
            <button
              className="bg-[#359b73] text-white hover:bg-opacity-80 w-full p-3 border-0 hover:border-0 outline-none transition-all rounded-md active:scale-95 flex justify-center items-center"
              variant="outlined"
              onClick={signInHandler}
            >
              {loader ? (
                <SyncLoader speedMultiplier={0.7} color="#fff" size={5} />
              ) : (
                <span>Log in</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Auth;
