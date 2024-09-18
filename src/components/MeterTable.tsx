import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../models/RootStore';
import MeterRow from './MeterRow';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MeterTable = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.fetchMeters();
  }, [store]);

  return (
    <div className="flex-1 overflow-y-auto border-b scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 h-full">
      <table className="min-w-full bg-background-light">
        <thead className="bg-background-secondary sticky top-0 text-xs font-medium leading-4 text-left text-text-table-head z-10">
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
          <tbody className={`divide-y divide-background-table`}>
            <tr>
              <td colSpan={8}>
                <div className="p-1">
                  <Skeleton count={20} height={52} />
                </div>
              </td>
            </tr>
          </tbody>
        ) : store.status === 'error' ? (
          <tbody className="divide-y divide-background-table">
            <tr>
              <td colSpan={8} className="text-center p-4">
                Произошла ошибка при загрузке данных.
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody
            className={`divide-y divide-background-table ${store.status !== 'pending' ? 'animate-fadeIn' : 'opacity-0'}`}
          >
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
