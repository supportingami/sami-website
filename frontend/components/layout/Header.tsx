import HeaderButton from './HeaderButton'
import test from 'public/images/bgOurWork.svg'
import OurWorkBGImage from 'components/pages/about/OurWorkBGImage/OurWorkBGImage';

export default function Header() {
    return (
      <div
        className={`h-64 relative text-white text-center font-bold w-[1500px] font-['Roboto']`}
  
      >
        <div
          className="inset-0 absolute w-[1500px] bg-[rgba(0,177,233,1)]"
         />
        <div className="inset-x-0 absolute -top-1/4 bottom-1/4 w-[1500px] left-[6%]">
          <HeaderButton 
            type="TYPE" 
            text="Theory of Change" />
          <HeaderButton 
            type="TYPE1" 
            text="Members & Volunteers" />
          <HeaderButton
            type="TYPE2"
            text="Annual Reports"
           />
          
        </div>
        <OurWorkBGImage/>
        <p
          className="absolute inline m-0 h-[70px] w-[395px] left-[35.13%] right-[38.53%] top-[29.3%] bottom-[43.36%] text-[56px] leading-[1.2]"
        >
          Our Work
        </p>
      </div>
    );
  }
  
  const style = {
    backgroundImage: `url(${test.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    
  };
  
  interface HeaderProps {
    style: Object;
  }