export const enum Pages {
  home = '/',
  articles = '/articles',
  search = '/search',
  about = '/about',
  notification = '/notification',
  login = '/login',
  register = '/register',
  user = '/user',
  settingProfile = '/setting-profile',
  article = '/article',
  tweet = '/tweet',
}

export const titleMap = new Map<string, string>([
  [Pages.home, '主页'],
  [Pages.articles, '文章'],
  [Pages.search, '搜索'],
  [Pages.about, '关于'],
  [Pages.notification, '通知'],
  [Pages.login, '登录'],
  [Pages.register, '注册'],
  [Pages.settingProfile, '编辑个人资料'],
])

type Path = string | RegExp

const showLeftArrowPaths: Path[] = [
  Pages.login,
  Pages.register,
  Pages.settingProfile,
  new RegExp(`^${Pages.user}/\\w+$`),
  new RegExp(`^${Pages.article}/\\w+$`),
  Pages.about,
  Pages.tweet,
  new RegExp(`^${Pages.tweet}/\\w+$`),
]

function checkPath(path: string, paths: Path[]) {
  let match = false
  for (const item of paths) {
    if (item instanceof RegExp) {
      match = item.test(path)
    } else {
      match = item === path
    }
    if (match) {
      return match
    }
  }
  return false
}

export function shouldShowLeftArrow(path: string) {
  return checkPath(path, showLeftArrowPaths)
}

const hideBottomBarPaths: Path[] = [
  Pages.login,
  Pages.register,
  new RegExp(`^${Pages.user}/\\w+$`),
  new RegExp(`^${Pages.article}/\\w+$`),
  Pages.about,
  Pages.settingProfile,
]

export function shouldHideBottomBar(path: string) {
  return checkPath(path, hideBottomBarPaths)
}
