// File: components/DocumentHeader.js

import { Button } from '@/components/ui/button';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import React, { useState } from 'react';
import { getAuth } from '@clerk/nextjs';
import { collection, addDoc } from 'firebase/firestore'; // Firebase Firestore import
import { db } from '../firebase'; // Firebase config import
import { sendEmail } from '../utils/sendEmail'; // Utility function to send email

function DocumentHeader() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [docId, setDocId] = useState('example-doc-id'); // Example docId

  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  return (
    <div className="flex justify-between items-center p-3 px-7 shadow-md">
      <div></div>
      <OrganizationSwitcher />
      <div className="flex gap-2">
        <Button onClick={openShareModal}>Share</Button>
        <UserButton />
      </div>
      {isShareModalOpen && (
        <ShareModal
          docId={docId}
          onClose={closeShareModal}
        />
      )}
    </div>
  );
}

function ShareModal({ docId, onClose }) {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("view"); // Default permission

  const handleShare = async () => {
    if (!email || !validateEmail(email)) {
      alert('Please enter a valid email');
      return;
    }

    const { user } = getAuth(); // Clerk authentication
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    try {
      // Gravatar URL for avatar based on email
      const avatarUrl = `https://www.gravatar.com/avatar/${email.trim().toLowerCase()}?d=identicon`;

      // Firestore: Save the shared document info
      const docRef = await addDoc(collection(db, 'sharedDocuments'), {
        docId,
        sharedAt: new Date(),
        userId: user.id,  // Clerk's user ID
        email,
        permission,
        avatar: avatarUrl,
      });

      console.log('Document shared successfully with docId:', docRef.id);

      // Send email notification
      await sendEmail(email, docId, permission);

      setEmail("");
      onClose();
    } catch (error) {
      console.error('Error sharing document:', error);
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold">Share Document</h2>
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-4 w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex gap-2">
          <Button onClick={handleShare}>Share</Button>
          <Button onClick={onClose} variant="secondary">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default DocumentHeader;
