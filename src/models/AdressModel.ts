import { t } from 'mobx-state-tree';

export const AddressModel = t.model('AddressModel', {
  id: t.identifier,
  number: t.number,
  str_number: t.string,
  str_number_full: t.string,
  house: t.model({
    address: t.string,
    id: t.identifier,
    fias_addrobjs: t.array(t.string),
  }),
});
