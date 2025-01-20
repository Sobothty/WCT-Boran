'use client'

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import useBasketStore from "@/store/store"
import { Check, Package, ShoppingBag } from 'lucide-react'

function SuccessPage() {
    const searchParams = useSearchParams()
    const orderNumber = searchParams.get("orderNumber")
    const clearBasket = useBasketStore((state) => state.clearBasket)

    useEffect(() => {
        if (orderNumber) {
            clearBasket()
        }
    }, [orderNumber, clearBasket])

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-2xl">
                <div className="text-center p-6 bg-green-600">
                    <div className="mx-auto mb-4 h-16 w-16 bg-white rounded-full flex items-center justify-center">
                        <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Thank you for your order</h1>
                </div>
                <div className="p-6 space-y-6">
                    <p className="text-lg text-gray-700 text-center">
                        Your order has been confirmed and will be shipped shortly.
                    </p>
                    {orderNumber && (
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-gray-600 flex items-center justify-between">
                                <span>Order Number:</span>
                                <span className="font-mono text-sm text-green-600 font-bold">
                                    {orderNumber}
                                </span>
                            </p>
                        </div>
                    )}
                    <p className="text-gray-600 text-center">
                        A confirmation email has been sent to your registered email address.
                    </p>
                </div>
                <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href="/orders" 
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        <Package className="mr-2 h-5 w-5" />
                        View Order Details
                    </Link>
                    <Link 
                        href="/" 
                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage

