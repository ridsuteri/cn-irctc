function useFetch(url, method){

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 return {data, error, isLoading}
}

export default useFetch;