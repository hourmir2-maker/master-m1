// Web Audio Synthesizer sound effects (No external audio asset downloads required)
class SoundFX {
  private ctx: AudioContext | null = null

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // เสียงตอบถูก (Ding-Dong เสียงใสร่าเริง)
  playCorrect() {
    try {
      this.initCtx()
      if (!this.ctx) return
      const now = this.ctx.currentTime

      const osc1 = this.ctx.createOscillator()
      const gain1 = this.ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(523.25, now) // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.1) // E5
      gain1.gain.setValueAtTime(0.3, now)
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
      osc1.connect(gain1)
      gain1.connect(this.ctx.destination)
      osc1.start(now)
      osc1.stop(now + 0.4)

      const osc2 = this.ctx.createOscillator()
      const gain2 = this.ctx.createGain()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(783.99, now + 0.15) // G5
      gain2.gain.setValueAtTime(0.2, now + 0.15)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5)
      osc2.connect(gain2)
      gain2.connect(this.ctx.destination)
      osc2.start(now + 0.15)
      osc2.stop(now + 0.5)
    } catch (e) {
      console.log('Audio error', e)
    }
  }

  // เสียงตอบผิด (Soft Low Buzzer)
  playWrong() {
    try {
      this.initCtx()
      if (!this.ctx) return
      const now = this.ctx.currentTime

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(220, now) // A3
      osc.frequency.setValueAtTime(164.81, now + 0.12) // E3
      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.35)
    } catch (e) {
      console.log('Audio error', e)
    }
  }

  // เสียงฉลอง Fanfare เมื่อผ่านบทเรียน (100% หรือผ่านเกณฑ์)
  playFanfare() {
    try {
      this.initCtx()
      if (!this.ctx) return
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return
        const now = this.ctx.currentTime + idx * 0.1
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now)
        gain.gain.setValueAtTime(0.25, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now)
        osc.stop(now + 0.35)
      })
    } catch (e) {
      console.log('Audio error', e)
    }
  }
}

export const soundFX = new SoundFX()
