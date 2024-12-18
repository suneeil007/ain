const ModuleListBreadcrumbs = ({ title, backgroundImage }) => {
    return (
      <section
        className="breadcrumb__area breadcrumb_bg"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="breadcrumb__content">
              <h2 className="breadcrumb_module_title">{title}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default ModuleListBreadcrumbs;
  