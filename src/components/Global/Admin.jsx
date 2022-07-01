import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import adminAtom from "../../recoil/atoms/adminAtom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRef } from "react";
import SearchIcons from "../../assets/img/global-img/searchIcon.svg";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import { BASE_API_LINK } from "../../utils/BaseAPILink";

const Admin = () => {
  const [adminStatus, setAdminStatus] = useRecoilState(adminAtom);

  const [callEditData, setCallEditData] = useState(false);

  const emailId = useRef();
  //   const lastName = useRef();

  const newUsername = useRef();
  const newPassword = useRef();
  const newConfirmPassword = useRef();

  const [editUser, setEditUser] = useState();

  //   const newChangePasswordRef = useRef();

  const [newChangePasswordValue, setNewChangePasswordValue] = useState();
  const [activeUser, setActiveUser] = useState();

  const [searchStatus, setSearchStatus] = useState(false);

  useEffect(() => {
    console.log("activeUser: ", activeUser);
  }, [activeUser]);

  const [usernameList, setUsernameList] = useState();

  const [successUserMessage, setSuccessUserMessage] = useState();
  const [errorUserMessage, setErrorUserMessage] = useState();

  useEffect(() => {
    console.log(errorUserMessage);
    console.log(successUserMessage);
  }, [successUserMessage, errorUserMessage]);

  // const usernameList = [
  //   {
  //     username: "vivekeko",
  //   },
  //   {
  //     username: "danieleko",
  //   },
  //   {
  //     username: "amriteko",
  //   },
  //   {
  //     username: "joeleko",
  //   },
  //   {
  //     username: "abhayeko",
  //   },
  //   {
  //     username: "tabithaeko",
  //   },
  // ];

  useEffect(() => {
    fetch(BASE_API_LINK + "userList", {
      mode: "cors",
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("userList Api response:");
        console.log(result);
        setUsernameList(result?.user_list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (editUser?.length > 0) {
      const formData = new FormData();
      formData.append("username", editUser);
      formData.append("password", newChangePasswordValue);

      fetch(BASE_API_LINK + "resetPassword", {
        mode: "cors",
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.Message === "TRUE") {
            alert("user edited");
            setNewChangePasswordValue();
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, [callEditData]);

  const createUserHandler = (e) => {
    e.preventDefault();

    setSuccessUserMessage();
    setErrorUserMessage();

    const emailIdValue = emailId.current.value;
    const newUserNameValue = newUsername.current.value;
    const newPasswordValue = newPassword.current.value;

    if (
      emailIdValue?.length > 0 &&
      newUserNameValue?.length > 0 &&
      newPasswordValue?.length > 0
    ) {
      const formData = new FormData();
      formData.append("email", emailIdValue);
      formData.append("username", newUserNameValue);
      formData.append("password", newPasswordValue);

      fetch(BASE_API_LINK + "createUser", {
        mode: "cors",
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);

          if (result?.Message === "TRUE") {
            setSuccessUserMessage("User created sucessfully.");
            // alert("user created");
          }
          if (result?.Error) {
            setErrorUserMessage(result?.Error);
            // alert("user created");
          }
        })
        .catch((error) => {
          // alert(error);

          setErrorUserMessage("Something went wrong, please try again!");
        });
    }
  };

  return (
    <div className="bg-white p-4 z-[3000] rounded-md  transition-all modal-animation">
      {/* modal heading */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-gray-700 text-lg font-semibold">Manage User</h1>
        <CloseRoundedIcon
          fontSize="small"
          className="text-gray-500 cursor-pointer transition hover:scale-[1.2]"
          onClick={() => setAdminStatus(false)}
        />
      </div>

      {/* modal body */}

      <div className="flex gap-5  max-w-[700px]">
        {/* user info form */}
        <div className="   flex-[0.4] ">
          <h1 className=" text-gray-500  w-[90%] mb-5">Add User</h1>

          <form>
            <input
              type="email"
              placeholder="Email"
              required
              ref={emailId}
              className="h-12 w-full outline-none px-5 mb-5 bg-[#0000000c]  text-black border-b-2 border-opacity-0 focus:border-opacity-100 border-[#359b73] rounded "
            />

            <input
              type="text"
              placeholder="Set New Username"
              required
              ref={newUsername}
              className="h-12 w-full outline-none px-5 mb-5 bg-[#0000000c]  text-black border-b-2 border-opacity-0 focus:border-opacity-100 border-[#359b73] rounded "
            />
            <input
              type="password"
              placeholder="Set New Password"
              required
              ref={newPassword}
              className="h-12 w-full outline-none px-5 mb-5 bg-[#0000000c]  text-black border-b-2 border-opacity-0 focus:border-opacity-100 border-[#359b73] rounded "
            />

            {successUserMessage && (
              <div className={"text-[#00ac69] text-xs pb-2 "}>
                {successUserMessage}
              </div>
            )}

            {errorUserMessage && (
              <div className="text-red-500 text-xs errorAnimation pb-2">
                {errorUserMessage}
              </div>
            )}

            <div
              onClick={createUserHandler}
              className={`
                bg-[#359b73] active:scale-95 hover:bg-opacity-80
             
                text-white  w-full p-3 border-0 hover:border-0 outline-none transition-all rounded-md  flex justify-center items-center`}
              variant="outlined"
            >
              <span>Create New User</span>
            </div>
          </form>
        </div>

        {/* user list */}
        <div className="flex-[0.6]  ">
          <div className="mb-5 flex justify-between">
            <h1 className=" text-gray-500 ">Current User List</h1>

            <div className=" rounded-md  flex justify-end items-center ">
              <input
                type="text"
                placeholder="Search.."
                className={` outline-none  transition-all pl-2 text-xs  pb-1 w-[80px] sm:w-[100px] ${
                  searchStatus
                    ? "xl:w-[100%] ease-in  xl:border-b-[1px]"
                    : "xl:w-[0%] ease-out "
                }`}
                //   onChange={handleInput}
                //   value={inputData}
              />

              <img
                src={SearchIcons}
                alt="searchIcon"
                className="px-2 cursor-pointer"
                onClick={() => setSearchStatus(!searchStatus)}
              />
            </div>
          </div>

          <div>
            <div className="grid grid-cols-[8%,25%,40%,20%] gap-2 border-b pb-1">
              <div className="text-gray-400 text-sm  text-center">SN</div>
              <div className="text-gray-400 text-sm ">Username</div>
              <div className="text-gray-400 text-sm ">Password</div>
              <div className="text-gray-400 text-sm text-center">Action</div>
            </div>

            <div className="h-[230px] overflow-y-scroll scrollbar-hide">
              {usernameList?.map((data, index) => (
                <div className="grid grid-cols-[8%,25%,40%,20%] pb-1 items-center  gap-2  ">
                  <div className="text-gray-400 text-center  py-2 my-2">
                    {index + 1}
                  </div>
                  <div className="py-2 my-2 text-sm">{data}</div>

                  <input
                    // ref={newChangePasswordRef}
                    type="text"
                    placeholder="Set New Password"
                    className="py-2 my-2 outline-none text-sm"
                    onChange={(e) => setNewChangePasswordValue(e.target.value)}
                    onClick={() => setActiveUser(data)}

                    // onChange={(e) => setEditUser(e.target.value)}
                  />

                  <button
                    className={` p-2  text-white rounded-md flex items-center justify-center text-center transition   ${
                      activeUser === data && newChangePasswordValue
                        ? "bg-[#43a1ff] cursor-pointer active:scale-95"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (activeUser === data && newChangePasswordValue) {
                        setEditUser(data);
                        setCallEditData(!callEditData);
                      }
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                    <span className="ml-2">Edit</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

// bg-[#43a1ff]
