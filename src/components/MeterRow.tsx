import React from 'react';
import { IMeter, IAddress } from '../types/types';
import trashLogo from '../images/icon-trash.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
    <tr className="hover:bg-gray-50 hover:cursor-pointer border-b box-border text-left text-sm font-normal leading-5 h-[52px] group">
      <td className="text-center">{index + 1}</td>
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
      <td className="relative">
        {address ? (
          `${address.house.address}, ${address.str_number_full}`
        ) : (
          <Skeleton width={200} height={20} />
        )}
      </td>
      <td>{meter.description || 'Нет данных'}</td>
      <td className="text-right leading-3 relative opacity-70 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onDelete(meter.id)}
          className=" h-[40px] w-[40px] mr-4 bg-background-trash rounded relative opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        >
          <img
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src={trashLogo}
            alt="Изображение корзины"
          />
        </button>
      </td>
    </tr>
  );
};

export default MeterRow;
