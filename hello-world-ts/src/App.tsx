import React, { useState } from 'react';
import Input from './Input';
import { DataType } from './types';
import Dropdown from './Dropdown'; 
import ImageComponent from './Image';

const App = () => {
  // const url = "https://chatgpt-as-data-analyst-v1-plz-863162145764.europe-north1.run.app/";
  const url = "http://127.0.0.1:8080";
  const [data, setData] = useState<DataType | null>(null);

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