import React from "react";

const principles = [
  {
    title: "Working with Partners",
    text: "Supporting charities and NGOs to implement local and pan-African Maths Initiatives",
  },
  {
    title: "Mathematical Education",
    text: "Scaling projects in African countries at primary, secondary and university levels",
  },
  {
    title: "Empowerment",
    text: "Providing support for grass-root initiatives to develop into sustainable solutions",
  },
  {
    title: "Research and Development",
    text: "Assist research and development projects to access mathematics and statistical expertise",
  },
  {
    title: "Leapfrogging",
    text: "Creating awareness of cutting edge technology, methodologies and ideas that provide the opportunity for local initiatives to become world leaders",
  },
  {
    title: "Use of Technology",
    text: "Assisting in the provision and effective evaluation of the use of new technologies in the classroom to motivate and engage learners for improved outcomes",
  },
];

export const SamiPrinciples: React.FC<any> = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        {principles.map(({ title, text }, i) => (
          <div key={i} className="prose">
            <h4 className="font-bold">{title}</h4>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SamiPrinciples;
