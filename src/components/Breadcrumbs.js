import Link from "next/link";

const Breadcrumbs = ({ breadcrumbs, white }) => {
  return (
    <nav className="flex pt-10 pb-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="font-medium">
            {index !== breadcrumbs.length - 1 ? (
              <>
                <Link
                  href={breadcrumb.href}
                  className={
                    white
                      ? "text-white underline underline-offset-2 whitespace-nowrap"
                      : "text-light-green underline underline-offset-2 whitespace-nowrap"
                  }
                >
                  {breadcrumb.label}
                </Link>
                <span className={white ? "text-white" : "text-black"}>
                  &nbsp;{">"}&nbsp;
                </span>
              </>
            ) : (
              <span
                className={
                  white
                    ? "text-white whitespace-nowrap"
                    : "text-black whitespace-nowrap"
                }
              >
                {breadcrumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
