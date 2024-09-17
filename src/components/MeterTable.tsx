import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../models/RootStore';

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
      <table>
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
            <tr key={meter.id}>
              <td>{index + 1}</td>
              <td>
                {meter._type.includes('HotWaterAreaMeter') ? 'ГВС' : 'ХВС'}
              </td>
              <td>
                {meter.installation_date
                  ? new Date(meter.installation_date).toLocaleDateString()
                  : 'Неизвестно'}
              </td>
              <td>{meter.is_automatic ? 'Да' : 'Нет'}</td>
              <td>
                {meter.initial_values.length > 0
                  ? meter.initial_values[0]
                  : 'Нет данных'}
              </td>
              <td>
                {store.addresses.has(meter.area.id)
                  ? `${store.addresses.get(meter.area.id)?.house.address}, ${store.addresses.get(meter.area.id)?.str_number_full}`
                  : 'Загрузка'}
              </td>
              <td>{meter.description || 'Нет данных'}</td>
              <td>
                <button onClick={() => store.deleteMeter(meter.id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default MeterTable;
