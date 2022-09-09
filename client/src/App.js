import {useEffect, useState} from 'react';

const App = () => {

    const [listaAtividades, setListaAtividades] = useState([]);

    const getAtividades = async () => {
        try {
            const response = await fetch('http://localhost:3001/atividades');
            const jsonData = await response.json();

            setListaAtividades(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    
    useEffect(() => {
        getAtividades();
    }, []);

    console.log(listaAtividades);

    return (
        <div className="flex flex-col bg-gray-700 box-border min-h-screen justify-start items-center">

                <div className='font-black font-lobster text-3xl md:text-6xl italic text-center text-white tracking-wide mt-8'>O que temos para hoje?</div>

                

        </div>
    )

}

export default App;