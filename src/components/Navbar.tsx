import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full p-4 bg-primary">
      <ul className="flex justify-around">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/booking">Book Now</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
