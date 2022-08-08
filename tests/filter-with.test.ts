import { filterWith } from '../filter-with';
import { data } from './data/data';

test('Filter an array by a not embedded string field.', () => {
  expect(filterWith(data, 'Cummings Baxter'))
    .toStrictEqual([
      {
        _id: '5e985a07feddae7617ac44f6',
        age: 24,
        eyeColor: 'brown',
        name: 'Cummings Baxter',
        gender: 'male',
        company: 'VELOS',
        email: 'cummingsbaxter@velos.com',
        phone: '+1 (907) 482-2451',
        tags: ['labore', 'elit', 'excepteur', 'nisi', 'mollit', 'anim', 'aliquip'],
        friends: [
          {
            id: 0,
            name: 'Sheppard Jensen',
          },
        ],
      },
    ]);
});

test('Filter an array by an embedded string field in the tags object.', () => {
  expect(filterWith(data, 'nisi'))
    .toStrictEqual([
      {
        _id: '5e985a07feddae7617ac44f6',
        age: 24,
        eyeColor: 'brown',
        name: 'Cummings Baxter',
        gender: 'male',
        company: 'VELOS',
        email: 'cummingsbaxter@velos.com',
        phone: '+1 (907) 482-2451',
        tags: ['labore', 'elit', 'excepteur', 'nisi', 'mollit', 'anim', 'aliquip'],
        friends: [
          {
            id: 0,
            name: 'Sheppard Jensen',
          },
        ],
      },
      {
        _id: '5e985a0709dfa1e6fd93c6ad',
        age: 32,
        eyeColor: 'brown',
        name: 'Madelyn Dickson',
        gender: 'female',
        company: 'KENGEN',
        email: 'madelyndickson@kengen.com',
        phone: '+1 (984) 521-2439',
        tags: ['nisi', 'veniam', 'dolore', 'officia', 'ex', 'non', 'pariatur'],
        friends: [
          {
            id: 0,
            name: 'Bruce Barton',
          },
          {
            id: 1,
            name: 'Juliet Schmidt',
          },
          {
            id: 2,
            name: 'Horton Haley',
          },
          {
            id: 3,
            name: 'Herminia Witt',
          },
        ],
      },
    ]);
});

test('Filter an array by an embedded string field in the friends object.', () => {
  expect(filterWith(data, 'Delacruz Acevedo'))
    .toEqual([
      {
        _id: '5e985a074984f9f08ccaaa4c',
        age: 25,
        eyeColor: 'green',
        name: 'Barlow Ferguson',
        gender: 'male',
        company: 'TOYLETRY',
        email: 'barlowferguson@toyletry.com',
        phone: '+1 (837) 484-2231',
        tags: ['est', 'dolor', 'minim', 'ut', 'anim', 'culpa', 'non'],
        friends: [
          {
            id: 0,
            name: 'Delacruz Acevedo',
          },
          {
            id: 1,
            name: 'Gloria Tanner',
          },
          {
            id: 2,
            name: 'Cantrell Myers',
          },
          {
            id: 3,
            name: 'Fisher Leonard',
          },
        ],
      },
    ]);
});

test(
  'Return an empty array when the phrase has less than consecutive 3 chars or an empty array is given.',
  () => {
    expect(filterWith(data, 'L ul'))
      .toStrictEqual([]);
    expect(filterWith([], '266'))
      .toStrictEqual([]);
  },
);

test('Filter an array by a not embedded number field', () => {
  expect(filterWith(data, '266'))
    .toStrictEqual([
      {
        _id: '5e985a07148cfba58c860ec2',
        age: 266,
        eyeColor: 'brown',
        name: 'Marina Porter',
        gender: 'female',
        company: 'GORGANIC',
        email: 'marinaporter@gorganic.com',
        phone: '+1 (867) 417-3497',
        tags: ['laborum', 'aliquip', 'sit', 'adipisicing', 'aute', 'cupidatat', 'aliquip'],
        friends: [
          {
            id: 0,
            name: 'Blair Hill',
          },
          {
            id: 123,
            name: 'Ebony Jimenez',
          },
        ],
      }]);
});

test('Filter an array by an embedded number field in the friends object.', () => {
  expect(filterWith(data, '266'))
    .toStrictEqual([
      {
        _id: '5e985a07148cfba58c860ec2',
        age: 266,
        eyeColor: 'brown',
        name: 'Marina Porter',
        gender: 'female',
        company: 'GORGANIC',
        email: 'marinaporter@gorganic.com',
        phone: '+1 (867) 417-3497',
        tags: ['laborum', 'aliquip', 'sit', 'adipisicing', 'aute', 'cupidatat', 'aliquip'],
        friends: [
          {
            id: 0,
            name: 'Blair Hill',
          },
          {
            id: 123,
            name: 'Ebony Jimenez',
          },
        ],
      }]);
});
