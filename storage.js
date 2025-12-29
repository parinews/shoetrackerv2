/*
 * ExerciseTrack2 - Data Management
 * Handles all localStorage operations for shoes and workouts
 */

const Storage = {
  // Storage keys
  KEYS: {
    SHOES: 'exercisetrack2_shoes',
    WORKOUTS: 'exercisetrack2_workouts',
    SHOE_ORDER: 'exercisetrack2_shoe_order'
  },

  /**
   * Get all shoes from localStorage
   * @returns {Array} Array of shoe objects
   */
  getShoes() {
    const data = localStorage.getItem(this.KEYS.SHOES);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Save shoes to localStorage
   * @param {Array} shoes - Array of shoe objects to save
   */
  saveShoes(shoes) {
    localStorage.setItem(this.KEYS.SHOES, JSON.stringify(shoes));
  },

  /**
   * Get a single shoe by ID
   * @param {string} id - Shoe ID
   * @returns {Object|null} Shoe object or null if not found
   */
  getShoeById(id) {
    const shoes = this.getShoes();
    return shoes.find(shoe => shoe.id === id) || null;
  },

  /**
   * Add a new shoe
   * @param {string} name - Shoe name
   * @param {string} imageData - Base64 image data (optional)
   * @returns {Object} The newly created shoe object
   */
  addShoe(name, imageData = null) {
    const shoes = this.getShoes();
    
    // Check for duplicate name
    if (shoes.some(shoe => shoe.name.toLowerCase() === name.toLowerCase())) {
      throw new Error('A shoe with this name already exists');
    }

    const newShoe = {
      id: this.generateId(),
      name: name.trim(),
      retired: false,
      imageData: imageData,
      createdAt: new Date().toISOString()
    };

    shoes.push(newShoe);
    this.saveShoes(shoes);

    // Add to order array
    const order = this.getShoeOrder();
    order.push(newShoe.id);
    this.saveShoeOrder(order);

    return newShoe;
  },

  /**
   * Retire a shoe
   * @param {string} id - Shoe ID to retire
   */
  retireShoe(id) {
    const shoes = this.getShoes();
    const shoe = shoes.find(s => s.id === id);
    
    if (shoe) {
      shoe.retired = true;
      this.saveShoes(shoes);
    }
  },

  /**
   * Delete a shoe (only if no workouts exist)
   * @param {string} id - Shoe ID to delete
   * @returns {boolean} True if deleted, false if has workouts
   */
  deleteShoe(id) {
    const workouts = this.getWorkouts();
    const hasWorkouts = workouts.some(w => w.shoeId === id);
    
    if (hasWorkouts) {
      return false;
    }

    const shoes = this.getShoes();
    const filtered = shoes.filter(s => s.id !== id);
    this.saveShoes(filtered);

    // Remove from order array
    const order = this.getShoeOrder();
    const newOrder = order.filter(shoeId => shoeId !== id);
    this.saveShoeOrder(newOrder);

    return true;
  },

  /**
   * Get shoe order array
   * @returns {Array} Array of shoe IDs in display order
   */
  getShoeOrder() {
    const data = localStorage.getItem(this.KEYS.SHOE_ORDER);
    if (data) {
      return JSON.parse(data);
    }
    
    // If no order exists, create one from existing shoes
    const shoes = this.getShoes();
    return shoes.map(s => s.id);
  },

  /**
   * Save shoe order
   * @param {Array} order - Array of shoe IDs in desired order
   */
  saveShoeOrder(order) {
    localStorage.setItem(this.KEYS.SHOE_ORDER, JSON.stringify(order));
  },

  /**
   * Get shoes in user-defined order
   * @returns {Array} Ordered array of shoe objects
   */
  getShoesOrdered() {
    const shoes = this.getShoes();
    const order = this.getShoeOrder();
    
    // Create a map for quick lookup
    const shoeMap = {};
    shoes.forEach(shoe => {
      shoeMap[shoe.id] = shoe;
    });

    // Build ordered array, including any shoes not in order
    const ordered = [];
    order.forEach(id => {
      if (shoeMap[id]) {
        ordered.push(shoeMap[id]);
        delete shoeMap[id];
      }
    });

    // Add any remaining shoes (shouldn't happen, but just in case)
    Object.values(shoeMap).forEach(shoe => ordered.push(shoe));

    return ordered;
  },

  /**
   * Get all workouts from localStorage
   * @returns {Array} Array of workout objects
   */
  getWorkouts() {
    const data = localStorage.getItem(this.KEYS.WORKOUTS);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Save workouts to localStorage
   * @param {Array} workouts - Array of workout objects to save
   */
  saveWorkouts(workouts) {
    localStorage.setItem(this.KEYS.WORKOUTS, JSON.stringify(workouts));
  },

  /**
   * Get a single workout by ID
   * @param {string} id - Workout ID
   * @returns {Object|null} Workout object or null if not found
   */
  getWorkoutById(id) {
    const workouts = this.getWorkouts();
    return workouts.find(workout => workout.id === id) || null;
  },

  /**
   * Add a new workout
   * @param {string} shoeId - Shoe ID
   * @param {number} miles - Miles (can include decimals up to 2 places)
   * @param {string} date - Date string (YYYY-MM-DD)
   * @returns {Object} Object with workout and isDuplicate flag
   */
  addWorkout(shoeId, miles, date) {
    const workouts = this.getWorkouts();
    
    // Check for duplicate (same shoe, date, and miles)
    const isDuplicate = workouts.some(w => 
      w.shoeId === shoeId && 
      w.date === date && 
      w.miles === miles
    );

    const newWorkout = {
      id: this.generateId(),
      shoeId: shoeId,
      miles: parseFloat(miles),
      date: date,
      createdAt: new Date().toISOString()
    };

    workouts.push(newWorkout);
    this.saveWorkouts(workouts);

    return {
      workout: newWorkout,
      isDuplicate: isDuplicate
    };
  },

  /**
   * Update an existing workout
   * @param {string} id - Workout ID
   * @param {string} shoeId - Updated shoe ID
   * @param {number} miles - Updated miles
   * @param {string} date - Updated date
   */
  updateWorkout(id, shoeId, miles, date) {
    const workouts = this.getWorkouts();
    const workout = workouts.find(w => w.id === id);
    
    if (workout) {
      workout.shoeId = shoeId;
      workout.miles = parseFloat(miles);
      workout.date = date;
      workout.updatedAt = new Date().toISOString();
      this.saveWorkouts(workouts);
    }
  },

  /**
   * Delete a workout
   * @param {string} id - Workout ID to delete
   */
  deleteWorkout(id) {
    const workouts = this.getWorkouts();
    const filtered = workouts.filter(w => w.id !== id);
    this.saveWorkouts(filtered);
  },

  /**
   * Get workouts for a specific shoe
   * @param {string} shoeId - Shoe ID
   * @returns {Array} Array of workout objects for the shoe
   */
  getWorkoutsByShoe(shoeId) {
    const workouts = this.getWorkouts();
    return workouts.filter(w => w.shoeId === shoeId);
  },

  /**
   * Calculate total miles for a shoe
   * @param {string} shoeId - Shoe ID
   * @returns {number} Total miles
   */
  getTotalMiles(shoeId) {
    const workouts = this.getWorkoutsByShoe(shoeId);
    return workouts.reduce((total, workout) => total + workout.miles, 0);
  },

  /**
   * Generate a unique ID
   * @returns {string} Unique ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  /**
   * Clear all data (for testing/reset purposes)
   */
  clearAll() {
    localStorage.removeItem(this.KEYS.SHOES);
    localStorage.removeItem(this.KEYS.WORKOUTS);
    localStorage.removeItem(this.KEYS.SHOE_ORDER);
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Storage;
}
