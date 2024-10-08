import { cast, flow, Instance, t } from 'mobx-state-tree';
import { MetersModel } from './MetersModel';
import { AddressModel } from './AdressModel';
import { deleteMeter, fetchAddress, fetchMeters } from '../api/apiService';
import { IAddress, IMeter, IServerResponse } from '../types/types';

export const RootStore = t
  .model('RootStore', {
    meters: t.array(MetersModel),
    addresses: t.map(AddressModel),
    offset: 0,
    limit: 20,
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    next: t.maybeNull(t.string),
    previous: t.maybeNull(t.string),
    status: t.enumeration('Status', ['pending', 'done', 'error']),
  })
  .views((self) => ({
    get totalPagesCalc() {
      return Math.ceil(self.totalCount / self.limit);
    },
  }))
  .actions((self) => ({
    fetchMeters: flow(function* () {
      self.status = 'pending';
      try {
        const response: IServerResponse = yield fetchMeters(
          self.limit,
          (self.currentPage - 1) * self.limit
        );
        const meterModels = response.results.map((meter: IMeter) =>
          MetersModel.create(meter)
        );
        self.meters.replace(meterModels);
        self.totalCount = response.count;
        self.totalPages = self.totalPagesCalc;
        self.next = response.next;
        self.previous = response.previous;
        self.status = 'done';

        const areaIds = [
          ...new Set(response.results.map((meter: IMeter) => meter.area.id)),
        ];

        const storeWithFetchAddresses = cast(self) as typeof self & {
          fetchAddresses: (ids: string[]) => Promise<void>;
        };
        yield storeWithFetchAddresses.fetchAddresses(areaIds);
      } catch (error) {
        console.error('Ошибка загрузки счётчика', error);
        self.status = 'error';
      }
    }),
    fetchAddresses: flow(function* (areaIds: string[]) {
      const newAreasIds = areaIds.filter((id) => !self.addresses.has(id));
      if (newAreasIds.length > 0) {
        try {
          const response: IAddress[] = yield fetchAddress(newAreasIds);

          response.forEach((address) => {
            self.addresses.set(address.id, AddressModel.create(address));
          });
        } catch (error) {
          console.error('Ошибка загрузки адресов', error);
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

        if (self.meters.length < self.limit && self.next) {
          const nextOffset = self.currentPage * self.limit;
          const response: IServerResponse = yield fetchMeters(1, nextOffset);

          if (response.results.length > 0) {
            const newMeter = MetersModel.create(response.results[0]);
            self.meters.push(newMeter);
          }
        }
      } catch (error) {
        console.error(`Ошибка удаления счётчика с id: ${id}`, error);
        self.status = 'error';
      }
    }),
    setPage(page: number) {
      (self as RootStoreType).currentPage = page;

      (self as RootStoreType).fetchMeters();
    },
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
