function SearchBar({ id, value, onChange, placeholder }) {
  return (
    <label className="field" htmlFor={id}>
      Search
      <input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default SearchBar
