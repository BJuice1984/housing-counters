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

  const rowClassName = 'h-[52px]';
  const cellClassName =
    'border-b box-border text-left text-sm font-normal leading-5';

  return (
    <div className="max-h-[500px] overflow-y-auto rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 sticky top-0 text-xs font-medium leading-4 text-left text-gray-700">
          <tr>
            <th className="p-2 border-b">№</th>
            <th className="p-2 border-b">Тип</th>
            <th className="p-2 border-b">Дата установки</th>
            <th className="p-2 border-b">Автоматический</th>
            <th className="p-2 border-b">Значение</th>
            <th className="p-2 border-b">Адрес</th>
            <th className="p-2 border-b">Примечание</th>
            <th className="p-2 border-b"></th>
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
              rowClassName={rowClassName}
              cellClassName={cellClassName}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default MeterTable;
