import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-primary">BORAN</h3>
          <p className="text-gray-600">
          Discover the beauty of Cambodia through our exquisite handmade crafts. Explore our collection of traditional textiles, pottery, wood carvings, and more. Shop now and support local artisans!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            <Link href="/" className="block text-gray-600 hover:text-primary">Home</Link>
            <Link href="/products" className="block text-gray-600 hover:text-primary">Products</Link>
            <Link href="/about" className="block text-gray-600 hover:text-primary">About Us</Link>
            <Link href="/contact" className="block text-gray-600 hover:text-primary">Contact</Link>
          </nav>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="font-semibold mb-4">Customer Support</h4>
          <nav className="space-y-2">
            <Link href="/shipping" className="block text-gray-600 hover:text-primary">Shipping</Link>
            <Link href="/returns" className="block text-gray-600 hover:text-primary">Returns</Link>
            <Link href="/faq" className="block text-gray-600 hover:text-primary">FAQ</Link>
            <Link href="/terms" className="block text-gray-600 hover:text-primary">Terms of Service</Link>
          </nav>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank" className="text-gray-600 hover:text-primary">
              <Facebook />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="text-gray-600 hover:text-primary">
              <Instagram />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="text-gray-600 hover:text-primary">
              <Twitter />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-6 mt-8 pt-6 border-t text-center text-gray-600">
        <p>&copy; {currentYear} BORAN. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer