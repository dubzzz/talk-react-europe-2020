/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from 'react';
import { suggestionsFor } from './Api';

export default function Autocomplete() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query === '') {
      setSuggestions([]);
    } else {
      suggestionsFor(query).then((suggestions) => {
        setSuggestions(suggestions);
      });
    }
  }, [query]);

  return (
    <div>
      <label htmlFor="autocomplete-field">Select a package: </label>
      <input id="autocomplete-field" role="textbox" value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul role="list">
        {suggestions.map((s) => (
          <li key={s} role="listitem">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
