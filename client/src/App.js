import { useEffect, useState } from 'react';

const App = () => {
    const [novaAtividade, setNovaAtividade] = useState('');
    const [listaAtividades, setListaAtividades] = useState(['']);

    const getAtividades = async () => {
        try {
            const response = await fetch('http://localhost:3001/atividades');
            const jsonData = await response.json();

            setListaAtividades(jsonData.atividades);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getAtividades();
    }, []);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { atividade: novaAtividade };
            const response = await fetch("http://localhost:3001/atividades", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="flex flex-col bg-gray-700 box-border min-h-screen justify-start items-center">
            <div className='w-9/12'>

                <div className='font-black font-lobster text-3xl md:text-6xl italic text-center text-white tracking-wide mt-8'>O que temos para hoje?</div>

                {/* Adicionar nova atividade */}

                <div className='flex mt-20 h-12'>
                    <form onSubmit={onSubmitForm} className='flex flex-1'>
                        <input type='text' placeholder='Insira aqui a sua nova atividade' value={novaAtividade} className='flex flex-1 outline-none text-center bg-white rounded-full' onChange={(e) => setNovaAtividade(e.target.value)}></input>
                        <button className='rounded-full hover:bg-white hover:text-gray-700 bg-gray-700 text-white ml-5 justify-center flex items-center text-sm cursor-pointer p-4 border-2 ease-in duration-200'>Confirmar</button>
                     </form>
                </div>

                {/* Listar atividades */}

                <div className='flex flex-col mt-8 bg-white text-center'>
                   <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Atividade</th>
                                <th>Editar</th>
                                <th>Deletar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaAtividades.map((item, index) => (
                                <tr key={index} className='m-8 border border-collapse'>
                                    <td>
                                        <input type='checkbox' checked={item.estado}>
                                        </input>
                                    </td>
                                    <td>{item.atividade}</td>
                                    <td>Editar</td>
                                    <td>Apagar</td>
                                </tr>
                            ))}
                        </tbody>
                   </table>
                </div>
            </div>

        </div>
    )

}

export default App;