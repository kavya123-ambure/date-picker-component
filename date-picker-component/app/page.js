import Image from "next/image";
import DatePicker from './components/DatePicker';
import './globals.css';

export default function Home() {
  return (
    <div className=" alignment p-8  gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-purple-300 ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full ">
      <h1 className="font-bold text-4xl text-purple-700 text-center mb-6 bg-purple-100 p-4 rounded-lg shadow-md w-full sm:w-3/4 mx-auto main-font">Date Picker App</h1>
      
        <DatePicker />
            
      
      
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
       
       
      </main>
     
    </div>
  );
}
