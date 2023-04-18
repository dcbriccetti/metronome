import React from "react"

interface Props {
    filenames: string[];
    onChange: (index: number) => void
}

export default function SoundType({filenames, onChange}: Props): JSX.Element {

    function handleChange(changeEvent: React.ChangeEvent<HTMLSelectElement>) {
        const index = changeEvent.target.selectedIndex
        onChange(index);
    }

    return <div className="mb-3">
        <label className='form-label' htmlFor="metroSound">Sound</label>
        <select id="metroSound" className="form-control"
                onChange={handleChange}>
            {filenames.map(name => {
                const fileExtension = /\..*/;
                const optionText = name.replace('_', ' ').replace(fileExtension, '');
                return <option key={optionText}>{optionText}</option>
            })}
        </select>
    </div>
}

