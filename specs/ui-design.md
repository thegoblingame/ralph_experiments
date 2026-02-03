# UI Design Specification

## Implementation Status
This feature has not been implemented yet.

## Layout Structure

### Container
- Centered on page, max-width ~400px
- White/light gray background
- Rounded corners (border-radius: ~8px)
- Subtle box shadow for depth

### Display Area
- Top section of calculator
- Rounded border (pill-shaped container)
- Contains:
  - History icon (clock) - top left, clickable
  - Current expression/result - right-aligned, large font

### Button Grid
- 7 columns x 6 rows layout
- Buttons have rounded corners (pill/capsule shape)
- Consistent spacing between buttons (~8px gap)

## Button Layout (Top to Bottom, Left to Right)

### Row 1: Mode & Utility
| Deg/Rad | x! | ( | ) | % | AC |
|---------|----|----|---|---|----|

### Row 2: Scientific & Numbers
| Inv | sin | ln | 7 | 8 | 9 | ÷ |
|-----|-----|----|----|---|---|----|

### Row 3: Scientific & Numbers
| π | cos | log | 4 | 5 | 6 | × |
|---|-----|-----|----|---|---|----|

### Row 4: Scientific & Numbers
| e | tan | √ | 1 | 2 | 3 | - |
|---|-----|---|----|---|---|----|

### Row 5: Scientific & Numbers
| Ans | EXP | x^y | 0 | . | = | + |
|-----|-----|-----|----|---|---|----|

## Color Scheme (Google Style)

### Button Colors
- **Scientific buttons** (left side): Light blue/lavender (#d2e3fc)
- **Number buttons**: Light gray (#f1f3f4)
- **Operator buttons** (+, -, ×, ÷): Light blue/lavender (#d2e3fc)
- **Equals button**: Blue (#4285f4) with white text
- **AC button**: Light blue/lavender (#d2e3fc)

### Text Colors
- Default button text: Dark gray (#202124)
- Deg (active): Blue (#1a73e8)
- Rad (inactive): Gray (#5f6368)
- Equals button text: White

### Background
- Calculator background: White (#ffffff)
- Page background: Light gray (#f8f9fa)

## Typography
- Display: Sans-serif, 40-48px for result
- Buttons: Sans-serif, 16-18px
- Font family: Google Sans, Roboto, or system sans-serif

## Responsive Behavior
- Calculator maintains aspect ratio
- Minimum width: 320px
- Buttons scale proportionally

## History Dropdown Panel
- Appears below display when history icon clicked
- Max height with scroll for many entries
- Each entry shows:
  - Expression on left
  - Result on right
- Hover state for clickable entries
- "Clear history" button at bottom
- Smooth slide animation on open/close

## Button States
- **Default**: Base colors as specified
- **Hover**: Slightly darker shade
- **Active/Pressed**: Even darker, slight inset shadow
- **Disabled**: Reduced opacity (for Inv toggle states)
