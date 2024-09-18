import React from 'react';
import { IMeter, IAddress } from '../types/types';

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
    <tr className="hover:bg-gray-50 hover:cursor-pointer border-b box-border text-left text-sm font-normal leading-5 h-[52px]">
      <td>{index + 1}</td>
      <td
        className={`bg-no-repeat bg-left text-left pl-5 ${
          meter._type.includes('HotWaterAreaMeter')
            ? 'bg-hot-water'
            : meter._type.includes('ColdWaterAreaMeter')
              ? 'bg-cold-water'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500'
        }`}
      >
        {meter._type.includes('HotWaterAreaMeter')
          ? 'ГВС'
          : meter._type.includes('ColdWaterAreaMeter')
            ? 'ХВС'
            : meter._type}
      </td>
      <td>
        {meter.installation_date
          ? new Date(meter.installation_date).toLocaleDateString()
          : 'Неизвестно'}
      </td>
      <td>
        {meter.is_automatic === null
          ? 'Нет данных'
          : meter.is_automatic
            ? 'Да'
            : 'Нет'}
      </td>
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
