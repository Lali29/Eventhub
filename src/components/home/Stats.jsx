const Stats = () => {

  const data = [
    ["Events", "500+"],
    ["Users", "12K+"],
    ["Organizers", "250+"],
    ["Success Rate", "99%"],
  ];

  return (
    <section className="py-20 bg-indigo-700">

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

        {data.map((item) => (

          <div
            key={item[0]}
            className="text-center text-white"
          >

            <h2 className="text-5xl font-bold">
              {item[1]}
            </h2>

            <p className="mt-2 text-lg">
              {item[0]}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Stats;