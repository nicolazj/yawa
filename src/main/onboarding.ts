import { WHISPER_MODELS_OPTIONS } from '../shared/constants'
import { downloader } from './download'
import { pref } from './pref'

class Onboarding {
  async init() {
    let model = pref.get_whisper_active_model_name()
    if (!model) {
      pref.set_pref('onboarded', false)
      await downloader.downloadWhisperModel(WHISPER_MODELS_OPTIONS[0].name)
      pref.set_pref('onboarded', true)
    }
  }
}

export const onboarding = new Onboarding()
