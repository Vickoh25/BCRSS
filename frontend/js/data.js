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

// ==================== MOCK DATA ====================

BCRSS.INITIAL_USERS = [
  {
    id: 'user-vick',
    name: 'Vick Okelloh',
    email: 'okellohvick@gmail.com',
    role: 'Admin',
    location: 'UEAB Campus',
    contact: '+254 712 345678',
    avatarColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'user-mary',
    name: 'Mary Chebet',
    email: 'chebet.mary@example.com',
    role: 'Member',
    location: 'Baraton Market Area',
    contact: '+254 722 000111',
    avatarColor: 'bg-blue-600 text-white'
  },
  {
    id: 'user-faith',
    name: 'Faith Wanjiku',
    email: 'wanjiku.faith@example.com',
    role: 'Member',
    location: 'UEAB Student Hostels',
    contact: '+254 733 222333',
    avatarColor: 'bg-indigo-600 text-white'
  },
  {
    id: 'user-grace',
    name: 'Grace Akinyi',
    email: 'akinyi.grace@example.com',
    role: 'Member',
    location: 'UEAB Library Area',
    contact: '+254 711 444555',
    avatarColor: 'bg-teal-600 text-white'
  },
  {
    id: 'user-joseph',
    name: 'Joseph Kiprop',
    email: 'kiprop.joe@example.com',
    role: 'Member',
    location: 'Near UEAB Main Gate',
    contact: '+254 715 666777',
    avatarColor: 'bg-cyan-600 text-white'
  },
  {
    id: 'user-daniel',
    name: 'Daniel Korir',
    email: 'korir.dan@example.com',
    role: 'Member',
    location: 'Baraton Village',
    contact: '+254 725 888999',
    avatarColor: 'bg-orange-600 text-white'
  },
  {
    id: 'user-elijah',
    name: 'Elijah Sang',
    email: 'sang.elijah@example.com',
    role: 'Member',
    location: 'Baraton Farm Area',
    contact: '+254 701 123456',
    avatarColor: 'bg-amber-600 text-white'
  }
];

BCRSS.INITIAL_RESOURCES = [
  {
    id: 'res-sprayer',
    title: 'Knapsack Sprayer (16L)',
    category: 'farm tools',
    condition: 'Good',
    description: '16-litre knapsack sprayer for pesticide and herbicide application. Comes with adjustable nozzle. Perfect for maize and vegetable farming in Baraton. Please clean after use.',
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
    description: 'Rechargeable solar lantern with bright LED light. Extremely handy for studying during power outages or outdoor night work. Includes a small USB port for phone charging.',
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
    description: 'Campbell Biology 11th Edition. Used for BIOL 101 at UEAB. In great condition, all pages intact. Happy to lend for the full academic semester to someone who cannot afford a new one.',
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
    description: 'Heavy-duty hand plough suitable for small-scale farming. Has been well maintained and sharpened recently. Available for preparation of kitchen gardens in Baraton neighborhood.',
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
    title: 'Introduction to Computing Textbook',
    category: 'textbooks',
    condition: 'Fair',
    description: 'Introduction to Computer Science textbook. Covers algorithms, data structures, and programming basics. Good for INSY 101 or basic tech literacy. Lending out for students.',
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
    description: 'Standard construction wheelbarrow, also useful for farm work. Can carry up to 80kg. Available on weekends for local tasks and moving compost, stones or soil.',
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
    description: 'Need a skilled carpenter to repair wooden chairs and a table. Materials will be provided. Must have experience with residential furniture and own tools if possible. Work takes place near Baraton Primary School.',
    location: 'Near Baraton Primary School',
    rate: 'KSh 2,000 (negotiable)',
    duration: '1 day',
    postedBy: 'Peter Langat',
    postedById: 'user-peter',
    postedDate: '2026-06-06',
    contactInfo: '+254 721 987654',
    requirements: ['Bring your own tools', 'Experience with furniture repair']
  },
  {
    id: 'job-farmhand',
    title: 'Farm Hand Needed for Maize Harvest',
    category: 'Farm Work',
    status: 'Open',
    description: 'Looking for 2-3 people to help with maize harvesting on a 2-acre plot near Baraton. Work involves cutting, stacking, and carting, expected to take about 3 days. Lunch and drinking water will be provided daily.',
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
    description: 'Seeking a university student to tutor my child in Mathematics and Physics for KCSE preparation. Twice a week in the evenings (approx 2 hours per session). Candidate should be patient and have a strong academic record.',
    location: 'Baraton Residential',
    rate: 'KSh 300/hour',
    duration: 'Ongoing',
    postedBy: 'Agnes Rotich',
    postedById: 'user-agnes',
    postedDate: '2026-06-06',
    contactInfo: '+254 714 555666',
    requirements: ['University student with strong academic record', 'Patience and reliability']
  },
  {
    id: 'job-teapicking',
    title: 'Tea Picking Helpers Wanted',
    category: 'Casual Labor',
    status: 'Open',
    description: 'We need tea pickers for our small tea farm. Experience preferred but not required. Start early morning. Pay is based on weight harvested. High performance pickers can earn up to KSh 600 per day.',
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
    message: 'Need to move organic manure to my kitchen garden this week. Thanks Daniel!'
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
