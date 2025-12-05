import { Product, JournalPost, UserProfile, Order, Address, PaymentMethod } from './types';

export const HERO_IMAGE = "https://iili.io/KsRdHP9.jpg"; // Moody dark minimalist

export const CATEGORIES = ['All', 'Skincare', 'Fragrance', 'Accessories', 'Sets'];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Recovery Serum',
    category: 'Skincare',
    price: 85,
    image: 'https://picsum.photos/id/250/800/1067',
    shortDescription: 'A restorative night oil for luminous skin.',
    ingredients: ['Blue Tansy', 'Squalane', 'Evening Primrose'],
    rating: 4.8,
    reviews: [
      { id: 'r1', userName: 'Elena S.', rating: 5, comment: 'Changed my skin texture overnight. The scent is divine.', date: '2 weeks ago' },
      { id: 'r2', userName: 'Sarah J.', rating: 4, comment: 'Luxurious feel, though a bit pricey.', date: '1 month ago' }
    ]
  },
  {
    id: '2',
    name: 'Silk Heritage Scarf',
    category: 'Accessories',
    price: 120,
    image: 'https://picsum.photos/id/325/800/1067',
    shortDescription: 'Hand-rolled silk twill with botanical print.',
    ingredients: ['100% Mulberry Silk', 'Hand-rolled edges'],
    rating: 5.0,
    reviews: [
      { id: 'r3', userName: 'Margot R.', rating: 5, comment: 'The print detail is exquisite. Feels like wearing art.', date: '3 days ago' }
    ]
  },
  {
    id: '3',
    name: 'Oud & Amber Candle',
    category: 'Fragrance',
    price: 65,
    image: 'https://picsum.photos/id/364/800/1067',
    shortDescription: 'Warm, resinous notes for a serene atmosphere.',
    ingredients: ['Soy Wax', 'Agarwood Oil', 'Amber Resin'],
    rating: 4.5,
    reviews: [
      { id: 'r4', userName: 'David K.', rating: 5, comment: 'Burns evenly and fills the room without being overpowering.', date: '1 week ago' },
      { id: 'r5', userName: 'Priya L.', rating: 4, comment: 'Lovely scent, wish it came in a larger size.', date: '3 weeks ago' }
    ]
  },
  {
    id: '4',
    name: 'Hydrating Essence Mist',
    category: 'Skincare',
    price: 45,
    image: 'https://picsum.photos/id/106/800/1067',
    shortDescription: 'A fine mist to awaken and plump the skin.',
    ingredients: ['Rose Water', 'Hyaluronic Acid', 'Aloe Vera'],
    rating: 4.2,
    reviews: [
      { id: 'r6', userName: 'Chloe M.', rating: 4, comment: 'Very refreshing for travel.', date: '2 months ago' }
    ]
  },
  {
    id: '5',
    name: 'Gold Vermeil Hoop Earrings',
    category: 'Accessories',
    price: 150,
    image: 'https://picsum.photos/id/64/800/1067',
    shortDescription: 'Minimalist luxury for everyday elegance.',
    ingredients: ['18k Gold Vermeil', 'Sterling Silver Core'],
    rating: 4.9,
    reviews: [
      { id: 'r7', userName: 'Julia W.', rating: 5, comment: 'They have not tarnished at all after months of wear. Stunning.', date: '1 month ago' }
    ]
  },
  {
    id: '6',
    name: 'Botanical Clay Mask',
    category: 'Skincare',
    price: 55,
    image: 'https://picsum.photos/id/65/800/1067',
    shortDescription: 'Purifying treatment for congested pores.',
    ingredients: ['French Green Clay', 'Matcha', 'White Willow Bark'],
    rating: 4.7,
    reviews: [
      { id: 'r8', userName: 'Tom H.', rating: 5, comment: 'Clears pores instantly without drying out my skin.', date: '3 weeks ago' },
      { id: 'r9', userName: 'Alice B.', rating: 4, comment: 'Great product, but the jar is a bit heavy.', date: '1 month ago' }
    ]
  }
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: 'j1',
    title: 'The Art of Slow Living',
    excerpt: 'In a world that demands speed, we explore the rituals that help us slow down and reconnect with ourselves.',
    date: 'October 12, 2024',
    category: 'Lifestyle',
    image: 'https://picsum.photos/id/447/800/600',
    readTime: '5 min read'
  },
  {
    id: 'j2',
    title: 'Ingredient Spotlight: Blue Tansy',
    excerpt: 'Why this azure botanical is the calming force your skincare routine has been missing.',
    date: 'October 05, 2024',
    category: 'Wellness',
    image: 'https://picsum.photos/id/360/800/600',
    readTime: '3 min read'
  },
  {
    id: 'j3',
    title: 'Autumn Equinox Rituals',
    excerpt: 'Preparing your home and spirit for the turning of the seasons with warmth and intention.',
    date: 'September 22, 2024',
    category: 'Rituals',
    image: 'https://picsum.photos/id/292/800/600',
    readTime: '4 min read'
  }
];

// --- Mock User Data ---

export const MOCK_USER: UserProfile = {
  name: 'Isabella V',
  email: 'isabella.v@example.com',
  memberSince: 'September 2024'
};

export const MOCK_ORDERS: Order[] = [
  {
    id: '#YL-8402',
    date: 'Oct 15, 2024',
    status: 'Processing',
    total: 205.00,
    items: [
      { name: 'Midnight Recovery Serum', quantity: 1, image: PRODUCTS[0].image },
      { name: 'Silk Heritage Scarf', quantity: 1, image: PRODUCTS[1].image }
    ]
  },
  {
    id: '#YL-7933',
    date: 'Sep 28, 2024',
    status: 'Delivered',
    total: 65.00,
    items: [
      { name: 'Oud & Amber Candle', quantity: 1, image: PRODUCTS[2].image }
    ]
  },
  {
    id: '#YL-7105',
    date: 'Sep 10, 2024',
    status: 'Delivered',
    total: 150.00,
    items: [
      { name: 'Gold Vermeil Hoop Earrings', quantity: 1, image: PRODUCTS[4].image }
    ]
  }
];

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 'a1',
    type: 'Shipping',
    firstName: 'Isabella',
    lastName: 'V',
    line1: '4205 Fifth Avenue',
    line2: 'Apt 8B',
    city: 'New York',
    postalCode: '10018',
    country: 'United States',
    isDefault: true
  },
  {
    id: 'a2',
    type: 'Billing',
    firstName: 'Isabella',
    lastName: 'V',
    line1: '4205 Fifth Avenue',
    line2: 'Apt 8B',
    city: 'New York',
    postalCode: '10018',
    country: 'United States',
    isDefault: true
  }
];

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm1',
    brand: 'Visa',
    last4: '4242',
    expiry: '12/26',
    isDefault: true
  }
];