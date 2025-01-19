'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ShoppingCart, ShoppingBasket, Search } from 'lucide-react';
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query');
    router.push(`/search?query=${encodeURIComponent(query as string)}`);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="text-primary font-bold text-3xl hover:opacity-80 transition-opacity">
          BORAN
        </Link>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              name="query"
              placeholder="Search for Products"
              className="w-full bg-gray-100 text-primary px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="text-gray-400 hover:text-primary transition-colors" />
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <Link
            href="/basket"
            className="flex items-center space-x-2 bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark transition-colors"
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">My Basket</span>
          </Link>
          
          <ClerkLoaded>
            {user && (
              <Link
                href="/orders"
                className="flex items-center space-x-2 bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark transition-colors"
              >
                <ShoppingBasket size={20} />
                <span className="hidden sm:inline">My Orders</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-500">Welcome back,</p>
                  <p className="font-semibold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-white text-primary border border-primary py-2 px-4 rounded-full hover:bg-primary hover:text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>
            )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={() => user.createPasskey()}
                className="bg-white text-primary border border-primary py-2 px-4 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                Create Passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;

