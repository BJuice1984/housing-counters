import { t } from 'mobx-state-tree';

export const MetersModel = t.model('MetersModel', {
  id: t.identifier,
  _type: t.array(t.string),
  area: t.model({
    id: t.identifier,
  }),
  is_automatic: t.maybeNull(t.boolean),
  communication: t.string,
  description: t.string,
  serial_number: t.string,
  installation_date: t.string,
  brand_name: t.maybeNull(t.string),
  model_name: t.maybeNull(t.string),
  initial_values: t.array(t.number),
});
