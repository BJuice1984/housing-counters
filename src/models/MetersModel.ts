import { t } from 'mobx-state-tree';
import { AddressModel } from './AdressModel';

export const MetersModel = t.model('MetersModel', {
  id: t.identifier,
  _type: t.array(t.string),
  area: t.model({
    id: t.string,
  }),
  is_automatic: t.maybeNull(t.boolean),
  description: t.string,
  serial_number: t.string,
  installation_date: t.string,
  initial_values: t.array(t.number),
  address: t.maybe(t.reference(AddressModel)),
});
