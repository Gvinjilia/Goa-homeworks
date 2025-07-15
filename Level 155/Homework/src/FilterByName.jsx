import { useState } from "react"

const FilterByName = () => {
    const [search, setSearch] = useState('');

    const names = ['olivia', 'charlie', 'anna', 'emma']

    const filteredNames = useMemo(() => {
        console.log("Filtering");
        return names.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <>
            <input type="username" placeholder="Enter name" onChange={(e) => setSearch(e.target.value)} required/>

            <ul>
                {filteredNames.map((name, index) => {
                    return (
                        <li key={index}>{name}</li>
                    )
                })}
            </ul>
        </>
    )
}

export default