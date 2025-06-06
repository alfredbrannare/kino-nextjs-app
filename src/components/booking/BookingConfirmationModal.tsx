'use client';
import { DiscountType, Seat, TicketDetails } from '@/ts/types';
import {
  Clock,
  Armchair,
  BadgeCheck,
  Clapperboard,
  Theater,
  Ticket,
  User,
  Baby,
  GraduationCap,
  Handshake,
  Accessibility,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { JSX } from 'react/jsx-runtime';

interface BookingConfirmationModalProps {
  auditorium: string;
  visible: boolean;
  seats: Seat[];
  movieTitle: string;
  screeningTime: string;
  ticketInfo: TicketDetails;
  totalPrice: number;
  onClose: () => void;
}

const ticketTypeIcons: Record<DiscountType, JSX.Element> = {
  ordinary: <Ticket size={20} className='text-yellow-400' />,
  child: <Baby size={20} className='text-yellow-400' />,
  retired: <User size={20} className='text-yellow-400' />,
  student: <GraduationCap size={20} className='text-yellow-400' />,
  member: <Handshake size={20} className='text-yellow-400' />,
};

const ticketTypeLabels = {
  ordinary: 'Ordinarie',
  child: 'Barn',
  retired: 'Pensionär',
  student: 'Student',
  member: 'Medlem',
};

const BookingConfirmationModal: FC<BookingConfirmationModalProps> = ({
  auditorium,
  visible,
  seats,
  movieTitle,
  screeningTime,
  ticketInfo,
  totalPrice,
}) => {
  const router = useRouter();

  if (!visible) return null;

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className='fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-[#2B0404] p-6 rounded-lg max-w-sm w-full text-white space-y-4 text-center border-4 border-yellow-400 shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15]'>
        <div className='flex justify-center'>
          <BadgeCheck
            size={128}
            className='text-green-600 hover:text-green-500'
          />
        </div>
        <h2 className='text-2xl font-semibold'>Bokning bekräftad!</h2>

        <div className='text-sm space-y-2 text-center'>
          <div className='flex items-center gap-2 justify-center text-sm'>
            <Clapperboard size={20} className='text-yellow-400' />
            <p>
              <strong>Film:</strong> {movieTitle}
            </p>
          </div>
          <div className='flex items-center gap-2 justify-center text-sm'>
            <Clock size={20} className='text-yellow-400' />
            <p>
              <strong>Visningstid:</strong>{' '}
              {new Date(screeningTime).toLocaleString('sv-SE', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </p>
          </div>
          <div className='flex items-center gap-2 justify-center text-sm'>
            <Theater size={24} className='text-yellow-400' />
            <p>
              <strong>Salong:</strong> {auditorium}
            </p>
          </div>
        </div>

        <div className='text-left text-sm space-y-2'>
          <div>
            <p className='font-semibold mb-1 text-center'>Valda platser:</p>
            <div className='flex flex-col items-center space-y-1'>
              {seats.map((s, i) => (
                <div key={i} className='flex items-center gap-2 text-sm'>
                  {s.isWheelchair ? (
                    <Accessibility size={20} className='text-blue-400' />
                  ) : (
                    <Armchair size={20} className='text-yellow-400' />
                  )}
                  <span>
                    Rad {s.row}, Stol {s.seat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className='font-semibold mb-1 text-center'>Biljetter:</p>
            {Object.entries(ticketInfo)
              .filter(([, count]) => count > 0)
              .map(([type, count]) => (
                <div
                  key={type}
                  className='flex items-center gap-2 justify-center text-sm text-white'
                >
                  {ticketTypeIcons[type as DiscountType] || (
                    <Ticket size={20} />
                  )}
                  <span>
                    {ticketTypeLabels[type as DiscountType] || type}: {count}
                  </span>
                </div>
              ))}
          </div>

          <p className='pt-2 text-right'>
            <strong>Totalt pris:</strong> {totalPrice.toFixed(0)} kr
          </p>
        </div>

        <button
          onClick={handleClose}
          className='mt-4 px-6 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 font-semibold cursor-pointer'
        >
          Stäng
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
