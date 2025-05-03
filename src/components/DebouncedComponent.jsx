import React, { useState } from "react";
import lodash from "lodash";

function DebouncedComponent() {
  const [apiCalls, setApiCalls] = useState(0);

  const debouncedCall = lodash.debounce(() => {
    setApiCalls((prev)=>++prev);
    console.log("making another api call");
  }, 100);

  const handleChange = () => {
    debouncedCall();
  };


  return (
    <div>
      <input type="text" onChange={handleChange} />
      <div>Api calls : {apiCalls}</div>
    </div>
  );
}

export default DebouncedComponent;
