const Layout = ({ title, children }) => {
  return (
    <div className="py-10">
      <header>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
           {title}
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="border-gray-200 ">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
