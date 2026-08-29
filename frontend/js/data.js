/**
 * BCRSS - Mock Data & Type Definitions
 * 
 * Data Models:
 * - User: { id, name, email, role, location, contact, avatarColor }
 * - ResourceItem: { id, title, category, condition, description, lendingType, location, ownerId, ownerName, ownerContact, status, listedDate, imageCode }
 * - JobOpportunity: { id, title, category, status, description, location, rate, duration, postedBy, postedById, postedDate, contactInfo, requirements }
 * - BorrowRequest: { id, itemId, itemTitle, requesterId, requesterName, requesterContact, ownerId, startDate, endDate, status, requestDate, message }
 * - Review: { id, rating, comment, reviewerName, reviewerRole, date, targetName }
 */

const BCRSS = {};

// ==================== STATISTICS ====================

BCRSS.STATISTICS = {
  shared: '2,300+',
  sharedLabel: 'Resources Shared',
  groups: '120+',
  groupsLabel: 'Chamas & Traders',
  tools: '450+',
  toolsLabel: 'Farm Tools',
  jobsPosted: '150+',
  jobsPostedLabel: 'Jobs Posted'
};

// ==================== TESTIMONIALS ====================

BCRSS.TESTIMONIALS = [
  {
    name: 'Mary Chebet',
    initials: 'MC',
    avatar: 'bg-teal',
    rating: 5,
    text: 'I lent my knapsack sprayer through BCRSS and it came back cleaned and on time. Such a wonderful way to build community trust while helping neighbors.',
    role: 'Baraton Market Area'
  },
  {
    name: 'Faith Wanjiku',
    initials: 'FW',
    avatar: 'bg-indigo',
    rating: 4,
    text: 'Borrowed a solar lantern for studying during power outages. The process was simple and the owner was very accommodating. Highly recommend!',
    role: 'UEAB Student'
  },
  {
    name: 'Joseph Kiprop',
    initials: 'JK',
    avatar: 'bg-cyan',
    rating: 5,
    text: 'Found a skilled carpenter through the job board. He repaired my furniture at an affordable rate. This platform is a game-changer for our community.',
    role: 'Near UEAB Main Gate'
  },
  {
    name: 'Grace Akinyi',
    initials: 'GA',
    avatar: 'bg-green',
    rating: 5,
    text: 'Borrowed a biology textbook for the whole semester. The owner was so kind and even shared her class notes. BCRSS is a blessing for students!',
    role: 'UEAB Library Area'
  },
  {
    name: 'Samuel Rono',
    initials: 'SR',
    avatar: 'bg-rose',
    rating: 4,
    text: 'Posted a plumbing job and got three qualified applicants within two days. The job board really works for finding reliable local workers.',
    role: 'Baraton Residential'
  }
];

// ==================== MOCK DATA ====================

BCRSS.INITIAL_USERS = [
  {
    id: 'user-vick',
    name: 'Vick Okelloh',
    email: 'okellohvick@gmail.com',
    role: 'Admin',
    location: 'UEAB Campus',
    contact: '0765 123 456',
    avatarColor: 'bg-emerald'
  },
  {
    id: 'user-mary',
    name: 'Mary Chebet',
    email: 'mary.chebet@gmail.com',
    role: 'Member',
    location: 'Baraton Market Area',
    contact: '0765 234 567',
    avatarColor: 'bg-teal'
  },
  {
    id: 'user-faith',
    name: 'Faith Wanjiku',
    email: 'faith.wanjiku@gmail.com',
    role: 'Member',
    location: 'UEAB Student Hostels',
    contact: '0765 345 678',
    avatarColor: 'bg-indigo'
  },
  {
    id: 'user-grace',
    name: 'Grace Akinyi',
    email: 'grace.akinyi@gmail.com',
    role: 'Member',
    location: 'UEAB Library Area',
    contact: '0765 456 789',
    avatarColor: 'bg-green'
  },
  {
    id: 'user-joseph',
    name: 'Joseph Kiprop',
    email: 'joseph.kiprop@gmail.com',
    role: 'Member',
    location: 'Near UEAB Main Gate',
    contact: '0765 567 890',
    avatarColor: 'bg-cyan'
  },
  {
    id: 'user-daniel',
    name: 'Daniel Korir',
    email: 'daniel.korir@gmail.com',
    role: 'Member',
    location: 'Baraton Village',
    contact: '0765 678 901',
    avatarColor: 'bg-orange'
  },
  {
    id: 'user-elijah',
    name: 'Elijah Sang',
    email: 'elijah.sang@gmail.com',
    role: 'Member',
    location: 'Baraton Farm Area',
    contact: '0765 789 012',
    avatarColor: 'bg-amber'
  },
  {
    id: 'user-agnes',
    name: 'Agnes Rotich',
    email: 'agnes.rotich@gmail.com',
    role: 'Member',
    location: 'Baraton Residential',
    contact: '0765 890 123',
    avatarColor: 'bg-pink'
  },
  {
    id: 'user-peter',
    name: 'Peter Langat',
    email: 'peter.langat@gmail.com',
    role: 'Member',
    location: 'Near Baraton Primary School',
    contact: '0765 901 234',
    avatarColor: 'bg-violet'
  },
  {
    id: 'user-samuel',
    name: 'Samuel Rono',
    email: 'samuel.rono@gmail.com',
    role: 'Member',
    location: 'Baraton Residential',
    contact: '0765 012 345',
    avatarColor: 'bg-rose'
  },
  {
    id: 'user-janet',
    name: 'Janet Cherop',
    email: 'janet.cherop@gmail.com',
    role: 'Member',
    location: 'UEAB Campus',
    contact: '0765 111 222',
    avatarColor: 'bg-fuchsia'
  },
  {
    id: 'user-brian',
    name: 'Brian Kibet',
    email: 'brian.kibet@gmail.com',
    role: 'Member',
    location: 'Baraton Tea Zone',
    contact: '0765 222 333',
    avatarColor: 'bg-lime'
  },
  {
    id: 'user-esther',
    name: 'Esther Wafula',
    email: 'esther.wafula@gmail.com',
    role: 'Member',
    location: 'Baraton Market Area',
    contact: '0765 333 444',
    avatarColor: 'bg-cyan'
  },
  {
    id: 'user-moses',
    name: 'Moses Biwott',
    email: 'moses.biwott@gmail.com',
    role: 'Member',
    location: 'Baraton Farm Area',
    contact: '0765 444 555',
    avatarColor: 'bg-emerald'
  },
  {
    id: 'user-lilian',
    name: 'Lilian Naliaka',
    email: 'lilian.naliaka@gmail.com',
    role: 'Member',
    location: 'Near UEAB Main Gate',
    contact: '0765 555 666',
    avatarColor: 'bg-teal'
  }
];

BCRSS.INITIAL_RESOURCES = [
  // ── Mary Chebet (3 items) ──
  {
    id: 'res-sprayer',
    title: 'Knapsack Sprayer (16L)',
    category: 'farm tools',
    condition: 'Good',
    description: '16-litre knapsack sprayer for pesticide and herbicide application. Comes with adjustable nozzle. Perfect for maize and vegetable farming in Baraton.',
    lendingType: 'Borrowing',
    location: 'Baraton Market Area',
    ownerId: 'user-mary',
    ownerName: 'Mary Chebet',
    ownerContact: '0765 234 567',
    status: 'Available',
    listedDate: '2026-06-06',
    imageCode: 'sprayer'
  },
  {
    id: 'res-weighing',
    title: 'Digital Weighing Scale',
    category: 'trade equipment',
    condition: 'Excellent',
    description: 'High-precision digital scale for traders and market vendors. Battery operated, supports up to 50kg. Ideal for weighing produce at the Baraton market.',
    lendingType: 'Borrowing',
    location: 'Baraton Market',
    ownerId: 'user-mary',
    ownerName: 'Mary Chebet',
    ownerContact: '0765 234 567',
    status: 'Available',
    listedDate: '2026-07-15',
    imageCode: 'generic'
  },
  {
    id: 'res-meat-cleaver',
    title: 'Butcher Knife Set',
    category: 'trade equipment',
    condition: 'Good',
    description: 'Professional butcher knife set with 3 blades and a sharpening steel. Used at the Baraton market meat stall. Heavy-duty stainless steel.',
    lendingType: 'Borrowing',
    location: 'Baraton Market Area',
    ownerId: 'user-mary',
    ownerName: 'Mary Chebet',
    ownerContact: '0765 234 567',
    status: 'Available',
    listedDate: '2026-08-01',
    imageCode: 'generic'
  },

  // ── Faith Wanjiku (2 items) ──
  {
    id: 'res-lantern',
    title: 'Solar Lantern',
    category: 'household items',
    condition: 'Good',
    description: 'Rechargeable solar lantern with bright LED light. Handy for studying during power outages or outdoor night work. Includes USB port for phone charging.',
    lendingType: 'Borrowing',
    location: 'UEAB Student Hostels',
    ownerId: 'user-faith',
    ownerName: 'Faith Wanjiku',
    ownerContact: '0765 345 678',
    status: 'Available',
    listedDate: '2026-06-06',
    imageCode: 'lantern'
  },
  {
    id: 'res-calculator',
    title: 'Scientific Calculator (Casio fx-991)',
    category: 'textbooks',
    condition: 'Excellent',
    description: 'Casio fx-991EX scientific calculator. Essential for engineering and science courses at UEAB. Barely used, practically new.',
    lendingType: 'Borrowing',
    location: 'UEAB Student Hostels',
    ownerId: 'user-faith',
    ownerName: 'Faith Wanjiku',
    ownerContact: '0765 345 678',
    status: 'Available',
    listedDate: '2026-07-22',
    imageCode: 'computing'
  },

  // ── Grace Akinyi (3 items) ──
  {
    id: 'res-biology',
    title: 'Biology 101 - Campbell',
    category: 'textbooks',
    condition: 'Good',
    description: 'Campbell Biology 11th Edition. Used for BIOL 101 at UEAB. In great condition, all pages intact. Happy to lend for the full academic semester.',
    lendingType: 'Borrowing',
    location: 'UEAB Library Area',
    ownerId: 'user-grace',
    ownerName: 'Grace Akinyi',
    ownerContact: '0765 456 789',
    status: 'Available',
    listedDate: '2026-06-06',
    imageCode: 'biology'
  },
  {
    id: 'res-chemistry',
    title: 'Chemistry: The Central Science',
    category: 'textbooks',
    condition: 'Good',
    description: '14th edition chemistry textbook. Some pencil notes in the margins but overall clean. Covers general and organic chemistry for first-year students.',
    lendingType: 'Borrowing',
    location: 'UEAB Library Area',
    ownerId: 'user-grace',
    ownerName: 'Grace Akinyi',
    ownerContact: '0765 456 789',
    status: 'Available',
    listedDate: '2026-07-10',
    imageCode: 'generic'
  },
  {
    id: 'res-notebook',
    title: 'Lecture Notes Bundle (3 volumes)',
    category: 'textbooks',
    condition: 'Fair',
    description: 'Handwritten lecture notes for BIOL 201, CHEM 201, and MATH 201. Organized by topic with practice questions. Great for exam revision.',
    lendingType: 'Donation',
    location: 'UEAB Library Area',
    ownerId: 'user-grace',
    ownerName: 'Grace Akinyi',
    ownerContact: '0765 456 789',
    status: 'Available',
    listedDate: '2026-08-05',
    imageCode: 'generic'
  },

  // ── Joseph Kiprop (3 items) ──
  {
    id: 'res-plough',
    title: 'Hand Plough (Jembe)',
    category: 'farm tools',
    condition: 'Good',
    description: 'Heavy-duty hand plough suitable for small-scale farming. Well maintained and sharpened recently. Available for kitchen gardens in Baraton neighborhood.',
    lendingType: 'Borrowing',
    location: 'Near UEAB Main Gate',
    ownerId: 'user-joseph',
    ownerName: 'Joseph Kiprop',
    ownerContact: '0765 567 890',
    status: 'Available',
    listedDate: '2026-06-06',
    imageCode: 'plough'
  },
  {
    id: 'res-hoe',
    title: 'Garden Hoe (Mehico)',
    category: 'farm tools',
    condition: 'Excellent',
    description: 'New garden hoe with a strong wooden handle. Perfect for weeding and digging in kitchen gardens. Bought last month but have too many tools already.',
    lendingType: 'Borrowing',
    location: 'Near UEAB Main Gate',
    ownerId: 'user-joseph',
    ownerName: 'Joseph Kiprop',
    ownerContact: '0765 567 890',
    status: 'Available',
    listedDate: '2026-07-18',
    imageCode: 'generic'
  },
  {
    id: 'res-machete',
    title: 'Panga (Machete) with Sheath',
    category: 'farm tools',
    condition: 'Good',
    description: 'Standard Kenyan panga for clearing brush, harvesting, and general farm work. Comes with a leather sheath. Sharpened and ready to use.',
    lendingType: 'Borrowing',
    location: 'Baraton Farm Area',
    ownerId: 'user-joseph',
    ownerName: 'Joseph Kiprop',
    ownerContact: '0765 567 890',
    status: 'Borrowed',
    listedDate: '2026-08-02',
    imageCode: 'generic'
  },

  // ── Daniel Korir (2 items) ──
  {
    id: 'res-wheelbarrow',
    title: 'Wheelbarrow',
    category: 'farm tools',
    condition: 'Fair',
    description: 'Standard construction wheelbarrow, also useful for farm work. Can carry up to 80kg. Available on weekends for local tasks.',
    lendingType: 'Borrowing',
    location: 'Baraton Village',
    ownerId: 'user-daniel',
    ownerName: 'Daniel Korir',
    ownerContact: '0765 678 901',
    status: 'Borrowed',
    listedDate: '2026-06-06',
    imageCode: 'wheelbarrow'
  },
  {
    id: 'res-shovel',
    title: 'Shovel (Full Size)',
    category: 'farm tools',
    condition: 'Good',
    description: 'Full-size digging shovel with a fiberglass handle. Good for trenching, planting trees, and construction work. Stored at my compound in Baraton Village.',
    lendingType: 'Borrowing',
    location: 'Baraton Village',
    ownerId: 'user-daniel',
    ownerName: 'Daniel Korir',
    ownerContact: '0765 678 901',
    status: 'Available',
    listedDate: '2026-07-25',
    imageCode: 'generic'
  },

  // ── Elijah Sang (2 items) ──
  {
    id: 'res-tent',
    title: 'Community Meeting Tent',
    category: 'chama resources',
    condition: 'Good',
    description: 'Large 50-seater tent available for chama meetings, community gatherings, or family events. Stored near the Baraton Primary School.',
    lendingType: 'Borrowing',
    location: 'Baraton Village',
    ownerId: 'user-elijah',
    ownerName: 'Elijah Sang',
    ownerContact: '0765 789 012',
    status: 'Available',
    listedDate: '2026-07-20',
    imageCode: 'generic'
  },
  {
    id: 'res-extension-cord',
    title: '50m Extension Cable (4-way)',
    category: 'household items',
    condition: 'Good',
    description: 'Heavy-duty 50-metre extension cable with 4 power outlets. Indoor/outdoor use. Perfect for events, construction sites, or powering tools away from the house.',
    lendingType: 'Borrowing',
    location: 'Baraton Farm Area',
    ownerId: 'user-elijah',
    ownerName: 'Elijah Sang',
    ownerContact: '0765 789 012',
    status: 'Available',
    listedDate: '2026-08-10',
    imageCode: 'generic'
  },

  // ── Agnes Rotich (2 items) ──
  {
    id: 'res-sewing-machine',
    title: 'Manual Sewing Machine (Singer)',
    category: 'trade equipment',
    condition: 'Good',
    description: 'Vintage Singer manual sewing machine on a wooden table. Works perfectly for tailoring and alterations. Includes extra bobbins and needles.',
    lendingType: 'Borrowing',
    location: 'Baraton Residential',
    ownerId: 'user-agnes',
    ownerName: 'Agnes Rotich',
    ownerContact: '0765 890 123',
    status: 'Available',
    listedDate: '2026-07-05',
    imageCode: 'generic'
  },
  {
    id: 'res-cooking-pot',
    title: 'Large Cooking Pot (30L)',
    category: 'household items',
    condition: 'Excellent',
    description: 'Aluminium cooking pot, 30-litre capacity. Perfect for community events, chama feasts, or large family gatherings. Comes with lid.',
    lendingType: 'Borrowing',
    location: 'Baraton Residential',
    ownerId: 'user-agnes',
    ownerName: 'Agnes Rotich',
    ownerContact: '0765 890 123',
    status: 'Available',
    listedDate: '2026-08-12',
    imageCode: 'generic'
  },

  // ── Peter Langat (2 items) ──
  {
    id: 'res-drill',
    title: 'Electric Drill (Bosch)',
    category: 'trade equipment',
    condition: 'Good',
    description: 'Bosch electric drill with hammer function. Comes with a set of drill bits (3mm-13mm). Great for home repairs and construction.',
    lendingType: 'Borrowing',
    location: 'Near Baraton Primary School',
    ownerId: 'user-peter',
    ownerName: 'Peter Langat',
    ownerContact: '0765 901 234',
    status: 'Available',
    listedDate: '2026-07-28',
    imageCode: 'generic'
  },
  {
    id: 'res-saw',
    title: 'Hand Saw (Carpentry)',
    category: 'trade equipment',
    condition: 'Good',
    description: 'Professional hand saw for wood cutting. 22-inch blade, recently sharpened. Useful for carpentry projects, pruning, and general construction.',
    lendingType: 'Borrowing',
    location: 'Near Baraton Primary School',
    ownerId: 'user-peter',
    ownerName: 'Peter Langat',
    ownerContact: '0765 901 234',
    status: 'Available',
    listedDate: '2026-08-08',
    imageCode: 'generic'
  },

  // ── Vick Okelloh (2 items) ──
  {
    id: 'res-computing',
    title: 'Introduction to Computing',
    category: 'textbooks',
    condition: 'Fair',
    description: 'Introduction to Computer Science textbook. Covers algorithms, data structures, and programming basics. Good for INSY 101 or basic tech literacy.',
    lendingType: 'Borrowing',
    location: 'UEAB Campus',
    ownerId: 'user-vick',
    ownerName: 'Vick Okelloh',
    ownerContact: '0765 123 456',
    status: 'Available',
    listedDate: '2026-06-06',
    imageCode: 'computing'
  },
  {
    id: 'res-power-bank',
    title: '20000mAh Power Bank',
    category: 'household items',
    condition: 'Excellent',
    description: 'High-capacity power bank with dual USB output and fast charging. Can charge a phone 4-5 times. Essential for students during power outages.',
    lendingType: 'Borrowing',
    location: 'UEAB Campus',
    ownerId: 'user-vick',
    ownerName: 'Vick Okelloh',
    ownerContact: '0765 123 456',
    status: 'Available',
    listedDate: '2026-08-15',
    imageCode: 'generic'
  },

  // ── Samuel Rono (2 items) ──
  {
    id: 'res-watering-can',
    title: '20L Watering Can',
    category: 'farm tools',
    condition: 'Good',
    description: 'Large plastic watering can with rose sprinkler head. Great for watering seedlings and kitchen garden vegetables. Light and easy to carry.',
    lendingType: 'Borrowing',
    location: 'Baraton Residential',
    ownerId: 'user-samuel',
    ownerName: 'Samuel Rono',
    ownerContact: '0765 012 345',
    status: 'Available',
    listedDate: '2026-07-30',
    imageCode: 'generic'
  },
  {
    id: 'res-pruning-shears',
    title: 'Pruning Shears & Garden Gloves',
    category: 'farm tools',
    condition: 'Excellent',
    description: 'Set of bypass pruning shears and a pair of leather garden gloves. Perfect for trimming tea bushes, coffee plants, and ornamental shrubs.',
    lendingType: 'Borrowing',
    location: 'Baraton Residential',
    ownerId: 'user-samuel',
    ownerName: 'Samuel Rono',
    ownerContact: '0765 012 345',
    status: 'Available',
    listedDate: '2026-08-14',
    imageCode: 'generic'
  },

  // ── Janet Cherop (2 items) ──
  {
    id: 'res-projector',
    title: 'Portable Mini Projector',
    category: 'household items',
    condition: 'Excellent',
    description: 'Compact LED projector with HDMI input. Supports up to 1080p. Great for movie nights, presentations, or watching football matches with friends.',
    lendingType: 'Borrowing',
    location: 'UEAB Campus',
    ownerId: 'user-janet',
    ownerName: 'Janet Cherop',
    ownerContact: '0765 111 222',
    status: 'Available',
    listedDate: '2026-08-11',
    imageCode: 'generic'
  },
  {
    id: 'res-english-textbook',
    title: 'New Kenya Secondary English',
    category: 'textbooks',
    condition: 'Good',
    description: 'New Kenya Secondary School English grammar and composition book. Useful for KCSE candidates and anyone improving their English writing skills.',
    lendingType: 'Borrowing',
    location: 'UEAB Campus',
    ownerId: 'user-janet',
    ownerName: 'Janet Cherop',
    ownerContact: '0765 111 222',
    status: 'Available',
    listedDate: '2026-08-03',
    imageCode: 'generic'
  },

  // ── Brian Kibet (2 items) ──
  {
    id: 'res-tractor-plough',
    title: 'Tractor Disc Plough (3-disc)',
    category: 'farm tools',
    condition: 'Good',
    description: 'Three-disc plough attachment for medium-sized tractors. Ideal for preparing 1-5 acre plots before planting. Can be transported to your farm.',
    lendingType: 'Borrowing',
    location: 'Baraton Tea Zone',
    ownerId: 'user-brian',
    ownerName: 'Brian Kibet',
    ownerContact: '0765 222 333',
    status: 'Available',
    listedDate: '2026-07-12',
    imageCode: 'generic'
  },
  {
    id: 'res-milking-machine',
    title: 'Portable Milking Machine',
    category: 'farm tools',
    condition: 'Good',
    description: 'Electric milking machine for 1-2 cows. Saves time and ensures hygiene. Comes with清洗 cups and milk cans. Perfect for small dairy farms.',
    lendingType: 'Borrowing',
    location: 'Baraton Farm Area',
    ownerId: 'user-brian',
    ownerName: 'Brian Kibet',
    ownerContact: '0765 222 333',
    status: 'Available',
    listedDate: '2026-08-06',
    imageCode: 'generic'
  },

  // ── Esther Wafula (2 items) ──
  {
    id: 'res-market-baskets',
    title: 'Woven Market Baskets (Set of 4)',
    category: 'trade equipment',
    condition: 'Excellent',
    description: 'Handwoven Kisii stone baskets in 4 sizes. Perfect for displaying and selling produce at the market. Durable and locally made.',
    lendingType: 'Donation',
    location: 'Baraton Market Area',
    ownerId: 'user-esther',
    ownerName: 'Esther Wafula',
    ownerContact: '0765 333 444',
    status: 'Available',
    listedDate: '2026-08-09',
    imageCode: 'generic'
  },
  {
    id: 'res-umbrella',
    title: 'Large Market Umbrella (3m)',
    category: 'trade equipment',
    condition: 'Good',
    description: 'Heavy-duty canvas umbrella for market stalls. Provides shade and rain protection. Comes with a sturdy metal stand. Used but in good shape.',
    lendingType: 'Borrowing',
    location: 'Baraton Market Area',
    ownerId: 'user-esther',
    ownerName: 'Esther Wafula',
    ownerContact: '0765 333 444',
    status: 'Available',
    listedDate: '2026-08-16',
    imageCode: 'generic'
  },

  // ── Moses Biwott (2 items) ──
  {
    id: 'res-irrigation-hose',
    title: '50m Garden Irrigation Hose',
    category: 'farm tools',
    condition: 'Good',
    description: 'Flexible 50-metre garden hose with connectors and spray nozzle. Connects to a tap or water tank for irrigating crops and vegetable gardens.',
    lendingType: 'Borrowing',
    location: 'Baraton Farm Area',
    ownerId: 'user-moses',
    ownerName: 'Moses Biwott',
    ownerContact: '0765 444 555',
    status: 'Available',
    listedDate: '2026-07-26',
    imageCode: 'generic'
  },
  {
    id: 'res-chicken-coop',
    title: 'Portable Chicken Coop (10 hens)',
    category: 'farm tools',
    condition: 'Fair',
    description: 'Wooden chicken coop that houses up to 10 hens. Has nesting boxes and a removable tray for easy cleaning. Can be moved around the compound.',
    lendingType: 'Borrowing',
    location: 'Baraton Farm Area',
    ownerId: 'user-moses',
    ownerName: 'Moses Biwott',
    ownerContact: '0765 444 555',
    status: 'Available',
    listedDate: '2026-08-13',
    imageCode: 'generic'
  },

  // ── Lilian Naliaka (2 items) ──
  {
    id: 'res-math-textbook',
    title: 'Mathematics for Form 3 & 4',
    category: 'textbooks',
    condition: 'Good',
    description: 'Comprehensive KCSE mathematics textbook covering algebra, geometry, trigonometry, and statistics. With worked examples and practice questions.',
    lendingType: 'Borrowing',
    location: 'Near UEAB Main Gate',
    ownerId: 'user-lilian',
    ownerName: 'Lilian Naliaka',
    ownerContact: '0765 555 666',
    status: 'Available',
    listedDate: '2026-08-07',
    imageCode: 'generic'
  },
  {
    id: 'res-desk-lamp',
    title: 'Rechargeable LED Desk Lamp',
    category: 'household items',
    condition: 'Excellent',
    description: 'Brightness-adjustable LED desk lamp with USB charging port. Perfect for studying. Lasts up to 8 hours on a full charge. Includes power adapter.',
    lendingType: 'Borrowing',
    location: 'UEAB Student Hostels',
    ownerId: 'user-lilian',
    ownerName: 'Lilian Naliaka',
    ownerContact: '0765 555 666',
    status: 'Available',
    listedDate: '2026-08-17',
    imageCode: 'lantern'
  }
];

BCRSS.INITIAL_JOBS = [
  // ── Peter Langat (2 jobs) ──
  {
    id: 'job-carpenter',
    title: 'Carpenter for Furniture Repair',
    category: 'Skilled Trade',
    status: 'Open',
    description: 'Need a skilled carpenter to repair wooden chairs and a table. Materials will be provided. Must have experience with residential furniture and own tools.',
    location: 'Near Baraton Primary School',
    rate: 'KSh 2,000',
    duration: '1 day',
    postedBy: 'Peter Langat',
    postedById: 'user-peter',
    postedDate: '2026-06-06',
    contactInfo: '0765 901 234',
    requirements: ['Bring your own tools', 'Experience with furniture repair']
  },
  {
    id: 'job-plumber',
    title: 'Plumber for Kitchen Renovation',
    category: 'Skilled Trade',
    status: 'Open',
    description: 'Looking for a plumber to install new pipes and a sink in my kitchen. Need someone experienced with PVC and copper piping. Materials supplied.',
    location: 'Baraton Residential',
    rate: 'KSh 3,500',
    duration: '2 days',
    postedBy: 'Peter Langat',
    postedById: 'user-peter',
    postedDate: '2026-08-01',
    contactInfo: '0765 901 234',
    requirements: ['Own plumbing tools', 'Experience with residential plumbing', 'References preferred']
  },

  // ── Elijah Sang (2 jobs) ──
  {
    id: 'job-farmhand',
    title: 'Farm Hand for Maize Harvest',
    category: 'Farm Work',
    status: 'Open',
    description: 'Looking for 2-3 people to help with maize harvesting on a 2-acre plot near Baraton. Cutting, stacking, and carting. Lunch and water provided daily.',
    location: 'Baraton Farm Area',
    rate: 'KSh 500/day',
    duration: '3 days',
    postedBy: 'Elijah Sang',
    postedById: 'user-elijah',
    postedDate: '2026-06-06',
    contactInfo: '0765 789 012',
    requirements: []
  },
  {
    id: 'job-herdboy',
    title: 'Herdboy for Dairy Cattle (2 cows)',
    category: 'Farm Work',
    status: 'Open',
    description: 'Need a reliable person to graze and care for 2 dairy cows daily. Morning and evening milking included. Feeding and basic health monitoring. Accommodation provided.',
    location: 'Baraton Farm Area',
    rate: 'KSh 4,000/month',
    duration: 'Ongoing',
    postedBy: 'Elijah Sang',
    postedById: 'user-elijah',
    postedDate: '2026-08-05',
    contactInfo: '0765 789 012',
    requirements: ['Experience with dairy cattle', 'Trustworthy and punctual', 'Willing to live on-site']
  },

  // ── Agnes Rotich (2 jobs) ──
  {
    id: 'job-tutor',
    title: 'Math Tutor for Form 4 Student',
    category: 'Tutoring',
    status: 'Open',
    description: 'Seeking a university student to tutor Mathematics and Physics for KCSE preparation. Twice a week in the evenings. Must be patient with strong academic record.',
    location: 'Baraton Residential',
    rate: 'KSh 300/hour',
    duration: 'Ongoing',
    postedBy: 'Agnes Rotich',
    postedById: 'user-agnes',
    postedDate: '2026-06-06',
    contactInfo: '0765 890 123',
    requirements: ['University student', 'Strong academic record', 'Patience']
  },
  {
    id: 'job-seamstress',
    title: 'Seamstress for School Uniforms',
    category: 'Skilled Trade',
    status: 'Open',
    description: 'Need a seamstress to sew 5 pairs of school uniforms (shirts and trousers) for my children. Fabric will be provided. Must be able to follow a pattern.',
    location: 'Baraton Residential',
    rate: 'KSh 400/pair',
    duration: '1 week',
    postedBy: 'Agnes Rotich',
    postedById: 'user-agnes',
    postedDate: '2026-08-10',
    contactInfo: '0765 890 123',
    requirements: ['Own sewing machine', 'Experience with uniform sewing', 'Attention to detail']
  },

  // ── Brian Kibet (2 jobs) ──
  {
    id: 'job-teapicking',
    title: 'Tea Picking Helpers Wanted',
    category: 'Casual Labor',
    status: 'Open',
    description: 'Tea pickers needed for small tea farm. Experience preferred but not required. Early morning start. Pay based on weight harvested.',
    location: 'Baraton Tea Zone',
    rate: 'KSh 400/day',
    duration: '1 week',
    postedBy: 'Brian Kibet',
    postedById: 'user-brian',
    postedDate: '2026-06-06',
    contactInfo: '0765 222 333',
    requirements: []
  },
  {
    id: 'job-fence',
    title: 'Fencing Labourers Needed',
    category: 'Casual Labor',
    status: 'Open',
    description: 'Need 4 people to help put up a chain-link fence around a 1-acre plot. Digging post holes, setting posts, and stretching the mesh. 3-day job.',
    location: 'Baraton Tea Zone',
    rate: 'KSh 600/day',
    duration: '3 days',
    postedBy: 'Brian Kibet',
    postedById: 'user-brian',
    postedDate: '2026-08-12',
    contactInfo: '0765 222 333',
    requirements: ['Physically fit', 'Own tools (post-hole digger, pliers)']
  },

  // ── Samuel Rono (2 jobs) ──
  {
    id: 'job-tutor-science',
    title: 'Science Tutor for KCSE Candidates',
    category: 'Tutoring',
    status: 'Open',
    description: 'Looking for a tutor to coach 3 students in Biology and Chemistry for KCSE. Group sessions at my home. Need someone who can make the subjects interesting.',
    location: 'Baraton Residential',
    rate: 'KSh 500/student/session',
    duration: '3 months (to exam)',
    postedBy: 'Samuel Rono',
    postedById: 'user-samuel',
    postedDate: '2026-07-15',
    contactInfo: '0765 012 345',
    requirements: ['University science student or teacher', 'Past paper experience', 'Patient with teens']
  },
  {
    id: 'job-chauffer',
    title: 'Driver for Weekend Market Run',
    category: 'Casual Labor',
    status: 'Open',
    description: 'Need a driver with a pickup truck to transport produce from farms to Baraton market every Saturday morning. Must have a valid driving license.',
    location: 'Baraton to Nandi Hills',
    rate: 'KSh 1,500/trip',
    duration: 'Every Saturday',
    postedBy: 'Samuel Rono',
    postedById: 'user-samuel',
    postedDate: '2026-08-08',
    contactInfo: '0765 012 345',
    requirements: ['Valid driving license', 'Own pickup truck', 'Punctual']
  },

  // ── Mary Chebet (2 jobs) ──
  {
    id: 'job-market-assistant',
    title: 'Market Stall Assistant',
    category: 'Trade & Business',
    status: 'Open',
    description: 'Assistant needed for my produce stall at Baraton market. Tasks include arranging vegetables, serving customers, and handling M-Pesa payments. Must be honest.',
    location: 'Baraton Open Market',
    rate: 'KSh 500/day',
    duration: 'Every Saturday',
    postedBy: 'Mary Chebet',
    postedById: 'user-mary',
    postedDate: '2026-07-25',
    contactInfo: '0765 234 567',
    requirements: ['Honest and trustworthy', 'Basic M-Pesa knowledge', 'Good with customers']
  },
  {
    id: 'job-sprayer-operator',
    title: 'Sprayer Operator for Tomato Farm',
    category: 'Farm Work',
    status: 'Open',
    description: 'Need someone to spray pesticides on my 0.5-acre tomato farm. I have the sprayer and chemicals. Need someone who knows correct mixing ratios and safety.',
    location: 'Baraton Market Area',
    rate: 'KSh 800/day',
    duration: '2 days',
    postedBy: 'Mary Chebet',
    postedById: 'user-mary',
    postedDate: '2026-08-14',
    contactInfo: '0765 234 567',
    requirements: ['Experience with crop spraying', 'Knows pesticide safety', 'Own protective gear']
  },

  // ── Joseph Kiprop (1 job) ──
  {
    id: 'job-mason',
    title: 'Mason for Pit Latrine Construction',
    category: 'Skilled Trade',
    status: 'Open',
    description: 'Need an experienced mason to construct a modern pit latrine behind my house. Must know how to build with bricks and cement. Materials will be purchased separately.',
    location: 'Near UEAB Main Gate',
    rate: 'KSh 8,000',
    duration: '5 days',
    postedBy: 'Joseph Kiprop',
    postedById: 'user-joseph',
    postedDate: '2026-08-03',
    contactInfo: '0765 567 890',
    requirements: ['Bricklaying experience', 'Own trowel and level', 'Portfolio of past work']
  },

  // ── Esther Wafula (2 jobs) ──
  {
    id: 'job-trader-assistant',
    title: 'Saturday Market Greengrocer Assistant',
    category: 'Trade & Business',
    status: 'Open',
    description: 'Need a young, energetic person to help at my vegetable stall every Saturday. duties include carrying produce, arranging display, and mopping up at close of business.',
    location: 'Baraton Open Market',
    rate: 'KSh 450/day',
    duration: 'Every Saturday',
    postedBy: 'Esther Wafula',
    postedById: 'user-esther',
    postedDate: '2026-07-20',
    contactInfo: '0765 333 444',
    requirements: ['Available every Saturday', 'Physically able to carry 20kg bags', 'Punctual']
  },
  {
    id: 'job-chama-treasurer',
    title: 'Chama Treasurer (Part-Time)',
    category: 'Chama Activities',
    status: 'Open',
    description: 'Our women\'s chama needs a treasurer to manage weekly contributions, keep financial records, and prepare monthly reports. Must be a member of the group or willing to join.',
    location: 'Baraton Community Hall',
    rate: 'KSh 1,000/month',
    duration: 'Ongoing',
    postedBy: 'Esther Wafula',
    postedById: 'user-esther',
    postedDate: '2026-08-15',
    contactInfo: '0765 333 444',
    requirements: ['Basic bookkeeping skills', 'Trustworthy', 'Available for weekly meetings']
  },

  // ── Moses Biwott (1 job) ──
  {
    id: 'job-tree-planting',
    title: 'Tree Planting Labourers',
    category: 'Farm Work',
    status: 'Open',
    description: 'Need 5 people to help plant 200 Grevillea seedlings on my farm. Digging holes, planting, and mulching. Seedlings and water provided. One-day job.',
    location: 'Baraton Farm Area',
    rate: 'KSh 600/day',
    duration: '1 day',
    postedBy: 'Moses Biwott',
    postedById: 'user-moses',
    postedDate: '2026-08-11',
    contactInfo: '0765 444 555',
    requirements: ['Physically fit', 'Own Wellington boots']
  },

  // ── Lilian Naliaka (1 job) ──
  {
    id: 'job-note-taking',
    title: 'Note-Taker for Visually Impaired Student',
    category: 'Casual Labor',
    status: 'Open',
    description: 'A visually impaired student at UEAB needs someone to take detailed lecture notes for 3 courses (Biology, English, and Geography). Must attend all lectures and type notes neatly.',
    location: 'UEAB Campus',
    rate: 'KSh 2,000/month',
    duration: 'Full semester',
    postedBy: 'Lilian Naliaka',
    postedById: 'user-lilian',
    postedDate: '2026-08-16',
    contactInfo: '0765 555 666',
    requirements: ['Enrolled at UEAB', 'Good handwriting/typing', 'Reliable attendance', 'Compassionate']
  },

  // ── Daniel Korir (1 job) ──
  {
    id: 'job-boda-boda',
    title: 'Boda Boda Rider for Deliveries',
    category: 'Casual Labor',
    status: 'Open',
    description: 'Need a boda boda rider to make deliveries between Baraton and Nandi Hills town. Documents, parcels, and small goods. Own motorcycle required.',
    location: 'Baraton Village',
    rate: 'KSh 300/trip',
    duration: 'As needed (2-3 trips/week)',
    postedBy: 'Daniel Korir',
    postedById: 'user-daniel',
    postedDate: '2026-08-13',
    contactInfo: '0765 678 901',
    requirements: ['Own motorcycle', 'Valid license', 'Phone with M-Pesa']
  }
];

BCRSS.INITIAL_REQUESTS = [
  {
    id: 'req-1',
    itemId: 'res-wheelbarrow',
    itemTitle: 'Wheelbarrow',
    requesterId: 'user-vick',
    requesterName: 'Vick Okelloh',
    requesterContact: '0765 123 456',
    ownerId: 'user-daniel',
    startDate: '2026-06-10',
    endDate: '2026-06-12',
    status: 'Approved',
    requestDate: '2026-06-08',
    message: 'Need to move organic manure to my kitchen garden. Thanks Daniel!'
  },
  {
    id: 'req-2',
    itemId: 'res-sprayer',
    itemTitle: 'Knapsack Sprayer (16L)',
    requesterId: 'user-moses',
    requesterName: 'Moses Biwott',
    requesterContact: '0765 444 555',
    ownerId: 'user-mary',
    startDate: '2026-08-20',
    endDate: '2026-08-22',
    status: 'Pending',
    requestDate: '2026-08-17',
    message: 'Hi Mary, I need to spray my tomato farm this weekend. Will return it clean and on time.'
  },
  {
    id: 'req-3',
    itemId: 'res-biology',
    itemTitle: 'Biology 101 - Campbell',
    requesterId: 'user-faith',
    requesterName: 'Faith Wanjiku',
    requesterContact: '0765 345 678',
    ownerId: 'user-grace',
    startDate: '2026-09-01',
    endDate: '2026-12-15',
    status: 'Pending',
    requestDate: '2026-08-16',
    message: 'Grace, I need this for my BIOL 101 course this semester. I promise to take good care of it!'
  },
  {
    id: 'req-4',
    itemId: 'res-tent',
    itemTitle: 'Community Meeting Tent',
    requesterId: 'user-esther',
    requesterName: 'Esther Wafula',
    requesterContact: '0765 333 444',
    ownerId: 'user-elijah',
    startDate: '2026-09-10',
    endDate: '2026-09-12',
    status: 'Approved',
    requestDate: '2026-08-10',
    message: 'Our women\'s chama is having a AGM on Sept 11. Could we borrow the tent for the weekend?'
  },
  {
    id: 'req-5',
    itemId: 'res-machete',
    itemTitle: 'Panga (Machete) with Sheath',
    requesterId: 'user-brian',
    requesterName: 'Brian Kibet',
    requesterContact: '0765 222 333',
    ownerId: 'user-joseph',
    startDate: '2026-08-15',
    endDate: '2026-08-17',
    status: 'Returned',
    requestDate: '2026-08-12',
    message: 'Joseph, need the panga to clear some brush on my tea farm. Will bring it back sharpened!'
  }
];

BCRSS.INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    rating: 5,
    comment: 'Lent her my knapsack sprayer and she returned it fully cleaned and ahead of time. Very trustworthy neighbor!',
    reviewerName: 'Mary Chebet',
    reviewerRole: 'Lender',
    date: '2026-06-15',
    targetName: 'Faith Wanjiku'
  },
  {
    id: 'rev-2',
    rating: 4,
    comment: 'Helped repair my chicken coop perfectly. Timely and very efficient with his carpentry tools.',
    reviewerName: 'Joseph Kiprop',
    reviewerRole: 'Employer',
    date: '2026-06-10',
    targetName: 'Elijah Sang'
  },
  {
    id: 'rev-3',
    rating: 5,
    comment: 'Borrowed the wheelbarrow for a weekend project. Daniel was flexible with pickup time and the wheelbarrow worked perfectly.',
    reviewerName: 'Vick Okelloh',
    reviewerRole: 'Borrower',
    date: '2026-06-14',
    targetName: 'Daniel Korir'
  },
  {
    id: 'rev-4',
    rating: 5,
    comment: 'Grace is an amazing person! She lent me her biology textbook and even shared her own class notes. Saved me so much money.',
    reviewerName: 'Faith Wanjiku',
    reviewerRole: 'Borrower',
    date: '2026-07-20',
    targetName: 'Grace Akinyi'
  },
  {
    id: 'rev-5',
    rating: 4,
    comment: 'Samuel organized a great group tutoring session for my son. The science tutor he recommended was excellent.',
    reviewerName: 'Agnes Rotich',
    reviewerRole: 'Employer',
    date: '2026-08-01',
    targetName: 'Samuel Rono'
  },
  {
    id: 'rev-6',
    rating: 3,
    comment: 'The panga was slightly dull when I received it, but Joseph offered to sharpen it when I mentioned it. Decent overall.',
    reviewerName: 'Brian Kibet',
    reviewerRole: 'Borrower',
    date: '2026-08-17',
    targetName: 'Joseph Kiprop'
  },
  {
    id: 'rev-7',
    rating: 5,
    comment: 'Esther helped me set up my market stall and showed me the best spots for selling vegetables. So kind and experienced!',
    reviewerName: 'Janet Cherop',
    reviewerRole: 'Borrower',
    date: '2026-08-10',
    targetName: 'Esther Wafula'
  }
];
