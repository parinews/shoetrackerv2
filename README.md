# ExerciseTrack2

A front-end only web application for tracking indoor cardio miles per shoe. All data is stored locally in the browser using localStorage.

## Overview

ExerciseTrack2 helps you track which shoes you use for cardio workouts and how many miles you've logged with each pair. Perfect for runners, walkers, and cardio enthusiasts who want to monitor shoe wear and plan replacements.

## Features

- **Track Multiple Shoes**: Add and manage multiple pairs of shoes
- **Log Workouts**: Record miles for each workout with date and shoe selection
- **Lifetime Miles**: View total miles accumulated per shoe
- **Retire Shoes**: Mark shoes as retired (they stay in your history but disappear from workout logging)
- **Custom Ordering**: Manually reorder shoes via drag-and-drop on the summary page
- **Edit Workouts**: Modify or delete past workouts
- **Duplicate Detection**: Get warnings when logging duplicate workouts (but still allows saving)
- **Persistent Storage**: All data saved locally in your browser

## Technical Details

### Stack
- **HTML5**: Semantic markup
- **CSS3**: Custom design system with CSS variables
- **Vanilla JavaScript**: No frameworks or libraries
- **localStorage**: All data persistence

### Browser Support
- Modern Chrome (latest version)
- Safari (latest version)

### Architecture

The project consists of multiple HTML pages (not a single-page app):

1. **index.html** - Summary page showing all shoes with total miles
2. **log-workout.html** - Full-screen form to log new workouts
3. **manage-shoes.html** - Add, retire, and delete shoes
4. **workouts.html** - View, edit, and delete workouts for a specific shoe

### Data Model

**Shoe Object:**
```javascript
{
  id: string,           // Unique identifier
  name: string,         // Shoe name (must be unique)
  retired: boolean,     // Whether shoe is retired
  createdAt: string     // ISO timestamp
}
```

**Workout Object:**
```javascript
{
  id: string,           // Unique identifier
  shoeId: string,       // Reference to shoe
  miles: number,        // Whole number only
  date: string,         // YYYY-MM-DD format
  createdAt: string     // ISO timestamp
}
```

### localStorage Keys

- `exercisetrack2_shoes` - Array of shoe objects
- `exercisetrack2_workouts` - Array of workout objects
- `exercisetrack2_shoe_order` - Array of shoe IDs in user-defined order

## File Structure

```
ExerciseTrack2/
├── index.html              # Summary page (home)
├── log-workout.html        # Log workout page
├── manage-shoes.html       # Shoe management page
├── workouts.html           # Workout list/edit page
├── styles.css              # Global styles and design system
├── storage.js              # Data management (localStorage operations)
└── README.md               # This file
```

## Getting Started

1. Open `index.html` in a modern browser (Chrome or Safari)
2. Add your first shoe via "Manage Shoes"
3. Start logging workouts!

No build process, no dependencies, no server required.

## Usage Guide

### Adding a Shoe

1. Navigate to **Manage Shoes** page
2. Enter a unique shoe name
3. Click "Add Shoe"

### Logging a Workout

1. Click "Log Workout" from any page
2. Select a shoe from the dropdown (only active shoes shown)
3. Enter miles (whole numbers only, minimum 0)
4. Select date (defaults to today)
5. Click "Save Workout"

**Note:** If you try to log a duplicate workout (same shoe, date, and miles), you'll see a warning but can still save it.

### Retiring a Shoe

1. Go to **Manage Shoes**
2. Find the shoe you want to retire
3. Click "Retire"
4. Confirm the action

Retired shoes:
- Stay visible in the summary
- No longer appear in the workout logging dropdown
- Cannot be un-retired (design decision to keep data integrity)

### Deleting a Shoe

You can only delete shoes that have **zero workouts**. 

1. Go to **Manage Shoes**
2. Find the shoe (must have no workouts)
3. Click "Delete"
4. Confirm the action

### Reordering Shoes

On the **Summary** page:
1. Click and drag any shoe card by the ⋮⋮ handle
2. Drop it in the desired position
3. Order is automatically saved

### Editing Workouts

1. Go to **Manage Shoes**
2. Click "View Workouts" for the relevant shoe
3. Click "Edit" on any workout
4. Modify shoe, miles, or date
5. Save changes

### Deleting Workouts

1. Navigate to the workout you want to delete
2. Click "Delete"
3. Confirm the action

## Design Philosophy

### Athletic-Minimalist Aesthetic

- **Typography**: Bold, uppercase display font (Bebas Neue) for headers and emphasis
- **Color Palette**: Running-inspired with primary red accent, dark blue secondary, and clean white/gray backgrounds
- **Spacing**: Generous whitespace for breathability
- **Motion**: Subtle transitions and fade-in animations
- **Cards**: Elevated with shadows, hover effects for interactivity

### User Experience

- **Mobile-first responsive design**: Works equally well on desktop and mobile
- **Instant feedback**: Success/error messages for all actions
- **Confirmation modals**: Prevent accidental deletions
- **Intuitive navigation**: Clear header with consistent navigation
- **Drag-and-drop reordering**: Natural interaction for organizing shoes

## Data Rules

- **Shoe names must be unique** (case-insensitive check)
- **Miles must be whole numbers** (0 or greater, no decimals)
- **Multiple workouts per day are allowed** for the same shoe
- **Shoes with workouts cannot be deleted** (only retired)
- **All data persists forever** (no automatic cleanup)

## Limitations

### Intentional Non-Features

These features were explicitly excluded from the requirements:

- No Apple Watch or Apple Health integration
- No automatic workout detection
- No notifications or reminders
- No GPS, pace, or heart rate tracking
- No social features or sharing
- No shoe wear prediction or recommendations
- No data export/import functionality
- No backup or sync features

### Browser Storage

- Data is stored in localStorage (typically 5-10MB limit)
- Data is tied to the browser and device
- Clearing browser data will erase all workouts
- No cloud backup or multi-device sync

## Code Quality

### Best Practices

- **Semantic HTML**: Proper use of HTML5 elements
- **CSS Variables**: Consistent design system via custom properties
- **Inline Comments**: Extensive documentation in all JavaScript code
- **XSS Prevention**: All user input is escaped before rendering
- **Error Handling**: Try-catch blocks and user-friendly error messages
- **Validation**: Client-side validation for all forms
- **Accessibility**: Semantic markup, labels, and ARIA where appropriate

### No Dependencies

- Pure vanilla JavaScript (no jQuery, React, Vue, etc.)
- No build tools (no Webpack, Vite, etc.)
- No external libraries (no Lodash, Moment.js, etc.)
- No CSS preprocessors (no Sass, Less, etc.)

## Browser Console

For debugging or data inspection, you can access the Storage object from the browser console:

```javascript
// View all shoes
Storage.getShoes()

// View all workouts
Storage.getWorkouts()

// Get total miles for a shoe
Storage.getTotalMiles('shoe-id-here')

// Clear all data (careful!)
Storage.clearAll()
```

## Future Enhancements (Not Implemented)

If you wanted to extend this project, consider:

- Data export/import (JSON, CSV)
- Charts and visualizations
- Weekly/monthly statistics
- Shoe wear predictions based on miles
- Multiple activity types (running, walking, cycling)
- Notes field for workouts
- Photo upload for shoes
- Dark mode toggle
- Print-friendly views

## License

This is a sample project for demonstration purposes. Feel free to use, modify, and distribute as needed.

## Credits

Built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies, no complications.

---

**ExerciseTrack2** - Track your miles, track your shoes. Simple as that.
