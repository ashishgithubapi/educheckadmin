import {useState, useEffect} from 'react';
import axios from 'axios';
const useFetch=(url)=>{
    const[userData,setData] = useState([]);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState(false);
    const[status,setDisplay]=useState(false);

    useEffect(() => {
        const fetchData=async()=>{
            setLoading(true);
            try{
                const res = await axios.get(url);
                setData(res);
                setDisplay(true);
            }
            catch(err){
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const reFetch=async()=>{
        setLoading(true);
        try{
            const res = await axios.get(url);
            setData(res);
            setDisplay(true);
        }
        catch(err){
            setError(err);
        }
        setLoading(false);
    };

    return {userData,loading,error,status,reFetch}
};

export default useFetch;




