import s from "./SearchBar.module.css";
import { useState } from "react";
import { toast } from "react-hot-toast";

const SearchBar = ({ handleChangeQuery }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      toast.error("Please enter a search query!");
      return;
    }
    handleChangeQuery(search.trim());
    setSearch("");
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
