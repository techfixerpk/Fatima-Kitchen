/**
 * MENU DATA - THE GOURMET DATABASE
 * Structured with categorization, pricing logic, and meta-tags for filtering.
 */

const MenuData = [
  {
    id: "cat_1",
    category: "ROYAL SIGNATURE PLATTERS",
    description: "Grand feasts inspired by the Mughal and Ottoman Empires.",
    items: [
      {
        id: "sp_101",
        name: "The Emperor's Platter",
        price: 4850,
        originalPrice: 5500,
        discount: "12% OFF",
        description: "A majestic spread of Lamb Chops, Saffron Infused Kababs, Malai Boti, and Peshawari Karahi served with aromatic Long-Grain Basmati Rice.",
        image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1000",
        tags: ["Bestseller", "Sharing", "Chef's Choice"],
        nutrition: { calories: "1850 kcal", protein: "120g", fats: "85g" },
        isSpicy: false,
        isVegetarian: false,
        available: true
      },
      {
        id: "sp_102",
        name: "Ottoman Seafood Symphony",
        price: 6200,
        description: "Grilled Jumbo Prawns, Atlantic Salmon, and calamari rings tossed in a lemon-garlic butter sauce with grilled Mediterranean vegetables.",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000",
        tags: ["Premium", "Seafood"],
        nutrition: { calories: "950 kcal", protein: "85g", fats: "45g" },
        isSpicy: true,
        isVegetarian: false,
        available: true
      }
    ]
  },
  {
    id: "cat_2",
    category: "ARTISAN BURGERS & STEAKS",
    description: "Dry-aged meats and handmade brioche buns.",
    items: [
      {
        id: "bs_201",
        name: "24K Gold Truffle Burger",
        price: 2850,
        description: "Wagyu beef patty topped with black truffle aioli, edible 24K gold leaf, and aged Swiss Gruyère on a toasted charcoal bun.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000",
        tags: ["Luxury", "Signature"],
        nutrition: { calories: "1100 kcal", protein: "65g", fats: "70g" },
        isSpicy: false,
        isVegetarian: false,
        available: true
      },
      {
        id: "bs_202",
        name: "The Flaming Ribeye",
        price: 4200,
        description: "Prime Ribeye steak flamed tableside with rosemary butter, served with truffle mash and grilled asparagus.",
        image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=1000",
        tags: ["High Protein", "Steakhouse"],
        nutrition: { calories: "850 kcal", protein: "90g", fats: "55g" },
        isSpicy: true,
        isVegetarian: false,
        available: true
      }
    ]
  },
  {
    id: "cat_3",
    category: "GOURMET DESSERTS",
    description: "Sweet endings crafted by our master pastry chefs.",
    items: [
      {
        id: "ds_301",
        name: "Saffron Pistachio Milk Cake",
        price: 950,
        description: "Spongy cake soaked in three types of saffron-infused milk, topped with crushed Iranian pistachios.",
        image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1000",
        tags: ["Sweet", "Nutty"],
        nutrition: { calories: "450 kcal", protein: "10g", fats: "25g" },
        isSpicy: false,
        isVegetarian: true,
        available: true
      },
      {
        id: "ds_302",
        name: "Molten Lava Gold Dust",
        price: 1100,
        description: "Belgian dark chocolate fondant with a liquid center, served with vanilla bean gelato and gold dust.",
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1000",
        tags: ["Chocolate", "Hot"],
        nutrition: { calories: "600 kcal", protein: "8g", fats: "35g" },
        isSpicy: false,
        isVegetarian: true,
        available: true
      }
    ]
  },
  {
    id: "cat_4",
    category: "ROYAL BEVERAGES",
    description: "Refreshing elixirs and artisan mocktails.",
    items: [
      {
        id: "bv_401",
        name: "Emerald Mint Mojito",
        price: 650,
        description: "Freshly muddled mint leaves, lime juice, and sparkling soda with a hint of green apple.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000",
        tags: ["Refreshing", "Cold"],
        nutrition: { calories: "120 kcal", protein: "0g", fats: "0g" },
        isSpicy: false,
        isVegetarian: true,
        available: true
      }
    ]
  }
];

// Helper Function to search items (Used in SmartSearch.js)
export const searchMenu = (query) => {
  const flatMenu = MenuData.flatMap(cat => cat.items);
  return flatMenu.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) || 
    item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};

export default MenuData;
                    
