/** Keep a Japanese phrase together when space permits. */
export default function ReadableTitle({text}:{text:string}){return <>{text.replace(/\n/g,'').split(/(?<=、)/u).map((phrase,i)=><span className="title-phrase" key={i}>{phrase}</span>)}</>}
