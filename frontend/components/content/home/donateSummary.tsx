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
