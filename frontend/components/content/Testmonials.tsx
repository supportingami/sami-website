import type { Testimonial, UploadFile } from "../../graphql/generated";
import ResponsiveImage from "components/common/ResponsiveImage";

export default function Testimonials({ testimonials = [] }: { testimonials: Testimonial[] }) {
  const TestimonialAvatar = ({ media, alt }: { media?: Partial<UploadFile>; alt: string }) => (
    <div className="avatar basis-full lg:basis-0">
      <div className="w-[128px] h-[128px] mask mask-hexagon-2">
        <ResponsiveImage
          media={media}
          alt={alt}
          className="object-contain m-auto"
          width={128}
          height={128}
        />
      </div>
    </div>
  );
  const TestimonialText = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="flex-1 px-5">
      <q className="prose text-lg">{testimonial.Content}</q>
      <div className="mt-4 flex">
        <div className="mr-4 font-bold">{testimonial.Name}</div>
        <div>{testimonial.Bio}</div>
      </div>
    </div>
  );

  return (
    <>
      {testimonials.map((item: Testimonial, index) => {
        const avatarPosition = index % 2 === 0 ? "start" : "end";
        return (
          <div key={index}>
            <div className="card bg-base-100 shadow-xl mx-auto w-3/4 mb-8">
              <div className="flex items-center p-8 gap-4 flex-wrap">
                {avatarPosition === "start" && (
                  <TestimonialAvatar media={item.Photo} alt={item.Name || "Testimonial"} />
                )}
                <TestimonialText testimonial={item} />
                {avatarPosition === "end" && (
                  <TestimonialAvatar media={item.Photo} alt={item.Name || "Testimonial"} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
