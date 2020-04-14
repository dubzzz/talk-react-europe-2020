import React from 'react';
import DebouncedAutocomplete from './DebouncedAutocomplete';

import { act, cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';

import { suggestionsFor } from './Api';
jest.mock('./Api.js');

beforeEach(() => {
  jest.clearAllTimers();
  jest.resetAllMocks();
  cleanup();
});

test('should autocomplete queries (full)', async () => {
  await fc.assert(
    fc
      .asyncProperty(fc.scheduler({ act }), fc.set(fc.string()), fc.string(1, 10), async (s, allResults, userQuery) => {
        // Arrange
        jest.useFakeTimers();
        suggestionsFor.mockImplementation(
          s.scheduleFunction(async (query) => {
            return allResults.filter((r) => r.includes(query)).slice(0, 10);
          })
        );
        const expectedResults = allResults.filter((r) => r.includes(userQuery));

        // Act
        const { getByRole, queryAllByRole } = render(<DebouncedAutocomplete />);
        s.scheduleSequence(
          [...userQuery].map((c, idx) => ({
            label: `Typing "${c}"`,
            builder: () => userEvent.type(getByRole('textbox'), userQuery.substr(0, idx + 1), { allAtOnce: true }),
          }))
        );
        await waitAllWithTimers(s);

        // Assert
        const displayedSuggestions = queryAllByRole('listitem');
        expect(displayedSuggestions.map((el) => el.textContent)).toEqual(expectedResults);
      })
      .beforeEach(() => {
        jest.clearAllTimers();
        jest.resetAllMocks();
        cleanup();
      })
  );
});

// Helpers

const waitAllWithTimers = async (s) => {
  let alreadyScheduledTaskToUnqueueTimers = false;
  const countWithTimers = () => {
    // Append a scheduled task to unqueue pending timers (if task missing and pending timers)
    if (!alreadyScheduledTaskToUnqueueTimers && jest.getTimerCount() !== 0) {
      alreadyScheduledTaskToUnqueueTimers = true;
      s.schedule(Promise.resolve('advance timers if any')).then(() => {
        alreadyScheduledTaskToUnqueueTimers = false;
        jest.advanceTimersToNextTimer();
      });
    }
    return s.count();
  };
  while (countWithTimers() !== 0) {
    await s.waitOne();
  }
};
