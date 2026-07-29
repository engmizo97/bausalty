'use client';

import React from 'react';
import UpgradeModal from '@/components/UpgradeModal';

export default function UpgradePage() {
  return (
    <div className="flex-1 bg-paper flex items-center justify-center p-4 min-h-[80vh]">
      <UpgradeModal isOpen={true} questionsCompleted={12} />
    </div>
  );
}
