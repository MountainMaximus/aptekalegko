import React from "react";
import debounce from "lodash.debounce";
import { ClearIcon } from "./ClearIcon";

interface ISearch {
  setSearch: (val: string) => void;
}
export const Search: React.FC<ISearch> = ({ setSearch }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  // eslint-disable-next-line
  const updateSearch = React.useCallback(
    debounce((str: string) => setSearch(str), 500),
    []
  );
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    updateSearch(event.target.value);
  };
  const onClickClear = () => {
    setSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className="search__wrapper">
      <div className="search">
        <input
          ref={inputRef}
          className="search__input"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={onChangeInput}
        />
        {searchValue && <ClearIcon onClickClear={onClickClear} />}
      </div>
    </div>
  );
};
