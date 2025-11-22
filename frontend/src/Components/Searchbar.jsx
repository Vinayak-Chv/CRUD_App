import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";

const SearchBar = ({ onSearch, onFilter }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleSelect = (value) => {
    onFilter(value);
    setOpen(false);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-full max-w-[600px]">

      {/* Search Container */}
      <div className="flex items-center bg-[#EFECE3]/20 border border-[#8FABD4]/30
        rounded-2xl px-4 py-3 hover:scale-[1.03] hover:shadow-lg 
        hover:shadow-[#4A70A9]/20 transition-all duration-300">

        <FiSearch className="text-[#8FABD4] mr-3" size={20} />

        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={handleInput}
          className="bg-transparent w-full text-[#EFECE3] 
          placeholder-[#EFECE3]/60 outline-none"
        />

        <div
          className="flex items-center ml-4 cursor-pointer 
          text-[#8FABD4] hover:text-[#EFECE3]"
          onClick={() => setOpen(!open)}
        >
          <span className="mr-2 text-[#8FABD4]/50">|</span>
          <IoPersonCircleOutline size={24} />
        </div>

      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-[#EFECE3]/90 
          border border-[#8FABD4]/40 rounded-md shadow-lg text-black">

          <div 
            className="px-4 py-2 hover:bg-[#8FABD4]/30 cursor-pointer"
            onClick={() => handleSelect("user")}
          >
            User
          </div>

          <div 
            className="px-4 py-2 hover:bg-[#8FABD4]/30 cursor-pointer"
            onClick={() => handleSelect("admin")}
          >
            Admin
          </div>

          <div 
            className="px-4 py-2 hover:bg-[#8FABD4]/30 cursor-pointer rounded-b-xl"
            onClick={() => handleSelect("all")}
          >
            All
          </div>

        </div>
      )}

    </div>
  );
};

export default SearchBar;
