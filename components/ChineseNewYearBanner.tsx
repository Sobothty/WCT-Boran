import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import { Sparkles } from 'lucide-react';

async function ChineseNewYearBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.NIHAO);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white px-6 py-10 mx-4 mt-6 rounded-2xl shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            {sale.title}
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-6 max-w-2xl">
            {sale.description}
          </p>
          <div className="inline-block">
            <div className="bg-white text-red-600 py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 flex items-center space-x-2">
              <Sparkles className="w-6 h-6" />
              <span className="font-bold text-lg md:text-xl">
                Use Code: <span className="text-black">{sale.couponCode}</span>
              </span>
              <span className="font-bold text-lg md:text-xl">
                for {sale.discountAmount}% OFF
              </span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <img
            src="/chinese-new-year-decoration.png"
            alt="Chinese New Year Decoration"
            className="w-64 h-64 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default ChineseNewYearBanner;

