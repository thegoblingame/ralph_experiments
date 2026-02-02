# History Feature Specification

## Overview
The calculator maintains a history of all calculations performed by the user. History persists across page reloads using localStorage.

## Data Structure

### History Entry
```javascript
{
  id: "unique-timestamp-id",
  expression: "2 + 2",      // The expression that was calculated
  result: "4",              // The result of the calculation
  timestamp: 1706900000000  // Unix timestamp when calculated
}
```

### Storage Format
```javascript
// localStorage key: "calculator_history"
// Value: JSON array of history entries
[
  { id: "...", expression: "sin(90)", result: "1", timestamp: ... },
  { id: "...", expression: "2 × 3", result: "6", timestamp: ... }
]
```

## History Panel UI

### Trigger
- Click on clock icon in top-left of display
- Panel toggles open/closed

### Panel Design
- Positioned below the display area
- Overlays the calculator buttons
- Max height: ~200px with vertical scroll
- Background: White with subtle border/shadow

### Entry Display
```
┌─────────────────────────────┐
│ sin(90)              = 1    │
│ 2 × 3                = 6    │
│ 15 ÷ 3               = 5    │
│ ...                         │
├─────────────────────────────┤
│      [Clear History]        │
└─────────────────────────────┘
```

### Entry Interactions
- **Hover**: Highlight background
- **Click on entry**: Insert the result into current expression
- **Most recent at top**: Newest calculations appear first

## Functionality

### Adding to History
- Triggered when user presses = and calculation succeeds
- Error results are NOT saved to history
- Duplicate consecutive calculations are saved (user may repeat)

### Using History Results
1. User opens history panel
2. User clicks on a history entry
3. The result value is inserted at cursor position in expression
4. History panel closes automatically

### Clearing History
1. User opens history panel
2. User clicks "Clear History" button
3. Confirmation not required (immediate clear)
4. localStorage is cleared
5. Panel shows empty state or closes

### History Limits
- Maximum entries: 10
- When limit reached: Oldest entries are removed (FIFO)
- This prevents localStorage from growing unbounded

## Persistence

### Save Triggers
- After every successful calculation
- History array updated and written to localStorage

### Load Triggers
- On page load/refresh
- Read from localStorage and populate history array

### Error Handling
- If localStorage unavailable: History works in-memory only (no persistence)
- If stored data corrupted: Clear and start fresh
- Graceful degradation, no errors shown to user

## Empty State
When no history exists:
- Panel shows message: "No history yet"
- Or panel simply shows empty with just the "Clear History" button (disabled)
