import React, { useState } from "react";

const Test = () => {
  const [file, setFile] = useState();

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export default Test;
