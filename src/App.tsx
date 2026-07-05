import React, { useState, useEffect } from 'react';
import { User, ResourceItem, JobOpportunity, BorrowRequest, Review } from './types';
import { 
  INITIAL_USERS, 
  INITIAL_RESOURCES, 
  INITIAL_JOBS, 
  INITIAL_REQUESTS, 
  INITIAL_REVIEWS 
} from './mockData';

// import components
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Resources } from './components/Resources';
import { Jobs } from './components/Jobs';
import { Dashboard } from './components/Dashboard';
import { Admin } from './components/Admin';

// import modals
import { ShareResourceModal } from './components/ShareResourceModal';
import { PostOpportunityModal } from './components/PostOpportunityModal';
import { BorrowRequestModal } from './components/BorrowRequestModal';
import { ApplyJobModal } from './components/ApplyJobModal';

export default function App() {
  // --- 1. LOCAL STORAGE STATE INITIALIZERS ---
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('bcrss_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('bcrss_current_user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    // Default to Vick Okelloh (Admin) to showcase everything on load
    return INITIAL_USERS[0];
  });

  const [resources, setResources] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem('bcrss_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [jobs, setJobs] = useState<JobOpportunity[]>(() => {
    const saved = localStorage.getItem('bcrss_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [requests, setRequests] = useState<BorrowRequest[]>(() => {
    const saved = localStorage.getItem('bcrss_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('bcrss_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // --- 2. PERSISTENCE WORKERS ---
  useEffect(() => {
    localStorage.setItem('bcrss_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('bcrss_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bcrss_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('bcrss_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('bcrss_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('bcrss_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // --- 3. UI VIEW ROUTER STATE ---
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [dashboardSubTab, setDashboardSubTab] = useState<'requests' | 'resources' | 'jobs'>('requests');

  // --- 4. MODALS BOOLEAN TRIGGERS ---
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [borrowItemTarget, setBorrowItemTarget] = useState<ResourceItem | null>(null);
  const [applyJobTarget, setApplyJobTarget] = useState<JobOpportunity | null>(null);

  // --- 5. BUSINESS LOGIC STATE MUTATORS ---
  
  // Switch simulated account
  const handleSwitchUser = (user: User) => {
    setCurrentUser(user);
    // Reset state to avoid confusion
    alert(`Switched active profile context to: ${user.name} (${user.role})`);
  };

  // Add new listable item
  const handleSaveResource = (data: {
    title: string;
    category: 'farm tools' | 'textbooks' | 'household items';
    condition: 'Excellent' | 'Good' | 'Fair';
    description: string;
    lendingType: 'Borrowing' | 'Donation';
    location: string;
    ownerName: string;
    ownerContact: string;
  }) => {
    // Generate image helper identifier on category keyword
    let imageCode: 'sprayer' | 'lantern' | 'biology' | 'plough' | 'computing' | 'wheelbarrow' | 'generic' = 'generic';
    const lowerTitle = data.title.toLowerCase();
    
    if (lowerTitle.includes('spray')) imageCode = 'sprayer';
    else if (lowerTitle.includes('lantern') || lowerTitle.includes('solar')) imageCode = 'lantern';
    else if (lowerTitle.includes('biol')) imageCode = 'biology';
    else if (lowerTitle.includes('plough') || lowerTitle.includes('jembe')) imageCode = 'plough';
    else if (lowerTitle.includes('comput') || lowerTitle.includes('insy')) imageCode = 'computing';
    else if (lowerTitle.includes('wheel')) imageCode = 'wheelbarrow';

    const newItem: ResourceItem = {
      id: `res-${Date.now()}`,
      title: data.title,
      category: data.category,
      condition: data.condition,
      description: data.description,
      lendingType: data.lendingType,
      location: data.location,
      ownerId: currentUser.id,
      ownerName: data.ownerName,
      ownerContact: data.ownerContact,
      status: 'Available',
      listedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      imageCode
    };

    setResources((prev) => [newItem, ...prev]);
    alert(`Fantastic! "${data.title}" has been successfully shared on the listing page!`);
  };

  // Add new job opportunity on board
  const handleSaveOpportunity = (data: {
    title: string;
    category: 'Skilled Trade' | 'Farm Work' | 'Tutoring' | 'Casual Labor';
    description: string;
    location: string;
    rate: string;
    duration: string;
    contactInfo: string;
  }) => {
    const newOpportunity: JobOpportunity = {
      id: `job-${Date.now()}`,
      title: data.title,
      category: data.category,
      status: 'Open',
      description: data.description,
      location: data.location,
      rate: data.rate,
      duration: data.duration,
      postedBy: currentUser.name,
      postedById: currentUser.id,
      postedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      contactInfo: data.contactInfo
    };

    setJobs((prev) => [newOpportunity, ...prev]);
    alert(`Success! Your job post "${data.title}" is now visible to helpers on the board.`);
  };

  // Add new borrow request
  const handleSaveBorrowRequest = (data: {
    startDate: string;
    endDate: string;
    message: string;
  }) => {
    if (!borrowItemTarget) return;

    const newRequest: BorrowRequest = {
      id: `req-${Date.now()}`,
      itemId: borrowItemTarget.id,
      itemTitle: borrowItemTarget.title,
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      requesterContact: currentUser.contact,
      ownerId: borrowItemTarget.ownerId,
      startDate: data.startDate,
      endDate: data.endDate,
      status: 'Pending',
      requestDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      message: data.message
    };

    setRequests((prev) => [newRequest, ...prev]);
    alert(`Borrow request sent to ${borrowItemTarget.ownerName}! You can track its status in your Dashboard.`);
    setBorrowItemTarget(null);
  };

  // Submit job application simulation
  const handleApplyJobSubmit = (data: { pitch: string }) => {
    if (!applyJobTarget) return;
    alert(`Application submitted! A message has been sent to ${applyJobTarget.postedBy} with your summary:\n"${data.pitch}"`);
    setApplyJobTarget(null);
  };

  // Approve a borrow request
  const handleApproveRequest = (requestId: string) => {
    // 1. Mark request as Approved
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'Approved' } : r))
    );
    
    // 2. Mark the corresponding item as Borrowed
    const req = requests.find((r) => r.id === requestId);
    if (req) {
      setResources((prev) =>
        prev.map((item) =>
          item.id === req.itemId ? { ...item, status: 'Borrowed' } : item
        )
      );
    }
  };

  // Decline request 
  const handleDeclineRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'Declined' } : r))
    );
  };

  // Mark returned, return item to available pool and create a mock reviews trigger
  const handleMarkReturned = (requestId: string) => {
    // 1. Mark request as Returned
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'Returned' } : r))
    );

    // 2. Mark item as Available
    const req = requests.find((r) => r.id === requestId);
    if (req) {
      setResources((prev) =>
        prev.map((item) =>
          item.id === req.itemId ? { ...item, status: 'Available' } : item
        )
      );

      // 3. Prompt user simulator to add review to showcase ratings mechanics
      const ratingComment = prompt(
        `Leave a rating review for the partner borrower? Keep the community trusted!\nRate out of 5 stars:`,
        "5"
      );
      
      const commentText = prompt(
        "Write some optional feedback about this rental transaction:",
        "Perfect transaction, returned the tool fully cleaned and ready to go!"
      );

      if (ratingComment && commentText) {
        const rating = Math.min(5, Math.max(1, parseInt(ratingComment) || 5));
        const newReview: Review = {
          id: `rev-${Date.now()}`,
          rating,
          comment: commentText,
          reviewerName: currentUser.name,
          reviewerRole: currentUser.role,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          targetName: req.requesterName
        };
        setReviews(prev => [newReview, ...prev]);
        alert("Thank you! Your feedback is saved and updates community trust metrics.");
      }
    }
  };

  // Manual status togglers
  const handleToggleItemStatus = (itemId: string) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === itemId
          ? { ...r, status: r.status === 'Available' ? 'Borrowed' : 'Available' }
          : r
      )
    );
  };

  const handleToggleJobStatus = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? { ...j, status: j.status === 'Open' ? 'Filled' : 'Open' }
          : j
      )
    );
  };

  // Admin soft delete listing
  const handleDeleteResource = (itemId: string) => {
    setResources((prev) => prev.filter((r) => r.id !== itemId));
    alert("Resource listing permanently moderated / removed.");
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    alert("Job opportunity moderated / removed.");
  };

  const handleDeleteRequest = (requestId: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    alert("Borrow ledger record deleted.");
  };


  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6]">
      
      {/* HEADER SECTION WRAPPER */}
      <Header
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        availableUsers={users}
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        onOpenShareResource={() => setIsShareOpen(true)}
      />

      {/* CORE PAGES ROUTER BODY */}
      <main className="flex-1">
        
        {/* VIEW: HOME */}
        {currentTab === 'home' && (
          <Home
            resources={resources}
            jobs={jobs}
            currentUser={currentUser}
            onBrowseResources={() => setCurrentTab('resources')}
            onBrowseJobs={() => setCurrentTab('jobs')}
            onOpenShareResource={() => setIsShareOpen(true)}
            onOpenPostOpportunity={() => setIsPostJobOpen(true)}
            onRequestBorrow={(item) => setBorrowItemTarget(item)}
            onApplyJob={(job) => setApplyJobTarget(job)}
          />
        )}

        {/* VIEW: RESOURCES */}
        {currentTab === 'resources' && (
          <Resources
            resources={resources}
            currentUser={currentUser}
            onOpenShareResource={() => setIsShareOpen(true)}
            onRequestBorrow={(item) => setBorrowItemTarget(item)}
          />
        )}

        {/* VIEW: JOBS BOARD */}
        {currentTab === 'jobs' && (
          <Jobs
            jobs={jobs}
            currentUser={currentUser}
            onOpenPostOpportunity={() => setIsPostJobOpen(true)}
            onApplyJob={(job) => setApplyJobTarget(job)}
          />
        )}

        {/* VIEW: PERSONAL DASHBOARD */}
        {currentTab === 'dashboard' && (
          <Dashboard
            resources={resources}
            jobs={jobs}
            requests={requests}
            currentUser={currentUser}
            currentSubTab={dashboardSubTab}
            onSetSubTab={setDashboardSubTab}
            onApproveRequest={handleApproveRequest}
            onDeclineRequest={handleDeclineRequest}
            onMarkReturned={handleMarkReturned}
            onToggleItemStatus={handleToggleItemStatus}
            onToggleJobStatus={handleToggleJobStatus}
            onOpenShareResource={() => setIsShareOpen(true)}
            onOpenPostOpportunity={() => setIsPostJobOpen(true)}
          />
        )}

        {/* VIEW: ADMIN CONSOLE */}
        {currentTab === 'admin' && (
          <Admin
            resources={resources}
            jobs={jobs}
            requests={requests}
            users={users}
            reviews={reviews}
            onDeleteResource={handleDeleteResource}
            onDeleteJob={handleDeleteJob}
            onDeleteRequest={handleDeleteRequest}
            onToggleItemStatus={handleToggleItemStatus}
            onToggleJobStatus={handleToggleJobStatus}
          />
        )}

      </main>

      {/* --- FLOATING DIALOGS & SHADOW INTERLACES --- */}

      {/* Modal 1: Share resource form */}
      {isShareOpen && (
        <ShareResourceModal
          currentUser={currentUser}
          onClose={() => setIsShareOpen(false)}
          onSave={handleSaveResource}
        />
      )}

      {/* Modal 2: Post job form */}
      {isPostJobOpen && (
        <PostOpportunityModal
          currentUser={currentUser}
          onClose={() => setIsPostJobOpen(false)}
          onSave={handleSaveOpportunity}
        />
      )}

      {/* Modal 3: Request to Borrow form */}
      {borrowItemTarget && (
        <BorrowRequestModal
          item={borrowItemTarget}
          currentUser={currentUser}
          onClose={() => setBorrowItemTarget(null)}
          onSubmit={handleSaveBorrowRequest}
        />
      )}

      {/* Modal 4: Apply for job / Contact pitch */}
      {applyJobTarget && (
        <ApplyJobModal
          job={applyJobTarget}
          currentUser={currentUser}
          onClose={() => setApplyJobTarget(null)}
          onSubmit={handleApplyJobSubmit}
        />
      )}

    </div>
  );
}
