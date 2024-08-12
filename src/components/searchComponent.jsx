import { useState, useEffect, useRef } from "react";

function SearchComponent({
  disable,
  placeholder,
  data,
  filterType,
  filterValue,
  onSelect,
  onSelected,
}) {
  const [searchTerm, setSearchTerm] = useState(onSelected || "");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSearchTerm(onSelected || ""); 
  }, [onSelected]);

  useEffect(() => {
    let filtered = [];
    if (searchTerm && !disable) {
      if (filterType === "state" && filterValue) {
        filtered = data.filter(
          (state) =>
            state.country_name.toLowerCase() === filterValue.toLowerCase() &&
            state.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (filterType === "country") {
        filtered = data.filter((country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (filterType === "city" && filterValue) {
        filtered = data.filter(
          (city) =>
            city.state_name.toLowerCase() === filterValue.toLowerCase() &&
            city.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredItems(filtered);
      setIsDropdownOpen(true);
    } else {
      setFilteredItems([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm, data, filterType, filterValue, disable]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (item) => {
    setSearchTerm(item.name);
    setIsDropdownOpen(false);
    if (onSelect) {
      onSelect(item); 
    }
  };

  const handleClickOutside = (e) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(e.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (e) => {
    const clickedItem = e.target.closest("li");
    if (clickedItem) {
      const itemIndex = Array.from(clickedItem.parentNode.children).indexOf(
        clickedItem
      );
      handleItemClick(filteredItems[itemIndex]);
    }
  };

  return (
    <div className="relative inline-block text-left w-full mt-2">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        ref={inputRef}
        className={`block w-full rounded-md border px-4 py-2 text-gray-900 shadow-sm sm:text-sm ${
          disable ? "bg-gray-200" : "border-gray-300"
        } focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 pl-2`}
        disabled={disable}
      />

      {isDropdownOpen && filteredItems.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-12 left-0 right-0 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-10"
          onClick={handleDropdownClick}
        >
          <ul className="divide-y divide-gray-200">
            {filteredItems.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
