'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../components/user/AuthData';
import { useRouter } from 'next/navigation';
import AdminTabs from '../../../components/AdminTabs';
import { AuthContextType, OffersType } from '@/ts/types';

const OffersPage = () => {
  const [offers, setOffers] = useState<OffersType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newOffer, setNewOffer] = useState('');
  const { isAdmin, isLoading: isAuthLoading } = useAuth() as AuthContextType;
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, isAuthLoading, router]);

  const fetchOffers = async () => {
    try {
      const res = await fetch('/api/offers', {
        credentials: 'include',
      });
      const data = await res.json();
      setOffers(data.offers || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchOffers();
    }
  }, [isAdmin]);

  const addOffer = async () => {
    if (!newOffer.trim()) return;
    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ offer: newOffer }),
      });
      if (res.ok) {
        setNewOffer('');
        fetchOffers();
      }
    } catch (error) {
      console.error('Error adding offer:', error);
    }
  };

  const deleteOffer = async (id: string) => {
    try {
      const res = await fetch(`/api/offers/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        fetchOffers();
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  if (isAuthLoading || loading) return <p>Laddar...</p>;
  if (!isAdmin) return <p>Tillåtelse nekas</p>;

  return (
    <div className='p-6'>
      <AdminTabs />
      <div className='max-w-xl mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Hantera erbjudanden</h1>
        <div className='mb-4 flex gap-2'>
          <input
            type='text'
            value={newOffer}
            onChange={(e) => setNewOffer(e.target.value)}
            placeholder='Nytt erbjudande'
            className='flex-grow input'
          />
          <button onClick={addOffer} className='btn btn-primary'>
            Lägg till
          </button>
        </div>

        <ul>
          {offers.length === 0 && <li>Inga erbjudanden tillagda.</li>}
          {offers.map((offer) => (
            <li
              key={offer._id}
              className='flex justify-between items-center mb-2'
            >
              <span>{offer.text}</span>
              <button
                onClick={() => deleteOffer(offer._id)}
                className='btn btn-error btn-sm'
              >
                Ta bort
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OffersPage;
