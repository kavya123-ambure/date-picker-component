import Image from "next/image";
import DatePicker from './components/DatePicker';
import './globals.css';

export default function Home() {
  return (
    <div className="   gap-16 pt-8 font-[family-name:var(--font-geist-sans)] bg-purple-300 ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full ">
      <h1 className="font-bold text-4xl text-purple-700 text-center mb-6 bg-purple-100 p-4 rounded-lg shadow-md w-full sm:w-3/4 mx-auto main-font">Date Picker App</h1>
      
        <DatePicker />
            
      
      
        
       
      </main>
      <footer className="text-center mt-8 bg-gray-900 p-5">
        <p className="text-center text-gray-100 font-bold">© 2024 Date Picker App. All rights reserved.</p>
        <p className="text-center text-gray-100 text-sm font-semibold pt-2 mb-auto">
          Made with ❤️ by Kavya Ambure
          </p>
      </footer>
     
    </div>
  );
}
