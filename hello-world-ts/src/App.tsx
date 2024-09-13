import React, { useState } from 'react';
import Input from './Input';
import { DataType } from './types';
import Dropdown from './Dropdown'; 
import ImageComponent from './Image';

const App = () => {
  const url = "http://127.0.0.1:8080";
  const [data, setData] = useState<DataType | null>(null);


  return (
    <div className="app-container">
      <h1 className="app-title">Hello, World!</h1>
      <Input data={data} setData={setData} url={url + "/analyze"} />
      <div className="app-content">
        {data && (
          <>
            <div className="analysis">Analysis: {data.analysis}</div>
            <Dropdown title="Code and Response">
              <pre className="pre-wrap">{data.generated_code}</pre>
              <pre className="pre-wrap">{JSON.stringify(data.data, null, 2)}</pre>
            </Dropdown>
            <ImageComponent url={url + "/get_image"} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;