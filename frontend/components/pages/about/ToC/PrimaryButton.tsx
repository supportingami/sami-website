export default function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <div
      className={`[backdrop-filter:blur(80px)] px-8 py-4 absolute gap-2.5 inline-flex justify-center items-center rounded text-white text-right font-medium left-[40.93%] right-[40.87%] top-[70.29%] bottom-[14.71%] bg-[rgba(0,177,233,1)]`}
    >
      <a
        className="text-base m-0 leading-[normal]"
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.google.com/document/d/1QC0zZ4h59NUzyEfO9x33baYukHwbfP1I4PUNGFjI4JM/edit?usp=sharing"
      >
        Download working document
      </a>
    </div>
  );
}

PrimaryButton.defaultProps = {};

interface PrimaryButtonProps {}
