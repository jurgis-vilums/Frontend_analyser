import { useEffect } from "react";
import { useState } from "react";


function Input() {
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [triger, setTriger] = useState<boolean | null>(false);
    const [Input, setInput] = useState<string>("enter text");

    useEffect(()=>{
        const fetchData = async () => {
            try{
                setSpinner(true)
                const body = JSON.stringify({ "question": Input });
                const response = await fetch("http://127.0.0.1:8080/analyze", {
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
            }
        }
        fetchData();
    },[triger])


  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={Input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button disabled={spinner} onClick={() => setTriger(true)}>{spinner ? 'Loading...' : 'Submit'}</button>
      </div>
      <div>
        {error && <div>{error}</div>}
        {data && <div>Data: {JSON.stringify(data)}</div>}
      </div>
    </div>
  )
};

export default Input;