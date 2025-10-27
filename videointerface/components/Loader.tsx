// components/Loader.tsx (Updated)
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading..."
        width={50}
        height={50}
        priority // <--- ADD THIS PROP
      />
    </div>
  );
};

export default Loader;