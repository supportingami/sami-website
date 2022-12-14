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

export default function Testimonials() {
  return (
    <>
      <h2>Improving Lives</h2>
      {MockData.map((item, index) => (
        <TestimonialItem key={item.id} item={item} avatarPosition={index % 2 === 0 ? "start" : "end"} />
      ))}
    </>
  );
}

const TestimonialItem = (props: { item: ITestimonialItem; avatarPosition: "start" | "end" }) => (
  <div className="card bg-base-100 shadow-xl mx-auto w-3/4 mb-8">
    <div className="flex items-center p-8 gap-4 flex-wrap">
      {props.avatarPosition === "start" && <TestimonialAvatar avatar={props.item.avatar} />}
      <TestimonialText item={props.item} />
      {props.avatarPosition === "end" && <TestimonialAvatar avatar={props.item.avatar} />}
    </div>
  </div>
);
const TestimonialAvatar = ({ avatar }: { avatar: string }) => (
  <div className="avatar basis-full lg:basis-0">
    <div className="w-32 mask mask-hexagon">
      <Image src={avatar} alt="" className="object-contain" width={300} height={300} />
    </div>
  </div>
);
const TestimonialText = ({ item }: { item: ITestimonialItem }) => (
  <div className="flex-1 px-5">
    <q className="prose text-lg">{item.testimonial}</q>
    <div className="mt-4 flex">
      <div className="mr-4 font-bold">{item.name}</div>
      <div>{item.affiliation}</div>
    </div>
  </div>
);
