import { types, flow } from 'mobx-state-tree';
import axios from 'axios';

const Address = types.model({
  id: types.identifier,
  number: types.number,
  str_number_full: types.string,
  house: types.model({
    address: types.string,
    id: types.string,
  }),
});

const Meter = types.model({
  id: types.identifier,
  _type: types.array(types.string),
  area: types.model({
    id: types.string,
  }),
  is_automatic: types.maybeNull(types.boolean),
  description: types.string,
  serial_number: types.string,
  installation_date: types.string,
  initial_values: types.array(types.number),
  address: types.maybe(types.reference(Address)),
});

const MeterStore = types.model({
  meters: types.array(Meter),
  addresses: types.map(Address),
  offset: 0,
  totalCount: 0,
});
// .actions((self) => ({
//   fetchMeters: flow(function* () {
//     const response = yield axios.get(
//       `http://showroom.eis24.me/api/v4/test/meters/?limit=20&offset=${self.offset}`
//     );
//     self.meters.push(...response.data.results);
//     self.totalCount = response.data.count;

//     const areaIds = [
//       ...new Set(response.data.results.map((meter: any) => meter.area.id)),
//     ];

//     yield self.fetchAddresses(areaIds);
//   }),

//   fetchAddresses: flow(function* (areaIds: string[]) {
//     const unknownIds = areaIds.filter((id) => !self.addresses.has(id));
//     if (unknownIds.length > 0) {
//       const response = yield axios.get(
//         `http://showroom.eis24.me/api/v4/test/areas/?id__in=${unknownIds.join(
//           ","
//         )}`
//       );
//       response.data.results.forEach((area: any) => {
//         self.addresses.set(area.id, area);
//       });
//     }
//   }),

//   deleteMeter: flow(function* (id: string) {
//     yield axios.delete(`http://showroom.eis24.me/api/v4/test/meters/${id}`);
//     self.meters = self.meters.filter((meter) => meter.id !== id);

//     if (self.meters.length < 20) {
//       yield self.fetchMeters();
//     }
//   }),
// }));
