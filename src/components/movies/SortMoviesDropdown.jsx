const SortMoviesDropdown = ({ value, onChange }) => {
    return (
        <fieldset className="fieldset mx-2">
            <legend className="fieldset-legend">Sortera efter:</legend>
            <select value={value} onChange={onChange} className="select">
                <option value="">Inga</option>
                <option value="top_rated">Högst betyg</option>
                <option value="year_desc">År (Nyast först)</option>
                <option value="year_asc">År (Äldst först)</option>
            </select>
        </fieldset>
    );
};

export default SortMoviesDropdown;