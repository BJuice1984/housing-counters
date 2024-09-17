import React from 'react';
import { IMeter, IAddress } from '../types/types';

interface MeterRowProps {
  meter: IMeter;
  address?: IAddress;
  onDelete: (id: string) => void;
  index: number;
  rowClassName?: string;
  cellClassName?: string;
}

const MeterRow: React.FC<MeterRowProps> = ({
  meter,
  address,
  onDelete,
  index,
  rowClassName = '',
  cellClassName = '',
}) => {
  return (
    <tr className={`hover:bg-gray-50 ${rowClassName}`}>
      <td className={`border-b ${cellClassName}`}>{index + 1}</td>
      <td className={`border-b ${cellClassName}`}>
        {meter._type.includes('HotWaterAreaMeter') ? 'ГВС' : 'ХВС'}
      </td>
      <td className={`border-b ${cellClassName}`}>
        {meter.installation_date
          ? new Date(meter.installation_date).toLocaleDateString()
          : 'Неизвестно'}
      </td>
      <td className={`border-b ${cellClassName}`}>
        {meter.is_automatic ? 'Да' : 'Нет'}
      </td>
      <td className={`border-b ${cellClassName}`}>
        {meter.initial_values.length > 0
          ? meter.initial_values[0]
          : 'Нет данных'}
      </td>
      <td className={`border-b ${cellClassName}`}>
        {address
          ? `${address.house.address}, ${address.str_number_full}`
          : 'Загрузка'}
      </td>
      <td className={`border-b ${cellClassName}`}>
        {meter.description || 'Нет данных'}
      </td>
      <td className={`border-b ${cellClassName}`}>
        <button
          onClick={() => onDelete(meter.id)}
          className="text-red-500 hover:underline"
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default MeterRow;
