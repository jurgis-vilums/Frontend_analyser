import React, { useState, useEffect } from 'react';



const ImageComponent = ({ url }: {url:string}) => {
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
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return imageSrc ? <img src={imageSrc} alt="Generated" /> : <div>Loading image...</div>;
};

export default ImageComponent;