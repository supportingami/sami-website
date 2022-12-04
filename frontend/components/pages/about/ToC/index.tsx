export default function ToC() {
  return (
    <div className="mt-32 bg-blue-50 px-36 py-6 text-center">
      <h2>SAMI Theory of Change</h2>
      <p className="">
        At SAMI we’ve been working to build our thoughts on how everything we do can fit into a larger picture to create
        real change across Africa.
        <br />
        We hope to use this section to communicate some of these ideas when they are slightly further developed.
        <br />
        In the meantime you can see our current working document below.
      </p>
      <PrimaryButton />
    </div>
  );
}
// TODO - this should use daisy components
const PrimaryButton = () => {
  return (
    <div className="btn btn-primary mt-8 mb-6">
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
};
