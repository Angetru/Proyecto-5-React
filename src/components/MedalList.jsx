import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MedalList() {
    const [medals, setMedals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://api.olympics.kevle.xyz/medals")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la respuesta de la red");
                }
                return response.json();
            })
            .then((data) => {
                if (data.results && Array.isArray(data.results)) {
                    setMedals(data.results);
                } else {
                    throw new Error("Formato de datos inesperado");
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);
    const sortByRank = () => {
        const sortedMedals = [...medals].sort((a, b) => b.rank - a.rank);
        setMedals(sortedMedals);
    };

    const sortByCountry = () => {
        const sortedMedals = [...medals].sort((a, b) => a.country.name.localeCompare(b.country.name));
        setMedals(sortedMedals);
    };

    const sortByGold = () => {
        const sortedMedals = [...medals].sort((a, b) => b.medals.gold - a.medals.gold);
        setMedals(sortedMedals);
    };

    const sortBySilver = () => {
        const sortedMedals = [...medals].sort((a, b) => b.medals.silver - a.medals.silver);
        setMedals(sortedMedals);
    };

    const sortByBronze = () => {
        const sortedMedals = [...medals].sort((a, b) => b.medals.bronze - a.medals.bronze);
        setMedals(sortedMedals);
    };

    const scrollToFilters = () => {
        const filterSection = document.getElementById("filter-buttons");
        if (filterSection) {
            filterSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.length === 3) {
            fetch(`https://api.olympics.kevle.xyz/medals?country=${searchTerm.toUpperCase()}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.results && Array.isArray(data.results)) {
                        setMedals(data.results);
                    } else {
                        throw new Error("Formato de datos inesperado");
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener los datos:", error);
                    setError(error.message);
                });
        }
    };
    const resetSearch = () => {
        setSearchTerm('');
        fetch('https://api.olympics.kevle.xyz/medals')
            .then((response) => response.json())
            .then((data) => {
                if (data.results && Array.isArray(data.results)) {
                    setMedals(data.results);
                } else {
                    throw new Error("Formato de datos inesperado");
                }
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
                setError(error.message);
            });
    };

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
            <div className="container mx-auto mb-20 bg-black">
                <h1 className="text-2xl font-bold mb-4 text-center">Lista de Medallas Olímpicas</h1>
                <img src="https://res.cloudinary.com/dtzpmi6qs/image/upload/v1724109118/Olympics_bmwmeh.jpg" alt="Olympics 2024" className="w-full h-auto rounded mb-4 opacity-75" />
                <div id="filter-buttons" className="flex justify-start mb-4">
                    <button onClick={sortByRank} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Ordenar Ranking</button>
                    <button onClick={sortByCountry} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">Ordenar País</button>
                    <button onClick={sortByGold} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">Ordenar Oro</button>
                    <button onClick={sortBySilver} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2">Ordenar Plata</button>
                    <button onClick={sortByBronze} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded m-2">Ordenar Bronce</button>
                    <button onClick={() => navigate('/')} // Navigate back to Home
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
                        Volver a Home
                    </button>
                </div>
                <div className="flex justify-start mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        placeholder="Código país Ej: CHI"
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" />

                    <div className="flex justify-center">
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
                            Buscar
                        </button>
                        <a href="https://en.wikipedia.org/wiki/List_of_IOC_country_codes#Current_NOCs" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline mx-2">Ver códigos de país</a>
                        <button
                            onClick={resetSearch}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2 inline-block align-middle">
                            Reiniciar filtros
                        </button>
                    </div>
                </div>
                <table className="min-w-full bg-black text-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border border-gray-700 text-center">Ranking</th>
                            <th className="px-4 py-2 border border-gray-700 text-center">País</th>
                            <th className="px-4 py-2 border border-gray-700 text-center">Oro</th>
                            <th className="px-4 py-2 border border-gray-700 text-center">Plata</th>
                            <th className="px-4 py-2 border border-gray-700 text-center">Bronce</th>
                            <th className="px-4 py-2 border border-gray-700 text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medals.map((medal, index) => (
                            <tr key={index}>
                                <td className="border border-gray-700 px-4 py-2 text-center">{medal.rank}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{medal.country.name}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{medal.medals.gold}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{medal.medals.silver}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{medal.medals.bronze}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{medal.medals.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-8">
                    <button onClick={scrollToFilters} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Subir
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MedalList;
