import Link from "next/link";

export default function Pagination({page}: {
  page: {
    number: number,
    totalPages: number,
  }
}) {
  const pagePerGroup = 10;
  const pageGroup = Math.floor(page.number / pagePerGroup);
  const totalGroups = Math.floor(page.totalPages / pagePerGroup);
  return (<nav className="w-100 d-flex justify-content-center">
    <ul className="pagination">
      <li className={`page-item ` + (page.number == 0 ? "disabled" : "")}>
        <Link className="page-link" href={`?page=${page.number - 1}`} aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </Link>
      </li>
      {Array.from(
        {length: pageGroup === totalGroups ? page.totalPages % pagePerGroup : pagePerGroup},
        (_, index) => index
      ).map(i => <li key={i} className={`page-item ` + (page.number === i + pageGroup * pagePerGroup ? "active" : "")}>
        <Link className="page-link"
              href={`?page=${i + pageGroup * pagePerGroup}`}>{(i + pageGroup * pagePerGroup) + 1}</Link>
      </li>)}
      <li className={`page-item ` + (page.number + 1 === page.totalPages ? "disabled" : "")}>
        <Link className="page-link" href={`?page=${page.number + 1}`} aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </Link>
      </li>
    </ul>
  </nav>)
}