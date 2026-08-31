function PageHeader({ title, subtitle }) {

  return (

    <div className="mb-8 page-animation">

      <h1 className="theme-page-title">
        {title}
      </h1>

      {subtitle && (

        <p className="mt-2 theme-secondary-text">
          {subtitle}
        </p>

      )}

    </div>

  );
}

export default PageHeader;