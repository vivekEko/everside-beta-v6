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

  const [searchStatus, setSearchStatus] = useState(false);

  const usernameList = [
    {
      username: "vivekeko",
    },

    {
      username: "danieleko",
    },
    {
      username: "amriteko",
    },
    {
      username: "joeleko",
    },
    {
      username: "abhayeko",
    },
    {
      username: "tabithaeko",
    },
  ];

  useEffect(() => {
    console.log("editUser:", editUser);

    console.log("password");
    console.log(newChangePasswordValue);

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

    const emailIdValue = emailId.current.value;
    const newUserNameValue = newUsername.current.value;
    const newPasswordValue = newPassword.current.value;

    console.log("emailIdValue");
    console.log(emailIdValue);
    console.log("newUserNameValue");
    console.log(newUserNameValue);
    console.log("newPasswordValue");
    console.log(newPasswordValue);

    if (
      emailIdValue?.length > 0 &&
      newUserNameValue?.length > 0 &&
      newPasswordValue > 0
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
          if (result.Message === "TRUE") {
            alert("user created");
          }
        })
        .catch((error) => {
          alert(error);
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

      <div className="flex gap-5">
        {/* user info form */}
        <div className="w-[50%]">
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

            <button
              onClick={createUserHandler}
              className="bg-[#359b73] text-white hover:bg-opacity-80 w-full p-3 border-0 hover:border-0 outline-none transition-all rounded-md active:scale-95 flex justify-center items-center"
              variant="outlined"
            >
              <span>Create New User</span>
            </button>
          </form>
        </div>

        {/* user list */}
        <div className="w-[50%]">
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
            <div className="grid grid-cols-[50px_150px_150px_150px] gap-2 border-b pb-1">
              <div className="text-gray-400  text-center">SN</div>

              <div className="text-gray-400 ">Username</div>
              <div className="text-gray-400 ">Password</div>
              <div className="text-gray-400 ">Action</div>
            </div>

            <div className="h-[230px] overflow-y-scroll scrollbar-hide">
              {usernameList?.map((data, index) => (
                <div className="grid grid-cols-[50px_150px_150px_150px] pb-1 items-center  gap-2 ">
                  <div className="text-gray-400 text-center  py-2 my-2">
                    {index + 1}
                  </div>
                  <div className="py-2 my-2 ">{data?.username}</div>

                  <input
                    // ref={newChangePasswordRef}
                    type="text"
                    placeholder="Set New Password"
                    className="py-2 my-2 outline-none "
                    onChange={(e) => setNewChangePasswordValue(e.target.value)}

                    // onChange={(e) => setEditUser(e.target.value)}
                  />

                  <button
                    className=" p-2 bg-[#43a1ff] text-white rounded-md flex items-center justify-center text-center transition active:scale-95 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditUser(data?.username);

                      setCallEditData(!callEditData);
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
