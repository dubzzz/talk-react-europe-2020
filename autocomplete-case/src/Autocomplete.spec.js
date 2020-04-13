import React from 'react';
import Autocomplete from './Autocomplete';

import { act, cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';

import { suggestionsFor } from './Api';
jest.mock('./Api.js');

beforeEach(() => {
  jest.resetAllMocks();
  cleanup();
});

test('should autocomplete queries', async () => {
  // Arrange
  const userQuery = 'pineapple';
  const allResults = ['apple', 'banana', 'grape', 'orange', 'peach', 'pineapple', 'strawberry'];
  suggestionsFor.mockImplementation(async (query) => {
    return allResults.filter((r) => r.includes(query)).slice(0, 10);
  });
  const expectedResults = ['pineapple'];

  // Act
  const { getByRole, getAllByRole } = render(<Autocomplete />);
  await act(async () => {
    await userEvent.type(getByRole('textbox'), userQuery, { allAtOnce: false, delay: 1 });
  });

  // Assert
  const displayedSuggestions = getAllByRole('listitem');
  expect(displayedSuggestions.map((el) => el.textContent)).toEqual(expectedResults);
  expect(suggestionsFor).toHaveBeenCalledTimes(userQuery.length);
});

test('should autocomplete queries (slides)', async () => {
  // Arrange
  const allResults = ['apple', 'banana', 'orange', 'pineapple'];
  suggestionsFor.mockImplementation(async (query) => {
    return allResults.filter((r) => r.includes(query));
  });
  const userQuery = 'nan';
  const expectedResults = ['banana'];

  // Act
  const { getByRole, getAllByRole } = render(<Autocomplete />);
  await act(async () => {
    await userEvent.type(getByRole('textbox'), userQuery, { allAtOnce: false, delay: 1 });
  });

  // Assert
  const displayedSuggestions = getAllByRole('listitem').map((el) => el.textContent);
  expect(displayedSuggestions).toEqual(expectedResults);
  expect(suggestionsFor).toHaveBeenCalledTimes(userQuery.length);
});

test('should autocomplete queries (slides)', async () => {
  await fc.assert(
    fc
      .asyncProperty(fc.scheduler({ act }), async (s) => {
        // Arrange
        const allResults = ['apple', 'banana', 'orange', 'pineapple'];
        suggestionsFor.mockImplementation(
          s.scheduleFunction(async (query) => {
            return allResults.filter((r) => r.includes(query)).slice(0, 10);
          })
        );
        const userQuery = 'nan';
        const expectedResults = ['banana'];

        // Act
        const { getByRole, getAllByRole } = render(<Autocomplete />);
        await act(async () => {
          await userEvent.type(getByRole('textbox'), userQuery, { allAtOnce: false, delay: 1 });
        });
        await s.waitAll();

        // Assert
        const displayedSuggestions = getAllByRole('listitem');
        expect(displayedSuggestions.map((el) => el.textContent)).toEqual(expectedResults);
        expect(suggestionsFor).toHaveBeenCalledTimes(userQuery.length);
      })
      .beforeEach(() => {
        jest.resetAllMocks();
        cleanup();
      })
  );
});

test('should autocomplete queries (slides)', async () => {
  await fc.assert(
    fc
      .asyncProperty(fc.scheduler({ act }), fc.set(fc.string()), fc.string(1, 10), async (s, allResults, userQuery) => {
        // Arrange
        suggestionsFor.mockImplementation(
          s.scheduleFunction(async (query) => {
            return allResults.filter((r) => r.includes(query)).slice(0, 10);
          })
        );
        const expectedResults = allResults.filter((r) => r.includes(userQuery));

        // Act
        const { getByRole, queryAllByRole } = render(<Autocomplete />);
        await act(async () => {
          await userEvent.type(getByRole('textbox'), userQuery, { allAtOnce: false, delay: 1 });
        });
        await s.waitAll();

        // Assert
        const displayedSuggestions = queryAllByRole('listitem');
        expect(displayedSuggestions.map((el) => el.textContent)).toEqual(expectedResults);
        expect(suggestionsFor).toHaveBeenCalledTimes(userQuery.length);
      })
      .beforeEach(() => {
        jest.resetAllMocks();
        cleanup();
      })
  );
});

test('should autocomplete queries (slides latest)', async () => {
  await fc.assert(
    fc
      .asyncProperty(fc.scheduler({ act }), fc.set(fc.string()), fc.string(1, 10), async (s, allResults, userQuery) => {
        // Arrange
        suggestionsFor.mockImplementation(
          s.scheduleFunction(async (query) => {
            return allResults.filter((r) => r.includes(query)).slice(0, 10);
          })
        );
        const expectedResults = allResults.filter((r) => r.includes(userQuery));

        // Act
        const { getByRole, queryAllByRole } = render(<Autocomplete />);
        s.scheduleSequence(
          [...userQuery].map((c, idx) => ({
            label: `Typing "${c}"`,
            builder: () => userEvent.type(getByRole('textbox'), userQuery.substr(0, idx + 1), { allAtOnce: true }),
          }))
        );
        await s.waitAll();

        // Assert
        const displayedSuggestions = queryAllByRole('listitem');
        expect(displayedSuggestions.map((el) => el.textContent)).toEqual(expectedResults);
        expect(suggestionsFor).toHaveBeenCalledTimes(userQuery.length);
      })
      .beforeEach(() => {
        jest.resetAllMocks();
        cleanup();
      })
  );
});

test('should autocomplete queries', async () => {
  await fc.assert(
    fc
      .asyncProperty(fc.scheduler({ act }), fc.string(1, 10), async (s, userQuery) => {
        // Arrange
        const allResults = ['apple', 'banana', 'grape', 'orange', 'peach', 'pineapple', 'strawberry'];
        suggestionsFor.mockImplementation(
          s.scheduleFunction(async (query) => {
            return allResults.filter((r) => r.includes(query)).slice(0, 10);
          })
        );
        const expectedResults = allResults.filter((r) => r.includes(userQuery)).slice(0, 10);

        // Act
        const { getByRole, queryAllByRole } = render(<Autocomplete />); // queryAllByRole
        await act(async () => {
          await userEvent.type(getByRole('textbox'), userQuery, { allAtOnce: false, delay: 1 });
        });
        await s.waitAll();

        // Assert
        const displayedSuggestions = queryAllByRole('listitem');
        expect(displayedSuggestions.map((el) => el.textContent)).toEqual(expectedResults);
        expect(suggestionsFor).toHaveBeenCalledTimes(userQuery.length);
      })
      .beforeEach(() => {
        jest.resetAllMocks();
        cleanup();
      })
  );
});
