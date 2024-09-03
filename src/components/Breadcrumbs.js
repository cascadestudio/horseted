import Link from "next/link";

const Breadcrumbs = ({ breadcrumbs }) => {
  console.log(breadcrumbs);
  return (
    <nav className="flex pt-10 pb-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="font-medium">
            {index !== breadcrumbs.length - 1 ? (
              <>
                <Link
                  href={breadcrumb.href}
                  className="text-light-green underline underline-offset-2"
                >
                  {breadcrumb.label}
                </Link>
                &nbsp;{">"}&nbsp;
              </>
            ) : (
              <span>{breadcrumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
