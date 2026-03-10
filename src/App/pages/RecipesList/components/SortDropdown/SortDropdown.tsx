import Dropdown from 'components/Dropdowns/Dropdown';
import { options, SortKey } from './const';
import { useSearchParams } from 'react-router';

const SortDropdown = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const selectedValue = (searchParams.get('sort-by') as SortKey) || SortKey.Default;

    const handleSelect = (value: SortKey) => {
        const newParams = new URLSearchParams(searchParams)

        if (!value || value === SortKey.Default) {
            newParams.delete('sort-by')
        } else {
            newParams.set('sort-by', value)
        }

        setSearchParams(newParams)
    }

    const getTitle = (key: SortKey) => {
        if (key === SortKey.Default) {
            return "Sort by";
        }
        
        const option = options.find(opt => opt.key === key);
        
        return option ? option.value : "Sort by";
    }

    return (
        <Dropdown
            getTitle={getTitle}
            options={options}
            selectedKey={selectedValue}
            onSelect={handleSelect} />
    );
}

export default SortDropdown;