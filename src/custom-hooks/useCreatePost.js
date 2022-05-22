import {useState, useEffect} from 'react';
import Axios from 'axios';
import  {useNavigate} from 'react-router-dom';

export default function useCreatePost(url, data) {
 
    const navigate = useNavigate()
   
    useEffect(() => {
        const payload = {data}
    
        console.log(payload);
        Axios.post(url, payload)
      .then(res => {
              console.log(res);
              const status = res.data.status;
              const id = res.data.newkrypt._id;
              if (status === "success"){
                  navigate(`/setlock/${id}`)
                  }
                  else{
                      navigate('/create')
                  }
          }).catch(error => {
              console.log(error);
          })
    },);


}