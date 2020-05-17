/** Class responsible for creating a new beacon image. */
export default class BaconImage {
  /**
   * @param  {HTMLElement} container - Container that holds a new beacon image.
   * @param  {string} src - Source of the image that will be copied.
   * @param  {number} size - Size of the image.
   */
  constructor(container, src, size) {
    this.container = container;
    this.src = src;
    this.size = size;
  }

  /**
   * Function creating an image.
   * Setting src attribute and size for an img.
   * Appending img to the given container.
   */
  createImage() {
    this.img = document.createElement('img');

    this.img.setAttribute('src', this.src);
    this.img.style.width = this.size + 'px';
    this.img.style.height = this.size + 'px';

    this.container.appendChild(this.img);
  }
}
