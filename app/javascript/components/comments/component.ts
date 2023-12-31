import { createApp, App as Application } from 'vue'
// @ts-expect-error : @types doesn't exist
import TurbolinksAdapter from 'vue-turbolinks'
import Axios from 'axios'

import { useViewData } from '../../composables/use_view_data'

import CommentList from '../comment_list.vue'

declare var document: Document

const initCommentComponent = (): void => {

  const { root, constants } = useViewData()

  if (root) {
    Axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': constants.csrf_token
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const comment_vm: Application<Element> = createApp(CommentList)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    comment_vm.use(TurbolinksAdapter)

    comment_vm.mount('#comments_component')

    //console.log(comment_vm);
  }
}

document.addEventListener('turbo:load', () => {
  initCommentComponent()
})
