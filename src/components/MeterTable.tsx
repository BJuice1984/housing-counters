import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../models/RootStore';
import MeterRow from './MeterRow';

const MeterTable = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.fetchMeters();
  }, [store]);

  return (
    <div className="max-h-[500px] overflow-y-auto border-b rounded-t-lg">
      <table className="min-w-full bg-background-light">
        <thead className="bg-gray-100 sticky top-0 text-xs font-medium leading-4 text-left text-text-table-head">
          <tr className="p-2 border-b h-[32px]">
            <th className="text-center w-[48px]">№</th>
            <th className="w-[120px]">Тип</th>
            <th className="w-[160px]">Дата установки</th>
            <th className="w-[128px]">Автоматический</th>
            <th className="w-[146px]">Текущие показания</th>
            <th className="w-[430px]">Адрес</th>
            <th>Примечание</th>
            <th></th>
          </tr>
        </thead>
        {store.status === 'pending' ? (
          <div className="z-10">Загрузка данных...</div>
        ) : store.status === 'error' ? (
          <div className="z-10">Произошла ошибка при загрузке данных.</div>
        ) : (
          <tbody className="divide-y divide-gray-200">
            {store.meters.map((meter, index) => (
              <MeterRow
                key={meter.id}
                meter={meter}
                address={store.addresses.get(meter.area.id)}
                onDelete={store.deleteMeter}
                index={(store.currentPage - 1) * store.limit + index}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
});

export default MeterTable;
