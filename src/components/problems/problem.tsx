export default function ProblemListItem({ id, title, }
   : {id: number, title: string,}) {
  return (<div>
    {id.toString()} {title}
  </div>);
}