/** Class responsible for creating particle effect in a given container. */
export default class ParticleEffect {
  /**
   * Create a ParticleEffect.
   * @param  {string} container
   * @param  {string} left
   * @param  {string} top
   * @param  {string} amount
   * @param  {string} bg
   */
  constructor(container, left, top, amount, bg) {
    this.container = container;
    this.left = left;
    this.top = top;
    this.amount = amount;
    this.background = bg;
  }
  /**
   */
  pop() {
    for (let i = 0; i < this.amount; i++) {
      this.createParticle();
    }
  }
  /**
   */
  createParticle() {
    const particle = document.createElement('particle');
    particle.classList.add('particle');
    this.container.appendChild(particle);
    const width = Math.floor(Math.random() * 40 + 20);
    const height = width;
    const destinationX = (Math.random() - 0.5) * 400;
    const destinationY = (Math.random() - 0.5) * 400;
    const rotation = Math.random() * 520;
    const delay = Math.random() * 200;
    particle.style.backgroundImage = `url(${this.background})`;

    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;

    const animation = particle.animate(
      [
        {
          transform: `translate(-50%, -50%) 
                      translate(${this.left}px, 
                      ${this.top}px) 
                      rotate(0deg)`,
          opacity: 1,
        },
        {
          opacity: 1,
        },
        {
          transform: `translate(-50%, -50%) translate(${
            this.left + destinationX
          }px, ${this.top + destinationY}px) rotate(${rotation}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 1000 + 5000,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: delay,
      }
    );
    animation.onfinish = this.removeParticle;
  }
  /**
   * @param  {string} e
   */
  removeParticle(e) {
    e.srcElement.effect.target.remove();
  }
}
