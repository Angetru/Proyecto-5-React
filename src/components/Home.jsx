import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="https://res.cloudinary.com/dtzpmi6qs/image/upload/v1724109136/Olympclosure_qii5hq.webp" alt="Olympics 2024" className="absolute inset-0 w-full h-full object-cover opacity-65" />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold mb-4 bg-black bg-opacity-75 px-2 py-1 rounded-lg">¡Bienvenidos a los Resultados de las Olimpiadas Paris 2024!</h1>
        <p className="text-lg mb-4 bg-black bg-opacity-75 px-2 py-1 rounded-lg inline-block">
          Aquí podrás encontrar los resultados de las competiciones de las Olimpiadas Paris 2024.
        </p>
        <div className="mt-4">
          <Link to="/data" className="text-blue-500 underline">
            <button className="bg-blue-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
              Explorar Resultados
            </button>
          </Link>
        </div>
      </div>
      <footer className="absolute bottom-0 w-full text-center py-2 bg-opacity-90 text-sm text-black-400 font-bold italic">
        **Este proyecto es para fines de estudio, no para uso comercial**
      </footer>
    </div>
  );
}

export default Home;
