import React, { useState, useEffect } from 'react';
import { DataType } from "./types";

const ImageComponent = ({ url, data }: {url:string, data:DataType}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${url}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      })
      .catch(error => {   
        console.error('Error fetching image:', error);
        setError('Failed to load image');
      });
  }, [data]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="image-container">
      {imageSrc ? (
        <img src={imageSrc} alt="Generated" className="centered-image" />
      ) : (
        <div>Loading image...</div>
      )}
    </div>
  );
};

export default ImageComponent;