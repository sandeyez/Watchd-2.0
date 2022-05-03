const Description = ({ description }) => {
  if (!description) return null;

  return (
    <div>
      <header className="text-xl font-bold">Description</header>
      <section>{description}</section>
    </div>
  );
};

export default Description;
