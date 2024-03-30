import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import man from "../../assets/extra/man.png";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {
  SearchContextProvider,
  useSearch,
} from "../../pages/Search/SearchContext/SearchContext";
import NotificationModel from "../Modals/NotificationModal/NotificationModel";
import ProfileModel from "../Modals/ProfileModal/ProfileModal";
import { Bell, BellDot, CircleUserRound } from "lucide-react";

function Header({ expanded, setExpanded }) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { updateSearch } = useSearch();
  const [notificationIcon, setNotificationIcon] = useState(false);

  const handleOpen = () => {
    setShowNotificationModal((curr) => !curr);
    setNotificationIcon((curr) => !curr);
    // console.log(showNotificationModal);
  };
  const handleProfileOpen = () => {
    setShowProfileModal((curr) => !curr);
    // console.log(showNotificationModal);
  };

  return (
    <SearchContextProvider>
      <div className="w-full h-16 sticky bg-[#05B058] shadow-lg flex justify-between items-center px-5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-100"
        >
          {expanded ? <CiMenuBurger /> : <CiMenuBurger />}
        </button>
        <form
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/search");
            // console.log(search);
            updateSearch(search);
          }}
          className="flex justify-between items-center w-1/2 md:w-3/5 lg:w-2/5 xl:w-1/3"
        >
          <input
            type="text"
            id="search"
            name="search"
            value={search}
            placeholder="Search Now"
            className="shadow-lg appearance-none border-2 rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSearch(e.target.value)}
          />
          <CiSearch className="absolute text-2xl text-gray-700 mx-2  self-center" />
        </form>
        <div className="w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 flex justify-end items-center space-x-4">
          {notificationIcon ? (
            <Bell className="text-white cursor-pointer" />
          ) : (
            <BellDot
              className="text-white cursor-pointer"
              onClick={handleOpen}
            />
          )}
          {/* <FaBell
            className="text-gray-100 hover:text-white cursor-pointer"
            size={24}
            onClick={handleOpen}
          /> */}
          <NotificationModel
            open={showNotificationModal}
            handleOpen={handleOpen}
          />
          <CircleUserRound
            className="text-white cursor-pointer"
            onClick={handleProfileOpen}
          />
          {/* <img
            src={man}
            alt="Profile"
            className="w-8 h-8 rounded-full hover:shadow-xl cursor-pointer"
            onClick={handleProfileOpen}
          /> */}
          <ProfileModel
            open={showProfileModal}
            handleOpen={handleProfileOpen}
          />
        </div>
      </div>
      {/* for getting the search string... */}
    </SearchContextProvider>
  );
}

export default Header;
