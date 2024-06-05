
interface ExpandedProps {
  title: string,
  content: string,
  bookmark: true,
  authorName: string,
}

const ExpandedPost = ({ title, content, bookmark, authorName}: ExpandedProps) => {

  return <div className="flex flex-col">
    <div>
      <h1>{title}</h1>
      <span>{authorName}</span>
    </div>
    <h3>{content}</h3>
    <span>{bookmark}</span>
  </div>
}


export default ExpandedPost