import React, {useState} from 'react'

interface Props {
    names: string[],
    onChange: (index: number) => void
}

export default function VisType({ names, onChange }: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const index = event.target.selectedIndex
        setSelectedIndex(index)
        onChange(index)
    }

    return <div className='mb-3'>
        <label className='form-label' htmlFor='visType'>Visualization</label>
        <select id='visType' className='form-control' defaultValue={names[selectedIndex]}
                onChange={handleChange}>
            <option key='None'>None</option>
            {names.map(visTypeName => <option key={visTypeName}>{visTypeName}</option>)}
        </select>
    </div>
}
