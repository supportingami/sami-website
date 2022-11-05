import HeaderButton from './HeaderButton'

export default function Header(props: HeaderProps) {
    return (
      <div
        className={`h-64 relative text-white text-center font-bold w-[1500px] font-['Roboto']`}
        style={props.style}
      >
        <div
          className="inset-0 absolute w-[1500px] bg-[rgba(0,177,233,1)]"
         />
        <div className="inset-x-0 absolute -top-1/4 bottom-1/4 w-[1500px]">
          <HeaderButton type="TYPE" text="Members & Volunteers" />
      
          <HeaderButton type="TYPE1" text="Theory of Change" />
          <HeaderButton
            type="TYPE2"
            text="Annual Reports"
           />
          
        </div>
        <p
          className="absolute inline m-0 h-[70px] w-[395px] left-[35.13%] right-[38.53%] top-[29.3%] bottom-[43.36%] text-[56px] leading-[1.2]"
        >
          Our Work
        </p>
      </div>
    );
  }
  
  Header.defaultProps = {
    style: {},
  };
  
  interface HeaderProps {
    style: Object;
  }