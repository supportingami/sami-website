export default function VectorTriangle(props: VectorTriangleProps) {
    return (
      <div
        className="left-0 top-0 absolute w-[52px] right-[75.24%] bottom-[79.06%]"
      >
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 52 0 H 7.924 C 3.548 0 0 3.548 0 7.924 V 52 L 52 0 Z"
            fill="#02B1E9"
           />
        </svg>
      </div>
    );
  }
  
  VectorTriangle.defaultProps = {};
  
  interface VectorTriangleProps {}