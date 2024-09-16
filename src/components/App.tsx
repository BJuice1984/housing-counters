import Header from './Header';
import MeterTable from './MeterTable';

function App() {
  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <main>
          <MeterTable />
        </main>
      </div>
    </div>
  );
}

export default App;
