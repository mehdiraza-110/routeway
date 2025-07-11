// components/Header.tsx

import Image from "next/image";

const Navbar = () => {
  return (
    <header className="w-full py-5">
      <div className="flex justify-center items-center">
        <Image
          src="/logo.png"
          alt="Routeway Insurance Group Logo"
          width={300}
          height={70}
          // className=""
          priority
        />
      </div>
    </header>
  );
};

export default Navbar;
