import { useRef } from 'react';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import categories from '../assets/tests/categories';
import CategoryTag from '../components/CategoryTag';

export const RecentScrollView = () => {
  const scrollRef = useRef(null);

  const scroll = direction => {
    const { current } = scrollRef;
    if (!current) return;

    const scrollAmount = 250; // pixels per click
    if (direction === 'left') {
      current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      {/* Scrollable container */}
      <div ref={scrollRef} className="flex gap-2 overflow-x-auto scroll-smooth px-4 py-1">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className={`group flex w-48 flex-shrink-0 flex-col justify-evenly gap-10 p-4 ${category.color}`}
          >
            <div className="w-full text-2xl font-bold">
              <CategoryTag categoryKey={category['key']} />
              <div className="w-full text-sm text-gray-500">3rd May{"'"} 25</div>
            </div>
            <div className="w-full text-3xl">₹ 99.99</div>
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <div
        onClick={() => scroll('left')}
        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer rounded-r bg-white/40 p-2 hover:bg-white/80"
      >
        <MdArrowLeft size={40} />
      </div>

      {/* Right arrow */}
      <div
        onClick={() => scroll('right')}
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer rounded-l bg-white/40 p-2 hover:bg-white/80"
      >
        <MdArrowRight size={40} />
      </div>
    </div>
  );
};

export default RecentScrollView;
