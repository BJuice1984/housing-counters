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
    <div className="max-h-[500px] overflow-y-auto rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 sticky top-0 text-xs font-medium leading-4 text-left text-gray-700">
          <tr className="p-2 border-b h-[52px]">
            <th>№</th>
            <th>Тип</th>
            <th>Дата установки</th>
            <th>Автоматический</th>
            <th>Значение</th>
            <th>Адрес</th>
            <th>Примечание</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
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
