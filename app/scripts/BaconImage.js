import ParticleEffect from './ParticleEffect';
import {getRandomInt} from './utils';

/** Class responsible for creating a new beacon image. */
export default class BaconImage {
  /**
   * @param  {string} src - Source of the image that will be copied.
   * @param  {string} baconParticleImage - Source of the image for particles.
   * @param  {object} classes - A set of classes
   *                            that can be added to HTML elements.
   * @param  {HTMLElement} container - Container that holds a new beacon image.
   */
  constructor(src, baconParticleImage, classes, container) {
    this.src = src;
    this.baconParticleImage = baconParticleImage;
    this.classes = classes;
    this.container = container;
  }

  /**
   * Function creating an image.
   * Creating a container for the image and particles - imgContainer.
   * Setting src attribute for an img and styles for an img and an imgContainer.
   * Creating particles by calling the pop method of ParticleContainer class.
   * Appending img and imgContainer to the DOM.
   */
  createImage() {
    const size = window.innerWidth < 787 ? 100 : 150;
    const top = getRandomInt(0, window.innerHeight - size);
    const left = getRandomInt(0, window.innerWidth - size);

    this.imgContainer = document.createElement('div');
    this.img = document.createElement('img');

    this.imgContainer.classList.add(this.classes.baconContent);
    this.imgContainer.style.zIndex = '999';
    this.imgContainer.style.top = top + 'px';
    this.imgContainer.style.left = left + 'px';

    this.img.setAttribute('src', this.src);
    this.img.style.width = size + 'px';
    this.img.style.height = size + 'px';

    const particleEffect = new ParticleEffect(
      this.imgContainer,
      size / 2,
      size / 2,
      80,
      this.baconParticleImage
    );
    particleEffect.pop();

    this.imgContainer.appendChild(this.img);
    this.container.appendChild(this.imgContainer);
  }
}
