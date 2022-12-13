import Image from "next/image";

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
    testimonial: `My journey started in 2011,when I attended my first MathsCamp in Maseno, Kenya.The Camp gave me a wider perspective on maths and helped me to discard the negative stereotype that revolves around it. I became a maths guru at school.`,
    name: "Cabrine",
    affiliation: "Graduate in Economics and Statistics, University of Nairobi, long-term AMI volunteer",
  },
  {
    id: 2,
    avatar: `/images/evans.png`,
    testimonial: `I attended the Maseno Maths Camp in 2012, during my last year in school. I used to consider mathematics to be a boring and irrelevant subject, but by the end of the first day, I could see how most things involve maths. I am really happy that I was able to attend; it led to an improvement in my math grades and even grades in other subjects.`,
    name: "Evans",
    affiliation: "Graduate in Statistics, University of Maseno",
  },
];

export default function Testimonials(props: TestimonialsProps) {
  return (
    <>
      <div className="bg-blue-50 my-32 py-10 px-18">
        <h2 className="mb-5">Improving Lives</h2>
        {MockData.map((item, index) => (
          <TestimonialItem key={item.id} item={item} avatarPosition={index % 2 === 0 ? "start" : "end"} />
        ))}
      </div>
    </>
  );
}

const TestimonialItem = (props: { item: ITestimonialItem; avatarPosition: "start" | "end" }) => (
  <div className="card bg-base-100 shadow-xl mx-auto w-3/4 mb-8">
    <div>
      {props.avatarPosition === "start" && (
        <div className="grid grid-cols-1 md:grid-cols-4 p-4 md:p-8 justify-start">
          <TestimonialAvatar avatar={props.item.avatar} />
          <div className="md:col-start-2 md:col-end-6">
            <TestimonialText item={props.item} />
          </div>
        </div>
      )}
    </div>
    <div>
      {props.avatarPosition === "end" && (
        <div className="grid grid-cols-1 md:grid-cols-4 p-5 md:p-8 justify-end">
          <div className="md:col-start-1 md:col-end-4">
            <TestimonialText item={props.item} />
          </div>
          <TestimonialAvatar avatar={props.item.avatar} />
        </div>
      )}
    </div>
  </div>
);
const TestimonialAvatar = ({ avatar }: { avatar: string }) => (
  <div className="avatar">
    <div className="w-32 mask mask-hexagon">
      <Image src={avatar} alt="" objectFit="contain" width={300} height={300} />
    </div>
  </div>
);
const TestimonialText = ({ item }: { item: ITestimonialItem }) => (
  <div className="w-11/12 px-5">
    <q className="prose text-xl">{item.testimonial}</q>
    <div className="mt-4 flex">
      <div className="mr-4 font-bold">{item.name}</div>
      <div>{item.affiliation}</div>
    </div>
  </div>
);

Testimonials.defaultProps = {
  style: {},
};

interface TestimonialsProps {
  style: any;
}
