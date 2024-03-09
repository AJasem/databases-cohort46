export const recipes = [
  {
    name: "No-Bake Cheesecake",
    categories: ["Cake", "No-Bake", "Vegetarian"],
    ingredients: [
      { name: "Condensed milk", quantity: "1 can" },
      { name: "Cream Cheese", quantity: "200g" },
      { name: "Lemon Juice", quantity: "1 tbsp" },
      { name: "Pie Crust", quantity: "1" },
      { name: "Cherry Jam", quantity: "200g" },
    ],
    steps: [
      { order: 1, description: "Beat Cream Cheese" },
      { order: 2, description: "Add condensed Milk and blend" },
      { order: 3, description: "Add Lemon Juice and blend" },
      { order: 4, description: "Add the mix to the pie crust" },
      { order: 5, description: "Spread the Cherry Jam" },
      { order: 6, description: "Place in refrigerator for 3h." },
    ],
  },
  {
    name: "Spaghetti Bolognese",
    categories: ["Pasta", "Italian", "Non-Vegetarian"],
    ingredients: [
      { name: "Spaghetti", quantity: "200g" },
      { name: "Ground Beef", quantity: "200g" },
      { name: "Tomato Sauce", quantity: "1 can" },
      { name: "Onion", quantity: "1" },
      { name: "Garlic", quantity: "2 cloves" },
    ],
    steps: [
      { order: 1, description: "Cook spaghetti" },
      { order: 2, description: "Brown ground beef" },
      { order: 3, description: "Add onion and garlic to beef" },
      { order: 4, description: "Add tomato sauce to beef" },
      { order: 5, description: "Serve spaghetti with sauce on top" },
    ],
  },
  {
    name: "Chicken Tikka Masala",
    categories: ["Indian", "Non-Vegetarian"],
    ingredients: [
      { name: "Chicken", quantity: "500g" },
      { name: "Yogurt", quantity: "200g" },
      { name: "Tomato Sauce", quantity: "1 can" },
      { name: "Onion", quantity: "1" },
      { name: "Garlic", quantity: "2 cloves" },
    ],
    steps: [
      { order: 1, description: "Marinate chicken in yogurt" },
      { order: 2, description: "Cook chicken in oven" },
      { order: 3, description: "Cook onion and garlic" },
      { order: 4, description: "Add tomato sauce to onion and garlic" },
      { order: 5, description: "Add chicken to sauce" },
    ],
  },
];
