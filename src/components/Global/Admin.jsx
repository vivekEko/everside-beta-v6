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

  const [deleteModal, setDeleteModal] = useState();

  const [callEditData, setCallEditData] = useState(false);

  const emailId = useRef();
  //   const lastName = useRef();

  const newUsername = useRef();
  const newPassword = useRef();
  const newConfirmPassword = useRef();

  const [editUser, setEditUser] = useState();

  const newChangePasswordRef = useRef([]);

  const [newChangePasswordValue, setNewChangePasswordValue] = useState();
  const [activeUser, setActiveUser] = useState();

  const [searchStatus, setSearchStatus] = useState(false);

  const [usernameList, setUsernameList] = useState();
  const [callUsernameList, setCallUsernameList] = useState(false);

  const [successUserMessage, setSuccessUserMessage] = useState();
  const [errorUserMessage, setErrorUserMessage] = useState();

  const [editFinalMessage, setEditFinalMessage] = useState();
  const [deleteFinalMessage, setDeleteFinalMessage] = useState();

  useEffect(() => {
    console.log("newChangePasswordRef:");
    console.log(newChangePasswordRef);
  }, [newChangePasswordRef]);

  // user list api
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
  }, [callUsernameList]);

  // edit user api
  useEffect(() => {
    if (editUser?.length > 0 && callEditData === true) {
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
          setNewChangePasswordValue("");
          if (result.Message === "TRUE") {
            // alert("user edited");
            setNewChangePasswordValue();
            setCallEditData(false);
            setCallUsernameList(!callUsernameList);
            setEditFinalMessage("Password updated");

            setTimeout(() => {
              setEditFinalMessage(null);
            }, 3000);
          }
        })
        .catch((error) => {
          alert(error);
          setCallEditData(false);
        });
    }
  }, [callEditData]);

  // create new user api
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

          // emailId.current.value = "";
          // newUsername.current.value = "";
          // newPassword.current.value = "";

          if (result?.Message === "TRUE") {
            setSuccessUserMessage("User created sucessfully.");
            setCallUsernameList(!callUsernameList);

            emailId.current.value = "";
            newUsername.current.value = "";
            newPassword.current.value = "";
          }
          if (result?.Error) {
            setErrorUserMessage(result?.Error);
          }
        })
        .catch((error) => {
          // alert(error);
        });
    } else {
      setErrorUserMessage("Please fill all the fields.");
    }
  };

  // delete user
  const handleDelete = () => {
    const formData = new FormData();
    formData.append("username", activeUser);

    fetch(BASE_API_LINK + "deleteUser", {
      mode: "cors",
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.Message === "TRUE") {
          setCallUsernameList(!callUsernameList);

          setDeleteModal(false);
          setDeleteFinalMessage("User deleted");

          setTimeout(() => {
            setDeleteFinalMessage(null);
          }, 3000);
        }
      })
      .catch((error) => {
        alert(error);
        setCallUsernameList(!callUsernameList);
      });
  };

  const [inputData, setInputData] = useState("");

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  return (
    <div className="bg-white p-4 z-[3000] rounded-md  transition-all modal-animation  w-[90%] max-w-[900px] relative">
      {/* confirmation overlay */}
      <div
        className={`bg-white shadow-2xl p-5 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded  absolute border-gray-400 border ${
          deleteModal ? "block" : "hidden"
        }`}
      >
        <h1>
          Are you sure you want to delete{" "}
          <span className="font-semibold">"{activeUser}"</span> ?
        </h1>

        <div className="flex items-center justify-center gap-2 mt-5">
          <button
            onClick={handleDelete}
            className="bg-green-500 text-white rounded p-1 w-[60px]"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setDeleteModal(false);
            }}
            className="bg-red-500 text-white rounded p-1 w-[60px]"
          >
            No
          </button>
        </div>
      </div>

      {/* ${
          editFinalMessage || deleteFinalMessage ? "block" : "hidden"
        } */}
      {/* Edit and delete */}
      <div
        className={`bg-white  p-5 top-[5%] left-[60%]  rounded  absolute border-gray-400  ${
          editFinalMessage || deleteFinalMessage ? "block" : "hidden"
        }`}
      >
        {editFinalMessage && (
          <div className="text-sm text-green-500">{editFinalMessage}</div>
        )}
        {deleteFinalMessage && (
          <div className="text-sm text-red-500">{deleteFinalMessage}</div>
        )}
      </div>

      {/* modal heading */}
      <div className="flex justify-between items-center mb-5 ">
        <h1 className="text-gray-700 text-lg font-semibold">Manage User</h1>
        <CloseRoundedIcon
          fontSize="small"
          className="text-gray-500 cursor-pointer transition hover:scale-[1.2]"
          onClick={() => {
            setAdminStatus(false);

            setSuccessUserMessage();
            setErrorUserMessage();
            emailId.current.value = "";
            newUsername.current.value = "";
            newPassword.current.value = "";
          }}
        />
      </div>

      {/* modal body */}

      <div className="flex flex-col sm:flex-row gap-5   ">
        {/* user info form */}
        <div className="   flex-[0.4]  ">
          <h1 className=" text-gray-500  w-[90%] mb-5 ">Add User</h1>

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
              <div className={"text-[#00ac69] text-xs pb-2 error"}>
                {successUserMessage}
              </div>
            )}

            {errorUserMessage && (
              <div className="text-red-500 text-xs error pb-2">
                {errorUserMessage}
              </div>
            )}

            <div
              onClick={createUserHandler}
              className={`
                bg-[#359b73] active:scale-95 hover:bg-opacity-80
             cursor-pointer
                text-white  w-full p-3 border-0 hover:border-0 outline-none transition-all rounded-md  flex justify-center items-center`}
              variant="outlined"
            >
              <span>Create New User</span>
            </div>
          </form>
        </div>

        {/* user list */}
        <div className="flex-[0.6]  ">
          <div className="mb-5 flex justify-between items-center">
            <h1 className=" text-gray-500 ">Current User List</h1>

            <div className=" rounded-md  flex justify-end items-center ">
              <input
                type="text"
                placeholder="Search.."
                className={` outline-none  transition-all pl-2 text-sm  pb-1 w-[80px] sm:w-[100px] ${
                  searchStatus
                    ? "xl:w-[100%] ease-in  xl:border-b-[1px]"
                    : "xl:w-[0%] ease-out "
                }`}
                onChange={handleInput}
                value={inputData}
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
              {usernameList
                ?.filter((filtered_value) => {
                  if (inputData === "") {
                    return filtered_value;
                  } else if (
                    filtered_value
                      ?.toLowerCase()
                      ?.includes(inputData?.toLowerCase())
                  ) {
                    return filtered_value;
                  }
                })
                ?.map((data, index) => (
                  <div
                    key={data}
                    className="grid grid-cols-[8%,25%,40%,27%] pb-1 items-center  gap-2  "
                  >
                    <div className="text-gray-400 text-center  py-2 my-2">
                      {index + 1}
                    </div>
                    <div className="py-2 my-2 text-sm">{data}</div>

                    <input
                      id="changePasswordInputField"
                      type="password"
                      placeholder="Set New Password"
                      className="py-2 my-2 outline-none border-b w-[90%] text-sm"
                      value={activeUser === data ? newChangePasswordValue : ""}
                      onChange={(e) => {
                        setNewChangePasswordValue(e.target.value);
                      }}
                      onClick={() => {
                        setNewChangePasswordValue();
                        setActiveUser(data);
                      }}

                      // onChange={(e) => setEditUser(e.target.value)}
                    />

                    <div className="flex items-center gap-2 ">
                      <button
                        className={` p-2   rounded-md flex items-center justify-center text-center transition   ${
                          activeUser === data && newChangePasswordValue
                            ? "bg-[#43a1ff] text-white cursor-pointer active:scale-95"
                            : "bg-gray-300 text-gray-800 cursor-not-allowed"
                        }`}
                        onClick={(e) => {
                          if (activeUser === data && newChangePasswordValue) {
                            setEditUser(data);
                            setCallEditData(true);

                            // setNewChangePasswordValue("");

                            // console.log(newChangePasswordValue);
                          }
                        }}
                      >
                        {/* <EditOutlinedIcon fontSize="small" /> */}
                        <span className="text-xs">Update</span>
                      </button>

                      <button
                        className={` p-2  text-white rounded-md flex items-center justify-center text-center transition   bg-red-500 cursor-pointer active:scale-95 `}
                        onClick={() => {
                          setActiveUser(data);
                          setDeleteModal(true);
                        }}
                      >
                        {/* <EditOutlinedIcon fontSize="small" /> */}
                        <span className="text-xs">Delete</span>
                      </button>
                    </div>
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
