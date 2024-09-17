import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../models/RootStore';
import MeterRow from './MeterRow';

const MeterTable = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.fetchMeters();
  }, [store]);

  if (store.status === 'pending') {
    return <div>Загрузка данных...</div>;
  }

  if (store.status === 'error') {
    return <div>Произошла ошибка при загрузке данных.</div>;
  }

  return (
    <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th>#</th>
            <th>Тип</th>
            <th>Дата установки</th>
            <th>Автоматический</th>
            <th>Значение</th>
            <th>Адрес</th>
            <th>Примечание</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {store.meters.map((meter, index) => (
            <MeterRow
              key={meter.id}
              meter={meter}
              address={store.addresses.get(meter.area.id)}
              onDelete={store.deleteMeter}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default MeterTable;
