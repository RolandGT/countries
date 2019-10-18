import {
    useState,
    useEffect
} from "react";
import axios from 'axios';

function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrl = async () => {
            let response = await axios.get(url, {
                method: 'GET',

                headers: {
                    
                    'Content-Type': 'application/json'
                }
            }).catch(function (error) {
                console.log(error);
            });
            setData(response.data);
            setLoading(false);
        }
        fetchUrl();
    }, [url]);
    return [data, loading];
}

export {
    useFetch
};
