import { useLoginAuth } from '../contexts/LoginAuth';

const Layout = ({ title, children }) => {
  const [, , logout] = useLoginAuth();
  return (
    <div className="py-10">
      <header>
        <div className="flex flex-row px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="flex-grow text-3xl font-bold leading-tight text-gray-900">
            {title}
          </h1>
          <button
            type="button"
            onClick={logout}
            className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            logout
          </button>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="border-gray-200 ">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
