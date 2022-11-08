import evans from "public/images/evans.png";
import cabrine from "public/images/cabrine.png";

const evansStyle = {
  backgroundImage: `url(${evans.src})`,
};

const cabrineStyle = {
  backgroundImage: `url(${cabrine.src})`,
};

export default function Testimonials(props: TestimonialsProps) {
  return (
    <div className={`relative w-[1500px] h-[750px] bg-slate-200`} style={props.style}>
      <div className="absolute text-left w-[1063px] left-[13.53%] right-[15.6%] top-[57.07%] bottom-[12.27%] drop-shadow-lg">
        <div className="inset-0 absolute bg-white w-[1063px] rounded-[15px]" />
        <div className="opacity-70 absolute leading-none inline-block h-[30px] w-[769px] left-[6.87%] right-[20.79%] top-[74.78%] bottom-[12.17%] text-[rgba(29,33,48,1)]">
          <p className="text-base font-bold inline m-0 leading-[1.6]">Evans</p>
          <p className="text-base font-normal inline m-0 leading-[1.6]">
            {"·  Graduate in Statistics, University of Maseno"}
          </p>
        </div>
        <div className="opacity-70 absolute leading-none inline-block h-[98px] w-[769px] left-[6.87%] right-[20.79%] top-[18.26%] bottom-[39.13%] text-[rgba(11,7,6,1)]">
          <p className="text-xl font-normal leading-normal inline m-0">
            {"“I attended theMaseno Maths Camp in 2012, during my last year inschool."}
          </p>
          <p className="text-xl font-bold leading-normal inline m-0">
            I used to consider mathematics to be a boringand irrelevant subject, but by the end of the first day, Icould
            see how most things involve maths
          </p>
          <p className="text-xl font-normal leading-normal inline m-0">
            . I am really happy that I wasable to attend; it led to an improvement in my mathgrades and even grades in
            other subjects.
          </p>
        </div>
        <div
          className="[rotate:180deg] [transform:scaleY(-1)] origin-top-left absolute rounded-full w-[129px] left-[93.41%] right-[-5.55%] top-[17.83%] bottom-[26.09%]"
          style={evansStyle}
        />
      </div>
      <div className="absolute text-left w-[1063px] left-[13.53%] right-[15.6%] top-[21.47%] bottom-[48.67%] drop-shadow-lg">
        <div className="inset-0 absolute bg-white w-[1063px] rounded-[15px]" />
        <div className="opacity-70 absolute leading-none inline-block h-[30px] w-[769px] left-[21.07%] right-[6.59%] top-[69.64%] bottom-[16.96%] text-[rgba(29,33,48,1)]">
          <p className="text-base font-bold inline m-0 leading-[1.6]">Cabrine</p>
          <p className="text-base font-normal inline m-0 leading-[1.6]">
            {"·  Graduate in Economicsand Statistics, University of Nairobi, long-term AMIvolunteer"}
          </p>
        </div>
        <div className="opacity-70 absolute leading-none inline-block h-[98px] w-[769px] left-[21.07%] right-[6.59%] top-[22.32%] bottom-[33.93%] text-[rgba(11,7,6,1)]">
          <p className="text-xl font-normal inline m-0 leading-[1.6]">
            {"“My journey started in 2011,when I attended my first MathsCamp in Maseno, Kenya."}
          </p>
          <p className="text-xl font-bold inline m-0 leading-[1.6]">The Camp gave me a wider perspectiveon maths</p>
          <p className="text-xl font-normal inline m-0 leading-[1.6]">
            {
              "and helped me to discard the negativestereotype that revolves around it. I became a mathsguru at school.”"
            }
          </p>
        </div>
        <div
          className="[rotate:180deg] [transform:scaleY(-1)] origin-top-left absolute rounded-full w-[129px] left-[19%] right-[68.86%] top-[16.96%] bottom-[25.45%]"
          style={cabrineStyle}
        />
      </div>
      <p className="absolute font-bold text-center inline m-0 h-[46.29px] w-[460.08px] left-[34.96%] right-[34.36%] top-[8.53%] bottom-[85.3%] text-[40px] leading-[1.2] text-[rgba(29,33,48,1)]">
        Improving Lives
      </p>
    </div>
  );
}

Testimonials.defaultProps = {
  style: {},
};

interface TestimonialsProps {
  style: any;
}
