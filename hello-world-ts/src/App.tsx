import React, { useState, useEffect } from 'react';
import Input from './Input';
import { DataType } from './types';
import Dropdown from './Dropdown'; 
import ImageComponent from './Image';

const App = () => {
  const url = "https://chatgpt-as-data-analyst-v1-plz-863162145764.europe-north1.run.app";
  // const url = "http://127.0.0.1:8080";
  const [data, setData] = useState<DataType | null>(null);
  const [notifyMeWhen, setNotifyMeWhen] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
      // Wake up server on component mount
    fetch(url + '/wake-up', { method: 'GET' });
  }, []);

  const handleSaveResponse = () => {
    if (data && notifyMeWhen.trim()) {
      setSaveStatus('idle');
      fetch(url + '/save_response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: data.generated_code,
          notifyMeWhen: notifyMeWhen.trim(),
        }),
      })
        .then(response => response.json())
        .then(result => {
          setSaveStatus('success');
          setNotifyMeWhen(''); // Clear the input after successful save
        })
        .catch(error => {
          console.error('Error saving response:', error);
          setSaveStatus('error');
        });
    } else if (!notifyMeWhen.trim()) {
      alert('Please enter a file name before saving.');
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Hello, World!</h1>
      <Input data={data} setData={setData} url={url + "/analyze"} />      <div className="app-content">
        {data && (
          <>
            <div className="analysis">Analysis: {data.analysis.split('\n\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                {index < data.analysis.split('\n\n').length - 1 && <br />}
                {index < data.analysis.split('\n\n').length - 1 && <br />}
              </React.Fragment>
            ))}</div>
            <ImageComponent url={url + "/get_image"} data={data} />
            
            <div className="save-response">
              <input
                type="text"
                value={notifyMeWhen}
                onChange={(e) => setNotifyMeWhen(e.target.value)}
                placeholder="Notify me when ..."
                className="save-response-input"
                disabled={saveStatus === 'success'}
              />
              <button 
                onClick={handleSaveResponse} 
                className={`save-response-button ${saveStatus === 'success' ? 'success' : ''}`}
                disabled={!notifyMeWhen.trim() || saveStatus === 'success'}
              >
                {saveStatus === 'success' ? 'Saved!' : 'Apply notification'}
              </button>
            </div>

            <Dropdown title="Code and Response">
              {/* TODO: Investigate why Dropdown component is not working as expected */}
              <pre className="pre-wrap">{data.generated_code}</pre>
              <pre className="pre-wrap">{JSON.stringify(data.data, null, 2)}</pre>
            </Dropdown>
          </>
        )}
      </div>
    </div>
  );
};

export default App;