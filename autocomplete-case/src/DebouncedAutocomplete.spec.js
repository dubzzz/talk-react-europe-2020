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

        let alreadyScheduledTaskToUnqueueTimers = false;
        const countAndAppendTimerIfNeeded = () => {
          if (!alreadyScheduledTaskToUnqueueTimers && jest.getTimerCount() !== 0) {
            // We do not have any scheduled task suitable to enqueue timers
            // But we have pending timers
            // So we need to queue such task
            alreadyScheduledTaskToUnqueueTimers = true;
            s.schedule(Promise.resolve('advance timers if any')).then(() => {
              alreadyScheduledTaskToUnqueueTimers = false;
              if (jest.getTimerCount() > 0) {
                jest.advanceTimersToNextTimer();
              }
            });
          }
          return s.count();
        };
        while (countAndAppendTimerIfNeeded() !== 0) {
          await s.waitOne();
        }

        // Assert
        const displayedSuggestions = queryAllByRole('listitem');
        expect(displayedSuggestions.map((el) => el.textContent)).toEqual(expectedResults);
        //throw 'debug';
      })
      .beforeEach(() => {
        jest.clearAllTimers();
        jest.resetAllMocks();
        cleanup();
      })
  );
});
