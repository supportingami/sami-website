export default function ToC() {
  return (
    <>
      <h2>SAMI Theory of Change</h2>
      <p>
        At SAMI we’ve been working to build our thoughts on how everything we do can fit into a larger picture to create
        real change across Africa.
        <br />
        <br />
        We hope to use this section to communicate some of these ideas when they are slightly further developed. In the
        meantime you can see our current working document below.
      </p>
      <PrimaryButton />
    </>
  );
}

const PrimaryButton = () => {
  return (
    <div className="mt-8 mb-6 w-full text-center">
      <a
        className="btn btn-primary text-base"
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.google.com/document/d/1QC0zZ4h59NUzyEfO9x33baYukHwbfP1I4PUNGFjI4JM/edit?usp=sharing"
      >
        Download working document
      </a>
    </div>
  );
};
