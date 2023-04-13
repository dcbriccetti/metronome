import React, {useState} from "react"

interface Props {
    tempoBpm: number,
    onChange: (tempo: number) => void
}

export default function Tempo({tempoBpm, onChange}: Props) {
    const [tempo, setTempo] = useState(tempoBpm)

    function handleChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
        const tempo = changeEvent.target.valueAsNumber
        setTempo(tempo)
        onChange(tempo)
    }

    return <div className="form-group">
        <label htmlFor="tempo">Tempo</label>
        <input id="tempo" className="form-control" type="number" value={tempo}
               min="20" max="180"
               onChange={handleChange}/>
    </div>
}
