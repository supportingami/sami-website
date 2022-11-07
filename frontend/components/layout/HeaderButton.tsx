export default function HeaderButton(props: HeaderButtonProps) {
    return (
      <>
        <div
          className={`absolute bg-white gap-2.5 inline-flex items-start rounded text-right font-medium pl-[15px] pr-[15px] pt-[5px] pb-[5px] top-[91.02%] bottom-[-2.34%] font-['Roboto'] text-[rgba(0,101,144,1)] transition-all ${
            props.type === "TYPE" ? "left-[36.27%]" : ""
          } ${props.type === "TYPE1" ? "right-[65.07%]" : ""} ${
            props.type === "TYPE2" ? "right-[44.07%]" : ""}`}
        >
          <p className="text-base m-0 leading-[normal]">{props.text}</p>
        </div>
      </>
    );
  }
  

  interface HeaderButtonProps {
    type: "TYPE" | "TYPE1" | "TYPE2" ;
    text: string;
  }
