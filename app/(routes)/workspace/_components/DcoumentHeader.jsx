// DocumentHeader.js

import { Button } from '@/components/ui/button';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assuming you have ShadCN Avatar component

function DocumentHeader() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharedUsers, setSharedUsers] = useState([]); // New state for shared users

  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  const handleUserShare = (user) => {
    setSharedUsers((prevUsers) => [...prevUsers, user]); // Add new user to sharedUsers list
  };

  return (
    <div className="flex justify-between items-center p-3 px-7 shadow-md">
      <div></div>
      <OrganizationSwitcher />
      <div className="flex gap-2 items-center">
        {/* Render Avatars for each shared user */}
        {sharedUsers.map((user) => (
          <Avatar key={user.email} className="w-8 h-8">
            <AvatarImage src={user.avatar} alt={user.email} />
            <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        ))}
        <Button onClick={openShareModal}>Share</Button>
        <UserButton />
      </div>
      {isShareModalOpen && (
        <ShareModal
          docId="example-doc-id"
          onClose={closeShareModal}
          onShare={handleUserShare}
        />
      )}
    </div>
  );
}

function ShareModal({ docId, onClose, onShare }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getGravatarUrl = (email) => {
    const hash = email.trim().toLowerCase();
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`; // Generate Gravatar URL
  };

  const handleShare = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    const avatarUrl = getGravatarUrl(email);
    const sharedUser = { email, avatar: avatarUrl };

    console.log(`Sharing document ${docId} with ${email}`);
    setEmail("");
    onClose();
    onShare(sharedUser); // Pass shared user info to DocumentHeader
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-semibold">Share Document</h2>
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-4 w-full p-2 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-2 mt-4">
          <Button onClick={handleShare}>Share</Button>
          <Button onClick={onClose} variant="secondary">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default DocumentHeader;
