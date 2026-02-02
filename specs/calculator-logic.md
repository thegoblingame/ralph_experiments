# Calculator Logic Specification

## Basic Operations

### Arithmetic
| Operation | Symbol | Button | Description |
|-----------|--------|--------|-------------|
| Addition | + | + | Standard addition |
| Subtraction | - | - | Standard subtraction |
| Multiplication | × | × | Standard multiplication |
| Division | ÷ | ÷ | Standard division |
| Percentage | % | % | Converts to decimal (÷100) |

### Number Input
- Digits 0-9
- Decimal point (.)
- Negative numbers via subtraction or leading minus

## Scientific Operations

### Trigonometric Functions
| Function | Button | Inv Mode | Description |
|----------|--------|----------|-------------|
| sin(x) | sin | asin(x) | Sine / Arc sine |
| cos(x) | cos | acos(x) | Cosine / Arc cosine |
| tan(x) | tan | atan(x) | Tangent / Arc tangent |

**Angle Mode:**
- Deg: Input interpreted as degrees
- Rad: Input interpreted as radians
- Conversion: radians = degrees × (π/180)

### Logarithmic Functions
| Function | Button | Inv Mode | Description |
|----------|--------|----------|-------------|
| ln(x) | ln | e^x | Natural log / e to power |
| log(x) | log | 10^x | Log base 10 / 10 to power |

### Other Scientific Functions
| Function | Button | Inv Mode | Description |
|----------|--------|----------|-------------|
| x! | x! | - | Factorial (integers only) |
| √x | √ | x² | Square root / Square |
| x^y | x^y | y√x | Power / y-th root |
| EXP | EXP | - | Scientific notation (×10^) |

### Constants
| Constant | Button | Value |
|----------|--------|-------|
| π | π | 3.141592653589793 |
| e | e | 2.718281828459045 |

### Special Functions
| Function | Button | Description |
|----------|--------|-------------|
| Ans | Ans | Insert last result |
| AC | AC | Clear all (expression and result) |
| ( | ( | Open parenthesis |
| ) | ) | Close parenthesis |

## Calculation Behavior

### Expression Building
- Calculator builds expression string as user inputs
- Display shows current expression
- Pressing = evaluates and shows result

### Order of Operations
- Follow standard mathematical precedence (PEMDAS)
- Parentheses override precedence
- Functions apply to the value that follows

### Error Handling
| Error | Condition | Display |
|-------|-----------|---------|
| Division by zero | x ÷ 0 | "Error" |
| Invalid input | sqrt(-1) in real mode | "Error" |
| Overflow | Result > Number.MAX_VALUE | "Infinity" |
| Underflow | Result < Number.MIN_VALUE | "0" |
| Syntax error | Malformed expression | "Error" |

### Precision
- Use JavaScript's native Number precision
- Display up to 10 significant digits
- Use scientific notation for very large/small numbers

## Inv (Inverse) Toggle

When Inv is active:
- sin → asin (arcsin)
- cos → acos (arccos)
- tan → atan (arctan)
- ln → e^x
- log → 10^x
- √ → x²
- x^y → y√x (y-th root of x)

Inv button toggles on/off and should have visual indicator when active.

## State Management

### Calculator State
```javascript
{
  expression: "",        // Current expression string
  result: "0",          // Current displayed result
  lastResult: "0",      // Previous result (for Ans)
  angleMode: "deg",     // "deg" or "rad"
  invMode: false,       // Inverse functions active
  waitingForOperand: true
}
```

### After Pressing Equals
- Expression is evaluated
- Result becomes the display
- Expression is cleared for new input
- Previous result stored for Ans function
- Calculation saved to history
