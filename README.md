# Sudoku Validator Project

This project provides two ways to validate Sudoku puzzles:
1. A web interface for interactive validation
2. A simple script version with built-in test cases

## Web Interface Version

The web interface allows users to:
- Load Sudoku boards from JSON files in the `Test` directory
- Validate the loaded Sudoku board
- Reset the board to empty state

### How to Use the Web Interface

1. Open `index.html` in your web browser
2. Use the "Choose File" button to load a JSON file from the `Test` directory
3. The board will be displayed with:
   - Empty cells (marked with 0)
   - Valid numbers (1-9)
   - Highlighting of any errors
4. Use the "Перевірити" (Check) button to validate the current board
5. Use the "Скинути" (Reset) button to clear the board

### Test Files

The `Test` directory contains JSON files with Sudoku boards:
- `true.json` - Contains valid Sudoku boards
- `false.json` - Contains invalid Sudoku boards

## Simple Script Version (sudokuFunctionSimple.js)

A standalone JavaScript file with built-in test cases for Sudoku validation.

### Features

- Contains predefined test boards (both valid and invalid)
- Implements the same validation logic as the web version
- Can be run directly with Node.js or in browser console

### Validation Algorithm

The validator checks:
1. **Completeness**: No empty cells (0s)
2. **Row Validation**: Each row contains unique numbers 1-9
3. **Column Validation**: Each column contains unique numbers 1-9
4. **3x3 Block Validation**: Each 3x3 block contains unique numbers 1-9

## Project Structure

- `index.html` - Web interface
- `script.js` - Main web interface logic
- `style.css` - Web interface styling
- `sudokuFunctionSimple.js` - Standalone validation script
- `Test/` - Directory containing test JSON files
  - `true.json` - Valid Sudoku boards
  - `false.json` - Invalid Sudoku boards


