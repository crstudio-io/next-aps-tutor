"use client";
import { useRouter } from "next/navigation";

const humanLang = (lang: string) => {
  switch (lang) {
    case "JAVA17":
      return "Java 17";
    case "PYTHON3":
      return "Python 3"
    default:
      return "unknown";
  }
}

const statusColorClassname = (status: string) => {
  switch (status) {
    case "PENDING":
      return "text-secondary";
    case "GRADING":
      return "text-warning";
    case "ERROR":
    case "FAIL":
      return "text-danger fw-bold";
    case "SUCCESS":
      return "text-success fw-bold";
    default:
      return "";
  }
}

export default function SolutionTr({id, lang, status, score, username, probId, isLink}: {
  id: number,
  lang: string,
  status: string,
  score: number,
  username: string,
  probId: number,
  isLink: boolean,
}) {
  const router = useRouter();
  const onClick = () => {
    if (isLink) router.push(`/problems/${probId}/solutions/${id}`);
  }

  return (<tr className={isLink ? "clickable" : ""} onClick={onClick}>
    <td>{id}</td>
    <td>{username}</td>
    <td>{humanLang(lang)}</td>
    <td className={statusColorClassname(status)}>{status}</td>
    <td>{score}</td>
  </tr>)
}