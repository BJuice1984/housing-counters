import { flow, Instance, t } from 'mobx-state-tree';
import { MetersModel } from './MetersModel';
import { AddressModel } from './AdressModel';
import { fetchMeters } from '../api/apiService';

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
        const response = yield fetchMeters(20, 20);
        self.meters = response.results;
        self.status = 'done';
      } catch (error) {
        console.error('Failed to fetch meters', error);
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
