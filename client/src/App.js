import { useEffect, useState } from 'react';

const App = () => {
    const [novaAtividade, setNovaAtividade] = useState('');
    const [listaAtividades, setListaAtividades] = useState(['']);

    const getAtividades = async () => {
        try {
            const response = await fetch('/atividades');
            const jsonData = await response.json();

            setListaAtividades(jsonData.atividades);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getAtividades();
    }, [listaAtividades]);

    const onSubmeterForm = async (e) => {
        e.preventDefault();
        try {
            const body = { atividade: novaAtividade };
            await fetch("/atividades", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setNovaAtividade('');
        } catch (err) {
            console.error(err.message);
        }
    }

    const deletarAtividade = async (id) => {
        try {
            await fetch(`/atividades/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                }
            });

        } catch (err) {
            console.error(err.message);
        }
}

const atualizarEstado = async (id, estado) => {
        try {
            const body = { estado: estado ? false : true };
            await fetch(`/atividades/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

        } catch (err) {
            console.error(err.message);
        }
    }

return (
    <div className="flex flex-col bg-gray-700 box-border min-h-screen justify-between items-center">
        <div className='flex flex-col w-10/12'>

            <div className='font-black font-lobster text-4xl md:text-6xl italic text-center drop-shadow-md text-white tracking-wide mt-12'>O que temos para hoje?</div>

            {/* Adicionar nova atividade */}

            <div className='flex mt-16 mb-12'>
                <form onSubmit={onSubmeterForm} className='flex w-full flex-col md:flex-row justify-center items-center'>
                    
                    <input type='text' placeholder='Insira aqui a sua nova atividade' value={novaAtividade} className='flex w-full md:flex-1 outline-none text-center bg-white rounded-full p-2 md:p-4' onChange={(e) => setNovaAtividade(e.target.value)}></input>
                    
                    <button className='flex rounded-full w-full md:w-auto hover:bg-white hover:text-gray-700 bg-gray-700 text-white md:ml-2 justify-center items-center font-bold text-sm cursor-pointer p-2 md:p-4 border-2 ease-in duration-200 mt-2 md:mt-0'>Inserir</button>
                </form>
            </div>

            {/* Listar atividades */}
            
                        {listaAtividades.map((item, index) => (
                               <div key={index} className={`flex items-center justify-center min-h-12 border-4 border-gray-700 rounded-full`}>
                                    <div className='mr-2 flex justify-center items-center'>
                                        <input className='w-8 h-8 accent-gray-900 hover:accent-gray-500' type='checkbox' checked={item.estado} onChange={() => atualizarEstado(item.id, item.estado)}>
                                        </input>
                                    </div>
                                    
                                    <div className={`rounded-full flex flex-1 justify-center items-center ${item.estado ? 'bg-gray-600' : 'bg-white'} ${item.estado ? 'text-gray-700' : 'text-gray-900'} ${item.estado? 'hover:none' : 'hover:bg-gray-400'} text-center py-2 px-3`}>{item.atividade}</div>
                                    
                                    <div className={`ml-2 flex justify-center items-center rounded-full ${item.estado ? 'bg-red-900' : 'bg-red-600'} text-white cursor-pointer w-10 h-10 hover:scale-125 ease-in duration-100`} onClick={() => deletarAtividade(item.id)}>X</div>
                                </div>
                        ))}

            
        </div>
        <footer className='w-full bg-gray-600 text-white text-sm flex justify-center p-4 mt-6'>Developed by <a href='https://www.eawebdev.com' target='_blank' rel='noreferrer' className='mx-1 hover:text-yellow-500 hover:text ease-in duration-100'>EA WebDev</a> 2022</footer>
    </div>
)

}

export default App;