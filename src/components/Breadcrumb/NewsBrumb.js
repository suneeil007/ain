const NewsBrumb = ({ title, backgroundImage }) => {
    return (
      <section
        className="breadcrumb__area breadcrumb__news_bg"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="breadcrumb__content">
              <h2 className="breadcrumb_news_title">{title}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default NewsBrumb;
  