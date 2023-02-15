import { useState, useRef, useEffect } from "react";
import DropdownMenu from "@/components/atoms/DropdownMenu/DropdownMenu";
import Button from "@/components/atoms/Button/Button";

const Dropdown = ({ type, selectedGenre, genreList }) => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Close dropdown when click outside dropdown box
    const checkIfClickedOutside = (e) => {
      if (
        isDropdownOpen &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target)
      ) {
        toggleDropdown();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdownOpen]);

  useEffect(() => {
    // Prevent user from scrolling (for when mobile list is open)
    document.body.classList.toggle("no-scroll", isDropdownOpen);
  }, [isDropdownOpen]);

  return (
    <div>
      <Button
        toggleDropdown={toggleDropdown}
        name={selectedGenre.name}
        dropdown
      />
      <DropdownMenu
        isDropdownOpen={isDropdownOpen}
        genreList={genreList}
        selectedGenre={selectedGenre}
        type={type}
        dropdownRef={dropDownRef}
        toggleDropdown={toggleDropdown}
      />
    </div>
  );
};

export default Dropdown;
