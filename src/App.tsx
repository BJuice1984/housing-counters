import Header from './components/Header';
import MeterTable from './components/MeterTable';
import Pagination from './components/Pagination';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background-main">
      <div className="flex flex-col flex-1 p-4">
        <Header />
        <main className="grid flex-1 bg-background-light border border-gray-200 rounded-lg">
          <MeterTable />
          <Pagination />
        </main>
      </div>
    </div>
  );
}

export default App;
