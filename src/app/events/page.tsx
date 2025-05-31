import EventsPageContent from './EventsPageContent';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export const metadata = {
  title: 'Alla evenemang - Kino Uppsala',
  description: 'Bläddra bland evenemang och live evenemang',
};

export default function Events() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EventsPageContent />
    </Suspense>
  );
}
