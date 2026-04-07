#!/bin/bash
# Post-commit test runner: build + smoke test
# Called by Claude Code PostToolUse hook after git commit

set -e

cd /home/user/leetcode-tsm

# Build
npm run build > /tmp/tsmc-build.log 2>&1
if [ $? -ne 0 ]; then
  echo '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"BUILD FAILED. Check errors:\n'"$(tail -20 /tmp/tsmc-build.log | sed 's/"/\\"/g' | tr '\n' ' ')"'"}}'
  exit 0
fi

# Start server, run smoke tests, then clean up
kill $(lsof -ti:3456) 2>/dev/null || true
sleep 1
npm run start -- -p 3456 &
SERVER_PID=$!
sleep 3

TEST_OUTPUT=$(node tests/smoke-test.mjs 2>&1) || true
TEST_EXIT=$?

kill $SERVER_PID 2>/dev/null || true
kill $(lsof -ti:3456) 2>/dev/null || true

# Extract results line
RESULTS=$(echo "$TEST_OUTPUT" | grep "Results:" | head -1)

if [ $TEST_EXIT -ne 0 ]; then
  FAILED=$(echo "$TEST_OUTPUT" | grep "FAIL" | head -5 | sed 's/"/\\"/g' | tr '\n' ' ')
  echo "{\"hookSpecificOutput\":{\"hookEventName\":\"PostToolUse\",\"additionalContext\":\"SMOKE TESTS FAILED. $RESULTS. Failures: $FAILED\"}}"
else
  echo "{\"hookSpecificOutput\":{\"hookEventName\":\"PostToolUse\",\"additionalContext\":\"All tests passed. $RESULTS\"}}"
fi
