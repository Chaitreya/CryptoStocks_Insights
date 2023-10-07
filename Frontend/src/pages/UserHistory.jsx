import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';
import UserData from '../components/UserData';
import Stepper from "../components/Loading";

const GETUSERHISTORY_URL = '/articleData';
const STOREARTICLEDATA_URL = '/articleData';
const DELETEUSERHISTORY_URL = '/articleData';

function ArticleData() {

    const [data, setData] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    
    
    
    const [newData, setNewData] = useState([]);
    
    const [tickers, setTickers] = useState();
    console.log(tickers)
    
    const [loading, setLoading] = useState(false);
    const [modalView, setModalView] = useState(false);
    const [historyModal, setHistoryModal] = useState(false);
    
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
    
    const closeHistoryModal = () => {
        setHistoryModal(false);
    }

    const showHistory = () => {
        getHistory();
        setHistoryModal(true);
    }

    const getHistory = async() => {
            await axiosPrivate.get(GETUSERHISTORY_URL)
                .then((response) => {
                    setData(response.data);
                })
                .catch((err) => {
                    console.error(err);
                })
    }

    const deleteHistory = async () => {
        await axiosPrivate.delete(DELETEUSERHISTORY_URL)
            .then((res)=>{
                setData([]);
                setHistoryModal(false)
            })
            .catch((err)=>{
                console.error(err);
            })
        
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
    const activeModal = "fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur flex justify-center items-center"

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-gray-400 p-4 rounded-lg mt-20 drop-shadow-lg">
                <form onSubmit={getNewData} className="flex flex-col border-b-2 p-2 border-slate-900 font-semibold">
                    <label className="m-2 font-semibold">Ticker names</label>
                    <input
                        type="text"
                        value={tickers}
                        onChange={(e) => { setTickers(e.target.value) }}
                        className="p-1 m-2 rounded-md "
                    />
                    <div>
                        <button className="px-2 py-1 m-2 bg-slate-700 text-white font-semibold self-center rounded-md text-center border-2 border-slate-700 hover:bg-white hover:text-slate-700 duration-150">Submit</button>
                    </div>
                </form>
                <div className="m-2">
                    <button onClick={showHistory} className="px-2 py-1 m-1 hover:bg-slate-700 hover:text-white font-semibold self-center rounded-md text-center border-2 border-slate-700 bg-white text-slate-700 duration-150">View History</button>
                </div>
            </div>
            <div>
            <div className={loading ? "": "hidden"}>
                <Stepper />
            </div>
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
            <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className={historyModal ? activeModal : hiddenModal}>
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                History
                            </h3>
                            <button type="button" onClick={closeHistoryModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white duration-150" data-modal-hide="staticModal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="flex flex-col text-white p-2">
                            <div className="flex mx-2 justify-start">
                                <button onClick={deleteHistory} className="p-2 border-2 border-red-500 rounded-lg hover:bg-red-600 hover:border-red-600 duration-150 font-semibold">Delete</button>
                            </div>
                            {rows}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ArticleData