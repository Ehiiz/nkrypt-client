import useSWR from "swr"
import Fetching from "../modals/Fetching"

const fetcher = async(...args) => await fetch(...args).then(res => res.json())

export default function useFetchData (){
  
  const { data, error } = useSWR("https://sleepy-escarpment-55626.herokuapp.com/home", fetcher, {
    revalidateOnFocus: true, // auto revalidate when the window is focused 
  });
 

  if (error) return  <p>Loading failed...</p>;
  if (!data) return <Fetching />;
  console.log(data)

  return data

 // "https://sleepy-escarpment-55626.herokuapp.com/home"
}