import React, { useState } from "react";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {
  SearchContextProvider,
  useSearch,
} from "../../pages/Search/SearchContext/SearchContext";
import NotificationModel from "../Modals/NotificationModal/NotificationModel";
import ProfileModal from "../Modals/ProfileModal/ProfileModal";
function Header({ expanded, setExpanded }) {
  const [options, setOptions] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { updateSearch } = useSearch();
  const [notificationIcon, setNotificationIcon] = useState(false);

  const [selection, setSelection] = useState(null);
  const handleSelect = (option) => {
    setSelection(option);
  };

  const handleProfileOpen = () => {
    setShowProfileModal((curr) => !curr);
  };

  return (
    <SearchContextProvider>
      <div className="w-full h-16 sticky bg-[#05B058] flex justify-between items-center px-5">
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
            setSearch("");
          }}
          className="flex justify-between items-center w-1/2 md:w-3/5 lg:w-2/5 xl:w-1/3"
        >
          <input
            type="text"
            id="search"
            name="search"
            value={search}
            placeholder="Search Now"
            className="shadow-sm appearance-none border-2 rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSearch(e.target.value)}
          />
          <CiSearch className="absolute text-2xl text-gray-700 mx-2  self-center" />
        </form>
        <div className="w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 flex justify-end items-center space-x-4">
          <ProfileModal
            options={options}
            value={selection}
            OnSelect={handleSelect}
            className="relative w-2/12"
          />
          <NotificationModel
            options={options}
            value={selection}
            OnSelect={handleSelect}
            className="relative w-2/12"
          />
        </div>
      </div>
      {/* for getting the search string... */}
    </SearchContextProvider>
  );
}

export default Header;
