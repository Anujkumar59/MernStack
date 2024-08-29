import React, { useState } from 'react';

const MeaningFinder = () => {
  const [name, setName] = useState('');

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`https://api.agify.io/?name=${name}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Meaning Finder</h1>
      <input
        type="text"
        placeholder="Enter a name"
        value={name}
        onChange={handleInputChange}
        style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
      />
      <button
        onClick={handleButtonClick}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Find Meaning
      </button>
    </div>
  );
};

export default MeaningFinder;
