MAX_ITERATIONS=50
iteration=0

echo "Starting agent loop..."

while true; do
  iteration=$((iteration + 1))

  if [ "$iteration" -gt "$MAX_ITERATIONS" ]; then
    echo "Max iterations ($MAX_ITERATIONS) reached. Stopping."
    break
  fi

  # Check status file for stop condition
  STATUS=$(grep -o 'Status: [a-zA-Z]*' ./ralph/status.md | cut -d' ' -f2)

  if [ "$STATUS" = "done" ] || [ "$STATUS" = "blocked" ]; then
    echo "Agent stopped with status: $STATUS"
    cat ./ralph/status.md
    break
  fi

  echo ""
  echo "=== Running iteration $iteration/$MAX_ITERATIONS at $(date) ==="
  echo "Current status: $STATUS"
  echo ""

  # Run claude in terminal
  while :; do cat PROMPT.md | claude --dangerously-skip-permissions -p ; done

  # Small delay to avoid hammering the API
  sleep 2
done

echo ""
echo "Loop completed!"
