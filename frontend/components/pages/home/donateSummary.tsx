import Link from "next/link";

const DonateHeartSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

export const DonateSummary = () => (
  <>
    <div className="flex justify-center items-center">
      <h3 className="text-center">You can help us make a difference</h3>
      <Link href="/donate" className="ml-8">
        <button className="btn btn-accent text-white border-white border-1 hover:!border-white">
          <DonateHeartSVG />
          <span className="ml-1">Donate</span>
        </button>
      </Link>
    </div>
    {/* <p>
      SAMI works hard to ensure all money raised is used in the best ways to support projects that make a real
      difference. Any contributions are greatly appreciated.
    </p> */}
  </>
);

/** Legacy donate content (TODO - decide if worth keeping) **/

/*
import Image from "next/image";

import CAFLogo from "public/images/Donate/caf-logo.png";
import EFLogo from "public/images/Donate/easyfundraising.png";
import AmazonLogo from "public/images/Donate/amazon-smile.png";


    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="px-2 mb-10">
        <h4 className="text-xl font-semibold">Donate Directly</h4>
        <div className="flex flex-row mt-5 items-start">
          <Image src={CAFLogo} alt="" objectFit="contain" height={300} />
          <span className="ml-6 text-sm">
            You can donate to SAMI via CAF. Just enter the text SAMI or our charity number in the search bar (1161994).
            CAF allows for up to 25% gift aid to be claimed on all donations, with processing fees kept to an absolute
            minimum. This way we can ensure all money donated is used to the greatest possible effect.
          </span>
        </div>
      </div>
      <div className="px-2">
        <h4 className="text-xl font-semibold">Donate as you shop</h4>
        <div className="flex flex-col mt-5">
          <span className="text-sm">
            Retailers such as Amazon, Tesco and Expedia will donate a percentage of purchases made when visiting via the
            links below. Create an account and start raising money now!
          </span>
          <div className="flex flex-row flex-wrap lg:flex-nowrap justify-around items-center px-2 mt-6">
            <Image src={EFLogo} alt="" objectFit="contain" width={200} />
            <Image src={AmazonLogo} alt="" objectFit="contain" width={200} />
          </div>
        </div>
      </div>
    </div>


    

       <PageSection fullwidth className="bg-blue-50 py-20 mt-6 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-10">
            <div className="text-left">
              <h3>How we use your donation</h3>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae
              erat. Nunc ut sem vitae risus tristique posuere.
            </div>
            <div>
              Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
              Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.
            </div>
          </div>
        </PageSection> 
 */
