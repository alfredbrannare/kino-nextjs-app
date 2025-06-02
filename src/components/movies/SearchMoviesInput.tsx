import { ChangeEvent, FC } from 'react';

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void; // Corrected type
  placeholder?: string;
};

const SearchMoviesInput: FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <fieldset className='fieldset mx-2'>
      <legend className='fieldset-legend text-center'>Sök film:</legend>
      <input
        type='text'
        placeholder={placeholder || 'Sök filmer...'}
        className='input'
        value={value}
        onChange={onChange}
      ></input>
    </fieldset>
  );
};

export default SearchMoviesInput;
