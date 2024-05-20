import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNameFilter,
  selectNumberFilter,
} from "../../redux/filters/selectors";
import { changeFilter, changeNumberFilter } from "../../redux/filters/slice";

export default function SearchBox() {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);
  const numberFilter = useSelector(selectNumberFilter);

  const [searchValue, setSearchValue] = useState(nameFilter || numberFilter);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!isNaN(value) && value.trim() !== "") {
      dispatch(changeNumberFilter(value));
    } else {
      dispatch(changeFilter(value));
    }
  };

  return (
    <div>
      <p>Search by name or by phone</p>
      <input type="text" value={searchValue} onChange={handleSearchChange} />
    </div>
  );
}
