import Header from './components/Header';
import MeterTable from './components/MeterTable';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col flex-1 p-6">
        <Header />
        <main className="flex-1 bg-white p-4 shadow-md rounded-lg">
          <MeterTable />
        </main>
      </div>
    </div>
  );
}

export default App;
