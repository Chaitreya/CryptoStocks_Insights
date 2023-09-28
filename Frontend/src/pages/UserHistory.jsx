import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';
import UserData from '../components/UserData';
import axios from '../api/axios';

const GETUSERHISTORY_URL = '/articleData';
const STOREARTICLEDATA_URL = '/articleData';

function ArticleData() {

    const [data, setData] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();


        const getArticles = async () => {
            await axiosPrivate.get(GETUSERHISTORY_URL, {
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

    }, [])


    const [newData, setNewData] = useState([]);

    const [tickers, setTickers] = useState();
    console.log(tickers)

    const getNewData = async (e) => {
        e.preventDefault();
        setLoading(true);
        const tickerArray = tickers.split(/\s*,\s*|\s+/);
        console.log(tickerArray);
        const tickerObject = {};

        for (let i = 0; i < tickerArray.length; i++) {
            tickerObject[i + 1] = tickerArray[i];
        }
        await axiosPrivate.post(STOREARTICLEDATA_URL, tickerObject)
            .then((response) => {
                setNewData(response.data);
                setLoading(false);
                setModalView(true);
                setTickers('');
            })
            .catch((err) => { console.error(err) })
        setLoading(false);
    }

    const closeModal = () => {
        setModalView(false);
    }

    const rows = data.map((item) => {
        return (
            <UserData
                key={item._id}
                Ticker={item.Ticker}
                Summary={item.Summary}
                Sentiment={item.Sentiment}
                Sentiment_Score={item.Sentiment_Score}
                URL={item.URL}
            />
        )
    });

    const hiddenModal = "fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full";
    const activeModal = "fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur"

    const hiddenLoading = "w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 hidden";
    const activeLoading = "w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600";

    const [loading, setLoading] = useState(false);
    const [modalView, setModalView] = useState(false);

    return (
        <div>
            <form onSubmit={getNewData}>
                <label>Enter Ticker names:</label>
                <input
                    type="text"
                    value={tickers}
                    onChange={(e) => { setTickers(e.target.value) }}
                />
                <button>Submit</button>
            </form>
            <div role="status">
                <svg aria-hidden="true" className={loading ? activeLoading : hiddenLoading} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className={modalView ? activeModal : hiddenModal}>
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Summarized Data
                            </h3>
                            <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6 text-white">
                            {
                                newData.map((item) => (
                                    <UserData
                                        key={item._id}
                                        Ticker={item.Ticker}
                                        Summary={item.Summary}
                                        Sentiment={item.Sentiment}
                                        Sentiment_Score={item['Sentiment Score']}
                                        URL={item.URL}
                                    />
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>
                            
            {rows}
        </div>
    )
}

export default ArticleData