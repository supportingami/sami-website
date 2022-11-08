export default function SecondaryButton(props: SecondaryButtonProps) {
  return (
    <>
      <div
        className={`[backdrop-filter:blur(80px)] [box-shadow:0px_0px_0px_1px_rgba(193,_197,_212,_1)_inset] [box-shadow-width:1px] py-0 absolute bg-white gap-2.5 inline-flex justify-center items-center rounded text-right font-normal top-[117.25%] bottom-[-19.65%] text-[rgba(11,7,6,1)] transition-all ${
          props.type === "TYPE2" ? "px-8 left-[45.77%] right-[46.54%]" : ""
        } ${props.type === "TYPE" ? "px-3.5 left-[63.92%] right-[24.54%]" : ""} ${
          props.type === "TYPE1" ? "pl-[29px] pr-[29px] left-[54.85%] right-[37.46%]" : ""
        }`}
      >
        <p className="text-base m-0 leading-[normal]">{props.text}</p>
      </div>
    </>
  );
}

SecondaryButton.defaultProps = {
  type: "TYPE",
  text: "SAMI Trustees",
};

interface SecondaryButtonProps {
  type: "TYPE" | "TYPE1" | "TYPE2";
  text: string;
}
