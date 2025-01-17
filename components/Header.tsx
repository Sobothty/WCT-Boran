"use client";

import Link from "next/link";
import React from "react";
import Form from "next/form"
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex flex-wrap justify-between items-center px-24 py-2">
      <div>
        <Link href="/" className="text-primary font-bold text-2xl hover:opacity-50 cursor-pointer mx-auto sm:mx-auto">
          BORAN
        </Link>
        <Form action={""}></Form>
      </div>
    </header>
  );
};

export default Header;
