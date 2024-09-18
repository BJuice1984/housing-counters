import Header from './components/Header';
import MeterTable from './components/MeterTable';
import Pagination from './components/Pagination';

function App() {
  return (
    <div className="h-full bg-background-main">
      <div className="flex flex-col h-screen flex-1 p-4">
        <Header />
        <main className="flex flex-col bg-background-light border box-border border-background-table rounded-lg overflow-hidden">
          <MeterTable />
          <Pagination />
        </main>
      </div>
    </div>
  );
}

export default App;
