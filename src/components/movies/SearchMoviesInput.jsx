const SearchMoviesInput = ({ value, onChange }) => {
    return (
        <fieldset className="fieldset mx-2">
            <legend className="fieldset-legend text-center">Sök film:</legend>
            <input type="text" placeholder="Skriv in filmtitel..." className="input" value={value} onChange={onChange}></input>
        </fieldset>
    );
};

export default SearchMoviesInput;