# Keyboard Support Specification

## Overview
Users can operate the calculator entirely via keyboard, in addition to mouse/touch input.

## Key Mappings

### Numbers
| Key | Action |
|-----|--------|
| 0-9 | Input digit |
| . | Decimal point |

### Basic Operators
| Key | Action |
|-----|--------|
| + | Addition |
| - | Subtraction |
| * | Multiplication (×) |
| / | Division (÷) |
| % | Percentage |

### Evaluation & Control
| Key | Action |
|-----|--------|
| Enter | Evaluate (=) |
| = | Evaluate (=) |
| Escape | Clear all (AC) |
| Backspace | Delete last character |
| Delete | Delete last character |

### Parentheses
| Key | Action |
|-----|--------|
| ( | Open parenthesis |
| ) | Close parenthesis |

### Scientific Functions
| Key | Action |
|-----|--------|
| s | sin (or asin if Inv active) |
| c | cos (or acos if Inv active) |
| t | tan (or atan if Inv active) |
| l | ln (or e^x if Inv active) |
| g | log (or 10^x if Inv active) |
| r | √ (square root, or x² if Inv active) |
| ^ | x^y (power) |
| ! | Factorial (x!) |
| p | π (pi) |
| e | e (Euler's number) |
| a | Ans (last answer) |

### Mode Toggles
| Key | Action |
|-----|--------|
| i | Toggle Inv mode |
| d | Set Deg mode |
| Shift+d | Set Rad mode |

## Behavior Details

### Key Event Handling
- Listen on `keydown` event
- Prevent default browser behavior for calculator keys
- Do not interfere with browser shortcuts (Cmd/Ctrl+C, etc.)

### Focus Management
- Calculator captures keyboard input when page is focused
- No need to click into an input field first
- Works immediately on page load

### Visual Feedback
- When a key is pressed, the corresponding button should briefly highlight
- Same visual effect as clicking the button
- Duration: ~100ms

### Modifier Keys
- Shift: Used for Rad mode toggle
- Cmd/Ctrl: Allow browser shortcuts to pass through
- Alt: Allow browser shortcuts to pass through

## Edge Cases

### Rapid Input
- All keystrokes should be captured, even rapid typing
- No debouncing on number input

### Held Keys
- Holding a key should NOT repeat input
- Single press = single input
- Implement using keydown + tracking of held keys

### Invalid Keys
- Unrecognized keys are ignored
- No error feedback for invalid keys

## Implementation Notes

```javascript
// Example key handler structure
document.addEventListener('keydown', (e) => {
  // Skip if modifier held (allow browser shortcuts)
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  // Map key to calculator action
  const action = keyMap[e.key];
  if (action) {
    e.preventDefault();
    handleAction(action);
    highlightButton(action);
  }
});
```
