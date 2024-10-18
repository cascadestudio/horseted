import Link from "next/link";

const Breadcrumbs = ({ breadcrumbs, white, centered }) => {
  return (
    <nav className="flex pt-10 pb-2" aria-label="Breadcrumb">
      <ol
        className={`inline-flex items-center w-full overflow-hidden sm:overflow-visible sm:text-nowrap ${centered ? "justify-center" : ""}`}
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={index}
            className="font-medium max-w-full inline-block sm:max-w-none"
          >
            {index !== breadcrumbs.length - 1 ? (
              <>
                <Link
                  href={breadcrumb.href}
                  className={`${
                    white ? "text-white " : "text-light-green"
                  } underline underline-offset-2 truncate`}
                >
                  {breadcrumb.label}
                </Link>
                <span className={white ? "text-white" : "text-black"}>
                  &nbsp;{">"}&nbsp;
                </span>
              </>
            ) : (
              <span
                className={`${white ? "text-white" : "text-black"} line-clamp-1 sm:line-clamp-none`}
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
