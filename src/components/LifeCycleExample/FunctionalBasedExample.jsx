import React, { useEffect, useState } from "react";

function FunctionalBasedExample() {
  const [response, setResponse] = useState({
    photo: null,
    loading: true,
    error: null,
  });

  // 1. mounting - [] signifies mounting phase
  useEffect(() => {
    console.log("[1]. mounting phase is running");
    fetch("https://jsonplaceholder.typicode.com/photos/1")
      .then((response) => response.json())
      .then((data) => setResponse({ photo: data, loading: false }))
      .catch((err) => setResponse({ error: err.message, loading: false }));
  }, []);

  // 2. updating - [dependency1, dependecy2] - on updation of what variables, the effect should run
  useEffect(() => {
    console.log("[2]. updating phase is running");
    // further functionality that should execute once response is updated
    // should be written/called here
  }, [response]);

  // 3. unmounting
  useEffect(() => {
    return () => {
      console.log("[3]. UNmounting phase is running");
    };
  }, []);

  return (
    <>
      <h1>Functional Component</h1>
      {response.loading ? <>Loading ....</> : response.photo.title}
    </>
  );
}

export default FunctionalBasedExample;
