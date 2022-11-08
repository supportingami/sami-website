import PrimaryButton from "./PrimaryButton";

export default function ToC() {
  return (
    <div className={`relative text-center w-[1500px] h-[340px] font-['Roboto'] bg-slate-200 top-[129px]`}>
      <PrimaryButton />
      <p className="absolute text-base font-normal inline m-0 h-[87px] w-[1011px] left-[16.33%] right-[16.27%] top-[38.82%] bottom-[35.59%] leading-[1.6] text-[rgba(82,85,96,1)] ">
        {
          "At SAMI we’ve been working to build our thoughts on how everything we do can fit into a larger picture to create real change across Africa. "
        }
        <br />
        {"We hope to use this section to communicate some of these ideas when they are slightly further developed. "}
        <br />
        In the meantime you can see our current working document below.
      </p>
      <p className="absolute font-bold inline m-0 h-[46.29px] w-[460.08px] left-[34.96%] right-[34.36%] top-[17.94%] bottom-[68.45%] text-[40px] leading-[1.2] text-[rgba(29,33,48,1)]">
        SAMI Theory of Change
      </p>
    </div>
  );
}
