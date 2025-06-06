'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ScreeningCreator from '../../../components/ScreeningCreator';
import { useAuth } from '../../../components/user/AuthData';
import { useRouter } from 'next/navigation';
import AdminTabs from '../../../components/AdminTabs';
import { AuthContextType, ScreeningType } from '@/ts/types';

const ScreeningsPage = () => {
  const [screenings, setScreenings] = useState<ScreeningType[]>([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const {
    isLoggedIn,
    isAdmin,
    isLoading: isAuthLoading,
  } = useAuth() as AuthContextType;
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading) {
      if (!isAdmin) {
        router.push('/');
      }
    }
  }, [isLoggedIn, isAdmin, isAuthLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/screenings');
        const data = await res.json();
        setScreenings(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setUpdate(false);
  }, [update]);

  const deleteMovie = async (id: string) => {
    try {
      await fetch(`/api/screenings/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error deleting movie movies:', error);
    } finally {
      setUpdate(true);
    }
  };

  if (isAuthLoading || loading) return <p>Loading page data...</p>;
  if (!isAdmin)
    return <p>Access Denied. You are not authorized to view this page.</p>;

  const filteredScreenings = screenings.filter((screening) => {
    if (!inputSearch) return true;

    const title =
      typeof screening.movieId === 'object' && screening.movieId.title
        ? screening.movieId.title.toLowerCase()
        : '';
    return title.includes(inputSearch.toLowerCase());
  });

  return (
    <div className='p-6'>
      <AdminTabs />
      <>
        <ScreeningCreator setUpdate={setUpdate} />

        <input
          type='text'
          className='input block mx-auto mt-10'
          placeholder='Sök'
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />

        <h1 className='italic font-semibold text-3xl text-center pt-10'>
          Visningar:
        </h1>
        <br />
        {filteredScreenings
          .sort((a, b) => {
            const titleA =
              typeof a.movieId === 'object' && a.movieId.title ? a.movieId.title : '';
            const titleB =
              typeof b.movieId === 'object' && b.movieId.title ? b.movieId.title : '';
            return titleA.localeCompare(titleB);
          })
          .map((screening) => (
            <div
              key={screening._id}
              className='block mx-auto p-4 mb-3 bg-base-300 flex justify-between gap-5 max-w-200 '
            >
              <h2 className=''>
                {typeof screening.movieId === 'object' && screening.movieId.title
                  ? screening.movieId.title
                  : 'No movie title available'}
              </h2>
              <h2 className=''>
                {typeof screening.auditoriumId === 'object' && screening.auditoriumId.name
                  ? screening.auditoriumId.name
                  : 'No auditorium name'}
              </h2>
              <h2 className=''>
                {new Date(screening.startTime).toLocaleString('sv-SE', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </h2>

              <div>
                <Link
                  className='btn mr-1'
                  href={`/admin/screenings/` + screening._id}
                >
                  Details
                </Link>
                <button
                  onClick={() => deleteMovie(screening._id)}
                  className='btn btn-error'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </>
    </div>
  );
};

export default ScreeningsPage;
