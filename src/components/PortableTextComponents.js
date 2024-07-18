const PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-black my-4">{children}</p>,
    h1: ({ children }) => (
      <h1 className="text-4xl font-mcqueen font-bold my-4 text-black">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-mcqueen font-bold my-4 text-black">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-mcqueen font-bold my-4 text-black">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-mcqueen font-bold my-4 text-black">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4 text-black">
        {children}
      </blockquote>
    ),
  },
};

export default PortableTextComponents;
