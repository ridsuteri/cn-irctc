import { useState } from "react";

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  // Handle form input changes
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  return [formData, handleChange];
};

export default useForm;