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
  students: '600+',
  studentsLabel: 'Students',
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
    contact: '+254 712 345678',
    avatarColor: 'bg-emerald'
  },
  {
    id: 'user-mary',
    name: 'Mary Chebet',
    email: 'chebet.mary@example.com',
    role: 'Member',
    location: 'Baraton Market Area',
    contact: '+254 722 000111',
    avatarColor: 'bg-teal'
  },
  {
    id: 'user-faith',
    name: 'Faith Wanjiku',
    email: 'wanjiku.faith@example.com',
    role: 'Member',
    location: 'UEAB Student Hostels',
    contact: '+254 733 222333',
    avatarColor: 'bg-indigo'
  },
  {
    id: 'user-grace',
    name: 'Grace Akinyi',
    email: 'akinyi.grace@example.com',
    role: 'Member',
    location: 'UEAB Library Area',
    contact: '+254 711 444555',
    avatarColor: 'bg-green'
  },
  {
    id: 'user-joseph',
    name: 'Joseph Kiprop',
    email: 'kiprop.joe@example.com',
    role: 'Member',
    location: 'Near UEAB Main Gate',
    contact: '+254 715 666777',
    avatarColor: 'bg-cyan'
  },
  {
    id: 'user-daniel',
    name: 'Daniel Korir',
    email: 'korir.dan@example.com',
    role: 'Member',
    location: 'Baraton Village',
    contact: '+254 725 888999',
    avatarColor: 'bg-orange'
  },
  {
    id: 'user-elijah',
    name: 'Elijah Sang',
    email: 'sang.elijah@example.com',
    role: 'Member',
    location: 'Baraton Farm Area',
    contact: '+254 701 123456',
    avatarColor: 'bg-amber'
  }
];

BCRSS.INITIAL_RESOURCES = [
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
    ownerContact: '+254 722 000111',
    status: 'Available',
    listedDate: '2026-06-06',
    imageCode: 'sprayer'
  },
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
    ownerContact: '+254 733 222333',
    status: 'Available',
    listedDate: '2026-06-06',
    imageCode: 'lantern'
  },
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
    ownerContact: '+254 711 444555',
    status: 'Available',
    listedDate: '2026-06-06',
    imageCode: 'biology'
  },
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
    ownerContact: '+254 715 666777',
    status: 'Available',
    listedDate: '2026-06-06',
    imageCode: 'plough'
  },
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
    ownerContact: '+254 712 345678',
    status: 'Available',
    listedDate: '2026-06-06',
    imageCode: 'computing'
  },
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
    ownerContact: '+254 725 888999',
    status: 'Borrowed',
    listedDate: '2026-06-06',
    imageCode: 'wheelbarrow'
  }
];

BCRSS.INITIAL_JOBS = [
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
    contactInfo: '+254 721 987654',
    requirements: ['Bring your own tools', 'Experience with furniture repair']
  },
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
    contactInfo: '+254 701 123456',
    requirements: []
  },
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
    contactInfo: '+254 714 555666',
    requirements: ['University student', 'Strong academic record', 'Patience']
  },
  {
    id: 'job-teapicking',
    title: 'Tea Picking Helpers Wanted',
    category: 'Casual Labor',
    status: 'Open',
    description: 'Tea pickers needed for small tea farm. Experience preferred but not required. Early morning start. Pay based on weight harvested.',
    location: 'Baraton Tea Zone',
    rate: 'KSh 400/day',
    duration: '1 week',
    postedBy: 'Chama Upendo',
    postedById: 'user-chama',
    postedDate: '2026-06-06',
    contactInfo: '+254 731 222111',
    requirements: []
  }
];

BCRSS.INITIAL_REQUESTS = [
  {
    id: 'req-1',
    itemId: 'res-wheelbarrow',
    itemTitle: 'Wheelbarrow',
    requesterId: 'user-vick',
    requesterName: 'Vick Okelloh',
    requesterContact: '+254 712 345678',
    ownerId: 'user-daniel',
    startDate: '2026-06-10',
    endDate: '2026-06-12',
    status: 'Approved',
    requestDate: '2026-06-08',
    message: 'Need to move organic manure to my kitchen garden. Thanks Daniel!'
  }
];

BCRSS.INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    rating: 5,
    comment: 'Lent her my knapsack sprayer and she returned it fully cleaned and ahead of time. Very trustworthy neighbor!',
    reviewerName: 'Mary Chebet',
    reviewerRole: 'Lender',
    date: '2026-06-05',
    targetName: 'Faith Wanjiku'
  },
  {
    id: 'rev-2',
    rating: 4,
    comment: 'Helped repair my chicken coop perfectly. Timely and very efficient with his carpentry tools.',
    reviewerName: 'Joseph Kiprop',
    reviewerRole: 'Employer',
    date: '2026-06-03',
    targetName: 'Elijah Sang'
  }
];
