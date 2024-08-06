import Link from "next/link";

export default function ProblemTr({id, title,}
                                    : { id: number, title: string, }) {
  return (<tr>
    <td>
      <Link href={`/problems/${id}`}>
        {id}
      </Link>
    </td>
    <td>
      <Link href={`/problems/${id}`}>
        {title}
      </Link>
    </td>
  </tr>);
}