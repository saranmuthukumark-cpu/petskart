import Image from "next/image";
import Link from "next/link";

export default function learnMore() {
  return (
    <div className="bg-white min-h-screen p-6 md:p-12">
      <div className="bg-[#fff2ee] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Sell Pets & Livestock Easily
          </h1>

          <p className="text-gray-700 mb-6">
            PetsKart helps you connect with genuine buyers across India. List
            your pets, livestock, or supplies and reach the right audience
            quickly and safely.
          </p>

          <Link
            href={"/sellpet"}
            className="bg-[#7f5539] text-white px-6 py-3 rounded-full">
            Start Selling
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/assets/petskart-logo1.png"
            alt="petskart"
            width={300}
            height={200}
          />
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-[#fff2ee] p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Easy Listings</h3>
          <p className="text-gray-600">
            Add your pets or livestock in minutes with simple steps.
          </p>
        </div>

        <div className="bg-[#fff2ee] p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Genuine Buyers</h3>
          <p className="text-gray-600">
            Connect with verified buyers and avoid fake inquiries.
          </p>
        </div>

        <div className="bg-[#fff2ee] p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Better Pricing</h3>
          <p className="text-gray-600">
            Reach more people and get the best price for your listings.
          </p>
        </div>
      </div>

      <div className="mt-12 ">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-[#fff2ee] p-6 rounded-2xl">
            <h4 className="font-semibold mb-2">1. Create Listing</h4>
            <p className="text-gray-600 text-sm">
              Add details, price, and images of your pet.
            </p>
          </div>

          <div className="bg-[#fff2ee] p-6 rounded-2xl">
            <h4 className="font-semibold mb-2">2. Get Buyers</h4>
            <p className="text-gray-600 text-sm">
              Interested buyers contact you directly.
            </p>
          </div>

          <div className="bg-[#fff2ee] p-6 rounded-2xl">
            <h4 className="font-semibold mb-2">3. Close Deal</h4>
            <p className="text-gray-600 text-sm">
              Finalize deal safely and easily.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
