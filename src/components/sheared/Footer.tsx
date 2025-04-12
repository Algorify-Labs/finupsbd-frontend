import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import logo from "/public/footer-logo.png";

export default function Footer() {
  return (
    <footer className="bg-tertiary-dark text-white">
      <div className="container">
        <div className="flex flex-col gap-4 py-16 lg:flex-row lg:gap-12">
          <div className="w-full lg:w-3/12">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <Image src={logo} alt="Finups BD Logo" width={60} height={60} />
              </Link>
              <p className="mt-2">
                Brief info about FinsUp BD and its mission to empower financial
                decisions in Bangladesh.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <Link
                  href="#"
                  className="h-[48px] w-[48px] rounded-full bg-[#0C131F] transition-all duration-100 ease-linear hover:bg-primary"
                >
                  <FaFacebookF className="p-3 text-5xl" />
                </Link>
                <Link
                  href="#"
                  className="h-[48px] w-[48px] rounded-full bg-[#0C131F] transition-all duration-100 ease-linear hover:bg-primary"
                >
                  <FaXTwitter className="p-3 text-5xl" />
                </Link>
                <Link
                  href="#"
                  className="h-[48px] w-[48px] rounded-full bg-[#0C131F] transition-all duration-100 ease-linear hover:bg-primary"
                >
                  <FaLinkedin className="p-3 text-5xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full pl-0 lg:w-9/12 lg:pl-8">
            <div className="container mx-auto mt-6 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-0">
              <div className="order-2 w-full lg:order-1">
                <h3 className="mb-6 text-xl font-semibold">Explore</h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Cards
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Loans
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Investments
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Accounts
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Bima/Insurances
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      FinsUp Islamic
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="order-3 w-full lg:order-2">
                <h3 className="mb-6 text-xl font-semibold">Usefull Links</h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Credit Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Blogs
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="order-1 w-full lg:order-3">
                <h3 className="mb-6 text-xl font-semibold">Contact Us</h3>
                <p className="mt-2">Sector 4, Uttara, Dhaka, Bangladesh</p>
                <p className="mt-2 flex items-center">
                  <Phone className="mr-2 h-5 w-5" /> +8809697480635
                </p>
                <p className="mt-2 flex items-center">
                  <Mail className="mr-2 h-5 w-5" /> info@finupsbd.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4 text-center">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 py-6 lg:flex-row">
            <p className="order-2 lg:order-1">
              &copy; 2025{" "}
              <span className="font-semibold text-primary">Finups BD</span>. All
              Rights Reserved
            </p>
            <div className="order-1 flex flex-col justify-center gap-2 lg:order-2 lg:flex-row lg:gap-6">
              <Link href="#" className="hover:text-primary">
                Terms & Conditions
              </Link>
              <Link href="#" className="hover:text-primary">
                ADM Policy
              </Link>
              <Link href="#" className="hover:text-primary">
                EMI Policy
              </Link>
              <Link href="#" className="hover:text-primary">
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
