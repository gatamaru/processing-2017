import React from 'react'
import 'pixi.js'

import './Storm.css'

class Particle {

  constructor(sprite, vel) {
    this.sprite = sprite
    this.vel = vel
    this.acc = {
      x: 0.0,
      y: 0.0
    }

    this.maxVel = 0.8
  }

  update() {
    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.sprite.position.x += this.vel.x
    this.sprite.position.y += this.vel.y

    this.acc.x = 0.0
    this.acc.y = 0.0

    const v = this.vel.x * this.vel.x + this.vel.y * this.vel.y
    if (this.maxVel * this.maxVel < v) {
      this.vel.x *= 0.95
      this.vel.y *= 0.95
    }
  }
}

const createParticle = pos => {
  const theta = 2 * Math.PI * Math.random()
  const vx = Math.cos(theta)
  const vy = Math.sin(theta)
  const radius = Math.random() + 1.0

  const graphics = new PIXI.Graphics()
  graphics.beginFill(0xFFFFFF, 0.35)
  graphics.drawCircle(0.0, 0.0, radius)
  graphics.endFill()
  const sprite = new PIXI.Sprite(graphics.generateCanvasTexture())
  sprite.position.x = pos.x
  sprite.position.y = pos.y
  sprite.anchor.set(0.5)

  return new Particle(sprite, {
    x: vx,
    y: vy
  })
}

class Storm extends React.Component {

  constructor(props) {
    super(props)
    this.updateCanvasSize = this.updateCanvasSize.bind(this)
  }

  componentDidMount() {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: 500,
      backgroundColor: 0x1D262B,
    })

    app.view.style['width'] = '100%'
    app.view.style['height'] = '100%'
    app.view.style['display'] = 'block'

    this.refs.storm.appendChild(app.view)

    const numOfParticles = window.innerWidth * 10

    const container = new PIXI.particles.ParticleContainer(numOfParticles, {
      scale: false,
      position: true,
      rotation: false,
      uvs: false,
      alpha: true
    })

    app.stage.addChild(container)

    let particles = []

    for (let i = 0; i < numOfParticles; i += 1) {
      const px = app.view.width * Math.random()
      const py = app.view.height * Math.random()
      const particle = createParticle({
        x: px,
        y: py
      })
      particles.push(particle)
      container.addChild(particle.sprite)
    }

    app.ticker.add(delta => {
      const cos = Math.cos(delta)
      const sin = Math.sin(delta)

      const mousePos = {
        x: app.renderer.plugins.interaction.mouse.global.x,
        y: app.renderer.plugins.interaction.mouse.global.y
      }

      particles.forEach(particle => {

        const dx = particle.sprite.x - mousePos.x
        const dy = particle.sprite.y - mousePos.y
        const sqrDist = Math.sqrt(dx * dx + dy * dy)
        if (sqrDist < 50) {
          particle.vel.x += 0.01 * dx
          particle.vel.y += 0.01 * dy
        }

        particle.update()

        if (particle.sprite.x < 0) {
          particle.sprite.x = app.view.width
        }
        if (app.view.width < particle.sprite.x) {
          particle.sprite.x = 0.0
        }
        if (particle.sprite.y < 0) {
          particle.sprite.y = app.view.height
        }
        if (app.view.height < particle.sprite.y) {
          particle.sprite.y = 0.0
        }
      })
    })

    this.app = app
    this.container = container

    window.addEventListener("resize", this.updateCanvasSize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateCanvasSize)
  }

  updateCanvasSize() {
    if (!this.app) {
      return
    }

    const width = window.innerWidth

    const canvas = this.app.view
    canvas.width = window.innerWidth

    this.app.renderer.resize(canvas.width, canvas.height)
  }

  render() {
    return (
      <div className="container-canvas" ref="storm"></div>
    )
  }
}

export default Storm
