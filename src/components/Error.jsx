import React from 'react';
import { Link, useRouteError } from "react-router-dom";
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';

const gf = new GiphyFetch('6WMUiK420LCDYtGMoTd6OH31UTW8G4my'); // Replace 'YOUR_API_KEY' with your actual API key

const Error = () => {
    const error = useRouteError();
    console.error(error);

    const [gif, setGif] = React.useState(null);

    React.useEffect(() => {
        const fetchGif = async () => {
            const { data } = await gf.gif('14uQ3cOFteDaU'); // Use the same GIF ID or any other ID
            setGif(data);
        };
        fetchGif();
    }, []);

    return (
        <div id="error-page" className="flex flex-col items-center h-screen bg-gray-900 text-white">
            <div className="w-full max-w-screen-lg absolute">
                {gif && <Gif gif={gif} width="100%" />}
            </div>
            <div className="mx-auto my-auto z-10">
                <p className="text-4xl">
                    <i>{error.data}</i>
                </p>
                <Link to='/'>
                    <button className="btn px-20 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white">
                        Go Back
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Error;
