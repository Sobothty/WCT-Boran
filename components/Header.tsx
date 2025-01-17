"use client";

import Link from "next/link";
import React from "react";
import Form from "next/form";
import { ShoppingBasket } from "lucide-react";
import { ClerkLoaded, useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="flex flex-wrap justify-between items-center px-24 py-2">
      <div>
        <Link
          href="/"
          className="text-primary font-bold text-2xl hover:opacity-50 cursor-pointer mx-auto sm:mx-auto"
        >
          BORAN
        </Link>
        <Form
          action={"/search"}
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="quary"
            placeholder="Seach for Products"
            className="bg-gray-100 text-primary px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary border w-full max-w-4xl"
          />
        </Form>
        <div>
          <Link
            href="/basket"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-primary text-white py-2 px-4 rounded"
          >
            <ShoppingBasket/>
            {/* Span item count */}
            <span>My Basket</span>
          </Link>
          {/* User area */}
          <ClerkLoaded>
            {user && (
              <Link
                href="/orders"
                className="flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-primary text-white font-semibold"
              ></Link>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
