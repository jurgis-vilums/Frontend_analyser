import { useEffect } from "react";
import { useState } from "react";
import { DataType } from "./types";

interface InputProps {
  data: DataType | null;
  setData: (data: DataType) => void;
  url: string;
}

function Input({ data, setData, url }: InputProps) {
    const [spinner, setSpinner] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [input, setInput] = useState<string>("");
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(()=>{
        if(trigger){
        const fetchData = async () => {
            try{
                setSpinner(true)
                const body = JSON.stringify({ "question": input });
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body
                })
                const response_2 = response.json()
                setData(await response_2);
            }
            catch (err:any){
                setError(err.message || 'An error occured');
            }
            finally{
                setSpinner(false);
                setTrigger(false);
                setInput("");
                setError(null);
            }
            }
            fetchData();
        }
    },[trigger])

    const handleSubmit = () => {
        if (input.trim()) {
            setTrigger(true);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="input-container">
            <div className="input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="input-field"
                    placeholder="Enter text"
                />
                <button 
                    disabled={spinner} 
                    onClick={handleSubmit}
                    className="submit-button"
                >
                    {spinner ? 'Loading...' : 'Submit'}
                </button>
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
};

export default Input;