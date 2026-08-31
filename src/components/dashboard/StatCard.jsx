function StatCard({ title, value, icon }) {

  return (

    <div
      className="
        theme-gradient
        text-white
        rounded-2xl
        p-6
        shadow-lg
        card-animation
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm opacity-90 font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-extrabold mt-3">
            {value}
          </h2>

        </div>

        <div className="text-4xl opacity-80">
          {icon}
        </div>

      </div>

    </div>

  );
}

export default StatCard;