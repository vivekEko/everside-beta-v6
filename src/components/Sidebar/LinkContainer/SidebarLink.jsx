import React from "react";

const SidebarLink = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={` cursor-pointer  flex justify-start items-center mx-[8px] transition-all `}
    >
      {props.icon}
      <div className="text-[#000C08]  text-[12.5px] leading-[15px] ml-[10px] mr-2 font-medium opacity-70">
        {props.linkName}
      </div>
      <div
        className={`w-[4px] opacity-70  ${
          props.pageName === props.iconName ? "visible " : "invisible"
        } bg-[#00AC69] h-[32px] rounded-sm ml-auto  transition`}
      ></div>
    </div>
  );
};

export default SidebarLink;
