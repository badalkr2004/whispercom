import DefaultTheme from 'vitepress/theme'
import { h, computed } from 'vue'
import { useRoute } from 'vitepress'
import HomeLayout from './HomeLayout.vue'
import './custom.css'
import './home.css'

export default {
  extends: DefaultTheme,
  Layout() {
    const route = useRoute()
    const isHome = computed(() => route.path === '/' || route.path === '/index.html')

    return isHome.value
      ? h(HomeLayout)
      : h(DefaultTheme.Layout)
  },
}
