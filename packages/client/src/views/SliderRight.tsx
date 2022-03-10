import classNames from 'classnames'

const cardStyle = 'px-8 py-3 bg-gray-100 rounded-xl'
const graySmText = 'space-y-2 text-sm text-slate-500'

export function SliderRight() {
  return (
    <div className="relative">
      <div className="w-[300px] h-full flex justify-center pt-2">
        <div className="fixed space-y-5">
          {/* @todo 搜索 */}
          {/* @todo 书单 */}
          <div className={classNames(cardStyle, graySmText)}>
            <p>我的:</p>
            <div className="text-center grid grid-cols-2">
              <a
                href="https://github.com/zerowong"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-teal-500 hover:text-teal-500 block"
              >
                Github
              </a>
              <a
                href="https://www.zhihu.com/people/wongzero"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-blue-500 hover:text-blue-500 block"
              >
                知乎
              </a>
              <a
                href="https://weibo.com/u/7293381604"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-violet-500 hover:text-violet-500 block"
              >
                微博
              </a>
              <a
                href="https://space.bilibili.com/8380727"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-pink-500 hover:text-pink-500 block"
              >
                B站
              </a>
            </div>
          </div>
          <div className={classNames(cardStyle, graySmText)}>
            <div>
              © 2022{' '}
              <a href="https://apasser.xyz" className="underline decoration-sky-500">
                apasser.xyz
              </a>
            </div>
            <div>
              <a
                href="https://beian.miit.gov.cn"
                className="underline decoration-sky-500"
                target="_blank"
                rel="noreferrer"
              >
                湘ICP备2020022697号-1
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
