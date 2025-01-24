"use client"

import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";
import AddToBasketButton from "@/components/AddToBasketButton";
import Loader from "@/components/Loader";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function BasketPage() {
    const groupedItems = useBasketStore((state) => state.getGroupedItems());
    const { isSignedIn } = useAuth(); 
    const { user } = useUser();
    const router = useRouter();
    const removeFromBasket = useBasketStore((state) => state.removeFromBasket);

    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <Loader />
    }

    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-6">
                    <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
                    <h1 className="text-3xl font-bold text-gray-900">Your basket is empty</h1>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                        Looks like you have not added anything to your basket yet.
                    </p>
                    <Link 
                        href="/"
                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        )
    }

    const handleCheckout = async () => {
        if (!isSignedIn) return;
        setIsLoading(true);

        try {
            const metadata: Metadata = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
                clerkUserId: user!.id,
            };

            const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const totalItems = groupedItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Basket</h1>
                    <p className="text-gray-600">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Items List */}
                    <div className="flex-grow space-y-4">
                        {groupedItems?.map((item) => (
                            <div 
                                key={item.product._id}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                            > 
                                <div className="p-4 sm:p-6 flex gap-4 sm:gap-6">
                                    {/* Image */}
                                    <div 
                                        className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 cursor-pointer bg-gray-50 rounded-lg overflow-hidden"
                                        onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                                    >
                                        {item.product.image && (
                                            <Image
                                                src={imageUrl(item.product.image).url()}
                                                alt={item.product.name ?? "Product image"}
                                                className="w-full h-full object-cover"
                                                width={128}
                                                height={128}
                                            />
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="space-y-1 sm:space-y-2">
                                            <h2 
                                                className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-primary transition-colors"
                                                onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                                            >
                                                {item.product.name}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Unit Price: ${item.product.price?.toFixed(2)}
                                            </p>
                                            <p className="text-lg font-medium text-gray-900">
                                                Total: ${((item.product.price ?? 0) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <AddToBasketButton product={item.product} />
                                            <button
                                                onClick={() => removeFromBasket(item.product)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-96">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-24">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="h-px bg-gray-100" />
                                <div className="flex justify-between text-lg font-semibold text-gray-900">
                                    <span>Total</span>
                                    <span>${useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
                                </div>
                            </div>

                            {isSignedIn ? (
                                <button 
                                    onClick={handleCheckout}
                                    disabled={isLoading}
                                    className="mt-6 w-full bg-primary text-white font-medium px-6 py-3 rounded-lg
                                    hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors
                                    flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        'Proceed to Checkout'
                                    )}
                                </button>
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="mt-6 w-full bg-primary text-white font-medium px-6 py-3 rounded-lg
                                        hover:bg-primary/90 transition-colors">
                                        Sign in to Checkout
                                    </button>
                                </SignInButton>
                            )}

                            <p className="mt-4 text-sm text-gray-500 text-center">
                                Secure checkout powered by Stripe
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasketPage;