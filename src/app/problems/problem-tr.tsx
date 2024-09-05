"use client";
import {useRouter} from "next/navigation";

export default function ProblemTr({id, title,}: {
  id: number,
  title: string,
}) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/problems/${id}`)
  }
  return (<tr className="clickable" onClick={onClick}>
    <td>{id}</td>
    <td>{title}</td>
  </tr>);
}