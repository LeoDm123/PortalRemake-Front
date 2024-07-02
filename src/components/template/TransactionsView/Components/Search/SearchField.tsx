import React from 'react'
import { Input } from '@/components/ui'
import { HiOutlineSearch } from 'react-icons/hi'

interface SearchFieldProps {
    onSearch: (term: string) => void
}

const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value
        onSearch(term)
    }

    return (
        <div>
            <Input
                prefix={<HiOutlineSearch size={'23px'} />}
                onChange={handleChange}
                placeholder="Buscar"
            />
        </div>
    )
}

export default SearchField
