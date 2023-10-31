import { Link } from 'react-router-dom';

function About() {
    return (
        <div>
            <div className="bg-white p-4 text-center mt-20 mr-16 ml-16 h-102 rounded-lg drop-shadow-xl">
                <div class="flex justify-center items-center h-full">
                    <div class="w-1/2 p-6">
                        <img src="crypto.jpg" alt="Image" class="w-full h-auto rounded-lg" />
                    </div>
                    <div class="w-1/2 p-6">
                        <h2 class="text-4xl font-semibold mb-6 text-[#0F172A]">About Us</h2>
                        <h5 class="text-xl font-medium mb-6 text-[#0F172A]">
                            Stock articles Summarization & <span>its sentiment</span>
                        </h5>
                        <p class="text-lg mb-6 text-[#0F172A] text-justify">
                            The objective is to develop an AI solution that can analyze and summarize news articles related to stocks and cryptocurrencies. By leveraging advanced natural language processing techniques, the system will distill essential information from these articles, enabling
                            users to quickly grasp key insights and trends. This project aims to offer investors and enthusiasts a time-efficient method to stay informed about financial markets, make informed decisions, and understand the prevailing sentiment to enhance their strategic approaches.
                        </p>
                        <div class="mt-6">
                            <Link to='/login' className='px-4 py-2 m-2 bg-violet-950 border-2  text-white  hover:border-violet-950  border-violet-950 text-center hover:bg-white hover:text-violet-950 font-semibold rounded duration-150 '>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;