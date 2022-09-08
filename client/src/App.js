import { useEffect, useState } from 'react';

const App = () => {
    const [data, setData] = useState();

    useEffect( () => {
        fetch('/api')
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);


    return (
        <div>
            {!data ? "Loading..." : data}
        </div>
    )

}

export default App;