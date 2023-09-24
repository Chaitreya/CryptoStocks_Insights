import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect,useState } from 'react';
import UserData from '../components/UserData';

const GETUSERHISTORY_URL = '/articleData';

function ArticleData(){

    const [data,setData] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        
        const getArticles = async () =>{
            await axiosPrivate.get(GETUSERHISTORY_URL,{
                signal: controller.signal
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.error(err);
            })    
        }

        getArticles();

        return () => {
            isMounted = false;
            controller.abort();
        }
        
    },[])

    const rows = data.map((item) => {
        return (
            <UserData 
                key = {item._id}
                Ticker = {item.Ticker}
                Summary = {item.Summary}
                Sentiment = {item.Sentiment}
                Sentiment_Score = {item.Sentiment_Score}
                URL = {item.URL}
            />
        )
    });


    return(
        <div>
            {rows}
        </div>
    )
}

export default ArticleData