import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <div class="bg-white p-4 text-center mt-20 mr-16 ml-16 h-96 rounded-lg">
                <h1 class="text-6xl font-bold mb-6 text-[#0F172A] mt-6">Get Insights of the market <br /> and be confident</h1>
                <p class="mb-6 text-xl w-1/2 mx-auto text-center">
                    Welcome to the CryptoStocks Insights App!<br />Get concise summaries of lengthy news articles for enhanced market understanding. Stay informed and make informed decisions with us.
                </p>
                <div class="flex justify-center">
                    <Link to='/register' className='px-4 py-2 m-2 bg-slate-700 border-2 border-slate-700 text-white hover:bg-white hover:border-slate-900 hover:text-slate-950 font-semibold rounded duration-150'>Register</Link>
                    <Link to='/about' className='p-2 m-2 text-slate-950 rounded border-2 border-slate-700 hover:bg-slate-900 hover:border-slate-900 hover:text-white duration-150'>Learn More</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;