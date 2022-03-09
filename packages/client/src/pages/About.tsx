/**
 * 关于
 */
export default function About() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-sky-500 to-fuchsia-500">
      <div className="h-[60vh] w-[70vw] rounded-xl shadow-md bg-white/70 flex justify-center items-center">
        <div className="text-center text-xl space-y-2">
          <header className="mb-16">一个无业游民</header>
          <div>
            <a
              href="https://github.com/zerowong"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-teal-500"
            >
              Github
            </a>
          </div>
          <div>
            <a
              href="https://www.zhihu.com/people/wongzero"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-blue-500"
            >
              知乎
            </a>
          </div>
          <div>
            <a
              href="https://weibo.com/u/7293381604"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-sky-500"
            >
              微博
            </a>
          </div>
          <div>
            <a
              href="https://space.bilibili.com/8380727"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-pink-500"
            >
              B站
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
