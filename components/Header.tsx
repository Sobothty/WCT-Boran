"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { ShoppingCart, ShoppingBag, Search, User, Heart } from "lucide-react"
import { ClerkLoaded, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs"
import useBasketStore from "@/store/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const Header = () => {
  const { user } = useUser()
  const itemCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))
  const router = useRouter()
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = formData.get("query")
    router.push(`/search?query=${encodeURIComponent(query as string)}`)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-lg bg-white/90">
      <div className="container mx-auto px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <Link href="/" className="text-primary font-bold text-3xl hover:opacity-80 transition-opacity tracking-tight">
            BORAN
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input 
                type="text" 
                name="query" 
                placeholder="Search for Products" 
                className="w-full pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
              <Button type="submit" size="sm" variant="ghost" className="absolute right-0 top-0 h-full">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link href="/favorites">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="relative">
              <Link href="/basket">
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Basket</span>
                {itemCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            <ClerkLoaded>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="lg" className="font-medium">
                      <User className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">{user.fullName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuItem asChild className="py-3">
                      <Link href="/orders" className="w-full">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="py-3">
                      <Link href="/favorites" className="w-full">
                        <Heart className="h-4 w-4 mr-2" />
                        My Favorites
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-3">
                      <UserButton afterSignOutUrl="/" />
                      <span className="ml-2">Manage Account</span>
                    </DropdownMenuItem>
                    {user.passkeys.length === 0 && (
                      <DropdownMenuItem onSelect={() => user.createPasskey()} className="py-3">
                        Create Passkey
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="py-3">
                      <SignOutButton>
                        <button className="w-full text-left">Sign Out</button>
                      </SignOutButton>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <SignInButton mode="modal">
                  <Button size="lg" className="font-medium">Sign In</Button>
                </SignInButton>
              )}
            </ClerkLoaded>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8 py-4 overflow-x-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header