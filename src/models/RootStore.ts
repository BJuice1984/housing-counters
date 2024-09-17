import { flow, Instance, t } from 'mobx-state-tree';
import { MetersModel } from './MetersModel';
import { AddressModel } from './AdressModel';
import { deleteMeter, fetchAddress, fetchMeters } from '../api/apiService';

export const RootStore = t
  .model('RootStore', {
    meters: t.array(MetersModel),
    addresses: t.map(AddressModel),
    status: t.enumeration('Status', ['pending', 'done', 'error']),
  })
  .actions((self) => ({
    fetchMeters: flow(function* () {
      self.status = 'pending';
      try {
        const response: { results: Meter[] } = yield fetchMeters(20, 20);
        const meterModels = response.results.map((meter: Meter) =>
          MetersModel.create(meter)
        );
        self.meters.replace(meterModels);
        self.status = 'done';

        const areaIds = [
          ...new Set(response.results.map((meter: Meter) => meter.area.id)),
        ];
        //@ts-ignore
        yield self.fetchAddresses(areaIds);
      } catch (error) {
        console.error('Ошибка загрузки счётчика', error);
        self.status = 'error';
      }
    }),
    fetchAddresses: flow(function* (areaIds: string[]) {
      const newAreasIds = areaIds.filter((id) => !self.addresses.has(id));
      if (newAreasIds.length > 0) {
        for (const id of newAreasIds) {
          try {
            const response: Address = yield fetchAddress(id);

            if (response && response.house.address) {
              const area = {
                id: response.id,
                number: response.number,
                str_number_full: response.str_number_full,
                house: response.house,
              };

              self.addresses.set(area.id, area);
            }
          } catch (error) {
            console.error(`Ошибка загрузки адреса с id: ${id}`, error);
          }
        }
      }
    }),
    deleteMeter: flow(function* (id: string) {
      self.status = 'pending';
      try {
        yield deleteMeter(id);
        const updatedMeters = self.meters.filter((meter) => meter.id !== id);

        self.meters.replace(updatedMeters);
        self.status = 'done';

        // if (self.meters.length < 20) {
        //   yield self.fetchMeters();
        // }
      } catch (error) {
        console.error(`Ошибка удаления счётчика с id: ${id}`, error);
        self.status = 'error';
      }
    }),
  }));

export type RootStoreType = Instance<typeof RootStore>;

let rootStore: RootStoreType;
export function useStore() {
  if (!rootStore) {
    rootStore = RootStore.create({
      meters: [],
      addresses: {},
      status: 'done',
    });
  }

  return rootStore;
}
