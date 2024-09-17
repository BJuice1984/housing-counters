import Header from './components/Header';
import MeterTable from './components/MeterTable';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background-main">
      <div className="flex flex-col flex-1 p-4">
        <Header />
        <main className="flex-1 bg-background-light rounded-sm">
          <MeterTable />
        </main>
      </div>
    </div>
  );
}

export default App;
