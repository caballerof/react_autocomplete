import './styles/autoComplete.css';

import { useState } from 'react';

interface Option {
  name: string;
}

interface AutoCompleteProps {
  options: Option[];
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ options: baseOptions }) => {
  const [showItems, setShowItems] = useState(false);
  const [foundElement, setFoundElement] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

  const minSearchTextLength = 1;
  const limit = 10;

  const filter = (options: Option[], searchText: string): Promise<Option[]> => {
    return new Promise((resolve) => {
      const relatedResults = options.filter((option) =>
        option.name.toLowerCase().includes(searchText.toLowerCase()),
      );

      setTimeout(() => resolve(relatedResults), 1);
    });
  };

  const onSearchTextChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const searchText = e?.currentTarget.value;

    if (searchText.length >= minSearchTextLength) {
      const relatedResults = await filter(baseOptions, searchText);

      if (relatedResults.length > 0) {
        setShowItems(true);
        setFilteredOptions(
          relatedResults.length <= limit
            ? relatedResults
            : relatedResults.slice(0, limit),
        );
      } else {
        setFilteredOptions([]);
        setShowItems(false);
      }
    } else {
      setFilteredOptions([]);
      setShowItems(false);
    }

    setFoundElement(searchText);
  };

  const onInputFocus = () => {
    setShowItems(true);
  };

  return (
    <div className="content-autocomplete">
      <input
        type="text"
        value={foundElement}
        onBlur={() => setShowItems(false)}
        onChange={onSearchTextChange}
        onFocus={onInputFocus}
      />
      <ul style={{ display: filteredOptions.length && showItems ? 'block' : 'none' }}>
        {filteredOptions.map((opt, index) => {
          const parts = opt.name.split(new RegExp(`(${foundElement})`, 'gi'));

          return (
            <li key={`${index}-${opt.name}`}>
              {parts.map((part, i) =>
                part.toLowerCase() === foundElement.toLowerCase() ? (
                  <mark key={i}>{part}</mark>
                ) : (
                  part
                ),
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AutoComplete;
