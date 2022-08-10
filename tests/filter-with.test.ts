import { filterWith } from '../filter-with';

describe('FilterWith function test suite', () => {
  const inputData = [
    {
      id: '5e985a07feddae7617ac44f6',
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
      id: '5e985a0709dfa1e6fd93c6ad',
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
    {
      id: '5e985a0737e2306e9aef6ecd',
      age: 26,
      eyeColor: 'blue',
      name: 'Mcguire Mercado',
      gender: 'male',
      company: 'LINGOAGE',
      email: 'mcguiremercado@lingoage.com',
      phone: '+1 (963) 450-2194',
      tags: ['cupidatat', 'occaecat', 'amet', 'qui', 'elit', 'esse', 'deserunt'],
      friends: [
        {
          id: 0,
          name: 'Loraine Harper',
        },
        {
          id: 1,
          name: 'Luann Randall',
        },
        {
          id: 2,
          name: 'Obrien Rich',
        },
        {
          id: 3,
          name: 'Noble Wilkerson',
        },
      ],
    },
    {
      id: '5e985a07148cfba58c860ec2',
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
    },
    {
      id: '5e985a074984f9f08ccaaa4c',
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
  ];

  test('Filter an array by a not embedded string field.', () => {
    const elementToFind = 'Cummings Baxter';

    const output = filterWith(inputData, elementToFind);

    expect(output)
      .toMatchSnapshot();
  });

  test('Filter an array by an embedded string field in the tags object.', () => {
    const elementToFind = 'nisi';

    const output = filterWith(inputData, elementToFind);

    expect(filterWith(output, 'nisi'))
      .toMatchSnapshot();
  });

  test('Filter an array by an embedded string field in the friends object.', () => {
    const elementToFind = 'Delacruz Acevedo';

    const output = filterWith(inputData, elementToFind);

    expect(output)
      .toMatchSnapshot();
  });

  test(
    'Return an empty array when the phrase has less than consecutive 3 chars or an empty array is given.',
    () => {
      const elementToFind = 'L ul';

      const output = filterWith(inputData, elementToFind);

      const expectedOutput: Record<string, string>[] = [];

      expect(output)
        .toStrictEqual(expectedOutput);

      const emptyArrayInput: Record<string, string>[] = [];

      const elementToFind2 = 266;

      const output2 = filterWith(emptyArrayInput, elementToFind2);

      expect(output2)
        .toStrictEqual(expectedOutput);
    },
  );

  test('Filter an array by a not embedded number field', () => {
    const elementToFind = 266;

    const output = filterWith(inputData, elementToFind);

    expect(output)
      .toMatchSnapshot();
  });

  test('Filter an array by an embedded number field in the friends object.', () => {
    const elementToFind = 266;

    const output = filterWith(inputData, elementToFind);

    expect(output)
      .toMatchSnapshot();
  });

  test('Filter an array by a set', () => {
    const inputArray: Record<string, string | number | Set<number> | Set<Set<number>>>[] = [
      {
        string: 'abc',
        set: new Set([new Set([1, 2, 3, 4])]),
      },
      {
        number: 34,
        string: 'www',
        set: new Set([1]),
      }];

    const elementToFind = new Set([1, 2, 3, 4]);

    const output = filterWith(inputArray, elementToFind);

    expect(output)
      .toMatchSnapshot();
  });

  test('Filter an array by a number embedded in a map', () => {
    const inputArray: Record<string, string | number | Set<Set<number>> | Map<string, number>>[] = [
      {
        string: 'abc',
        set: new Set([new Set([2, 3, 4])]),
      },
      {
        number: 34,
        string: 'www',
        set: new Map([['a', 1], ['b', 2]]),
      }];

    const elementToFind = 1;

    const output = filterWith(inputArray, elementToFind);

    expect(output)
      .toMatchSnapshot();
  });

  test('Filter an array by a map', () => {
    const inputArray: Record<string, string | number | Set<Set<number>> | Map<string, number>>[] = [
      {
        string: 'abc',
        set: new Set([new Set([2, 3, 4])]),
      },
      {
        number: 34,
        string: 'www',
        set: new Map([['a', 1], ['b', 2]]),
      }];

    const elementToFind = new Map([['a', 1], ['b', 2]]);

    const output = filterWith(inputArray, elementToFind);

    expect(output)
      .toMatchSnapshot();
  });
});
