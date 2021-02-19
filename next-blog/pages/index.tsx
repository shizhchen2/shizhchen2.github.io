import Link from 'next/link'
export default function Home() {
  return <div className="title">
    第一篇纹章
      <a href="/posts/first-post">a 跳转</a>
      <Link href="/posts/first-post">link 跳转</Link>
  </div>
}
