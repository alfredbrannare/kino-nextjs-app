import { ChangeEvent, FC } from "react";

type Props = {
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
const SortMoviesDropdown:FC<Props> = ({ value, onChange }) => {
    return (
        <fieldset className="fieldset mx-2">
            <legend className="fieldset-legend text-center">Sortera efter:</legend>
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