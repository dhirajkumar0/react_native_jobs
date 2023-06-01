import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";
// import { RAPID_API_KEY } from "../envirenment";

const rapidApiKey = RAPID_API_KEY;

const useFetch_JobDetails = (id) => {
  const [data, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/job-details`,
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      job_id: id,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setDate(response.data.data);
    } catch (error) {
      console.error(error);
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch_JobDetails;
