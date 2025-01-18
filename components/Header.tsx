"use client";

import Link from "next/link";
import React from "react";
import Form from "next/form";
import { ShoppingCart, ShoppingBasket } from "lucide-react";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();

  const createClerkPasskey = async () => {
    try {
      const respone = await user?.createPasskey();
      console.log(respone)
    } catch (error) {
      console.log("Error:", JSON.stringify(error, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center py-2">
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-primary font-bold text-2xl hover:opacity-50 cursor-pointer mx-auto sm:mx-auto"
        >
          BORAN
        </Link>
        <Form
          action={"/search"}
          className="w-full sm:w-auto sm:flex-1
           sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Seach for Products"
            className="bg-gray-100 text-primary px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary border w-full max-w-4xl"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link
            href="/basket"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-primary text-white py-2 px-4 rounded"
          >
            <ShoppingCart />
            {/* Span item count */}
            <span>My Basket</span>
          </Link>
          {/* User area */}
          <ClerkLoaded>
            {user && (
              <Link
                href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-primary text-white px-4 py-2 rounded"
              >
                <ShoppingBasket />
                <span>My Order</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />

                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-500 py-2 px-4 rounded border-blue-300 border"
              >
                Create a passkey now
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
