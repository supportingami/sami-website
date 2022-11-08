import evans from "public/images/evans.png";
import cabrine from "public/images/cabrine.png";

const evansStyle = {
  backgroundImage: `url(${evans.src})`,
};

const cabrineStyle = {
  backgroundImage: `url(${cabrine.src})`,
};

interface ITestimonialItem {
  id: number;
  avatar: string;
  testimonial: string;
  name: string;
  affiliation: string;
}

const MockData: ITestimonialItem[] = [
  {
    id: 1,
    avatar: `/images/cabrine.png`,
    testimonial: `My journey started in 2011,when I attended my first MathsCamp in Maseno, Kenya.The Camp gave me a wider perspectiveon mathsand helped me to discard the negativestereotype that revolves around it. I became a mathsguru at school.`,
    name: "Cabrine",
    affiliation: "Graduate in Economicsand Statistics, University of Nairobi, long-term AMI volunteer",
  },
  {
    id: 2,
    avatar: `/images/evans.png`,
    testimonial: `I used to consider mathematics to be a boringand irrelevant subject, but by the end of the first day, I could
    see how most things involve maths`,
    name: "Evans",
    affiliation: "Graduate in Statistics, University of Maseno",
  },
];

export default function Testimonials(props: TestimonialsProps) {
  return (
    <>
      {/* CC Changes */}
      <div data-cy="testimonial-container" className="w-100 bg-slate-200 pb-10">
        <h2>Improving Lives</h2>
        {MockData.map((item, index) => (
          <TestimonialItem key={item.id} item={item} avatarPosition={index % 2 === 0 ? "start" : "end"} />
        ))}
      </div>
      {/* Legacy */}
      <h2>Legacy</h2>
      <LegacyVersion />
    </>
  );
}

const TestimonialItem = (props: { item: ITestimonialItem; avatarPosition: "start" | "end" }) => (
  <div className="card bg-base-100 shadow-xl mx-auto w-3/4 mb-8">
    <div className="flex items-center p-8 gap-4">
      {props.avatarPosition === "start" && <TestimonialAvatar avatar={props.item.avatar} />}
      <TestimonialText item={props.item} />
      {props.avatarPosition === "end" && <TestimonialAvatar avatar={props.item.avatar} />}
    </div>
  </div>
);
const TestimonialAvatar = ({ avatar }: { avatar: string }) => (
  <div className="avatar">
    <div className="w-32 mask mask-hexagon">
      <img src={avatar} />
    </div>
  </div>
);
const TestimonialText = ({ item }: { item: ITestimonialItem }) => (
  <div>
    <q className="prose max-w-full text-xl">{item.testimonial}</q>
    <div className="mt-4 flex">
      <div className="mr-4 font-bold">{item.name}</div>
      <div>{item.affiliation}</div>
    </div>
  </div>
);

const LegacyVersion = (props) => (
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
          {"and helped me to discard the negativestereotype that revolves around it. I became a mathsguru at school.”"}
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

Testimonials.defaultProps = {
  style: {},
};

interface TestimonialsProps {
  style: any;
}
