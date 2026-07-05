export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Member' | 'Admin';
  location: string;
  contact: string;
  avatarColor: string;
}

export type ResourceCategory = 'farm tools' | 'textbooks' | 'household items';
export type ResourceCondition = 'Excellent' | 'Good' | 'Fair';
export type LendingType = 'Borrowing' | 'Donation';
export type ResourceStatus = 'Available' | 'Borrowed';

export interface ResourceItem {
  id: string;
  title: string;
  category: ResourceCategory;
  condition: ResourceCondition;
  description: string;
  lendingType: LendingType;
  location: string;
  ownerId: string;
  ownerName: string;
  ownerContact: string;
  status: ResourceStatus;
  listedDate: string;
  imageCode: 'sprayer' | 'lantern' | 'biology' | 'plough' | 'computing' | 'wheelbarrow' | 'generic';
}

export type JobCategory = 'Skilled Trade' | 'Farm Work' | 'Tutoring' | 'Casual Labor';
export type JobStatus = 'Open' | 'Filled';

export interface JobOpportunity {
  id: string;
  title: string;
  category: JobCategory;
  status: JobStatus;
  description: string;
  location: string;
  rate: string;
  duration: string;
  postedBy: string;
  postedById: string;
  postedDate: string;
  contactInfo: string;
}

export type BorrowRequestStatus = 'Pending' | 'Approved' | 'Declined' | 'Returned';

export interface BorrowRequest {
  id: string;
  itemId: string;
  itemTitle: string;
  requesterId: string;
  requesterName: string;
  requesterContact: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  status: BorrowRequestStatus;
  requestDate: string;
  message?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerRole: string;
  date: string;
  targetName: string;
}
