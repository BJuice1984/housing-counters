import React from 'react';
import { IAddress, IMeter } from '../types/types';

interface MeterRowProps {
  meter: IMeter;
  address?: IAddress;
  onDelete: (id: string) => void;
  index: number;
}

const MeterRow: React.FC<MeterRowProps> = ({
  meter,
  address,
  onDelete,
  index,
}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{meter._type.includes('HotWaterAreaMeter') ? 'ГВС' : 'ХВС'}</td>
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
        {address
          ? `${address.house.address}, ${address.str_number_full}`
          : 'Загрузка'}
      </td>
      <td>{meter.description || 'Нет данных'}</td>
      <td>
        <button onClick={() => onDelete(meter.id)}>Удалить</button>
      </td>
    </tr>
  );
};

export default MeterRow;
