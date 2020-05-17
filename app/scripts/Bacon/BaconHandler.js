import BaconImage from './BaconImage';
import ParticleEffect from './ParticleEffect';
import {getRandomInt} from '../utils';
import {fromEvent, interval} from 'rxjs';
import {debounce} from 'rxjs/operators';

/**
 * Class responsible for handling the button click.
 * After clicking a button new BeaconImage and ParticleEffect are created.
*/
export default class BaconHandler {
  /**
   * Creating a BaconHandler.
   * Assigning debounced event onClick to a button.
   * @param  {HTMLElement} button - Button generating bacon images after click.
   * @param  {HTMLImageElement} image - Image copied after clicking the button.
   * @param  {HTMLElement} container - Container that holds
   *                                   the new beacon image and particle effect.
   */
  constructor(button, image, container) {
    this.classes = {
      baconContent: 'bacon-content',
    };

    this.button = button;
    this.image = image;
    this.container = container;
    this.baconParticleImage =
      'https://pngimg.com/uploads/bacon/bacon_PNG10920.png';

    fromEvent(this.button, 'click')
      .pipe(debounce(() => interval(150)))
      .subscribe((_) => {
        this.clickHandler();
      });
  }

  /**
   * Function called when the button is clicked.
   * Creating a container for an image and particles and adding styles to it.
   * Creating a new ParticleEffect and BaconImage objects which will add
   * the HTML elements they create to the container.
   * Appending the container with particles and image to the DOM.
   */
  clickHandler() {
    const size = window.innerWidth < 787 ? 100 : 150;
    const top = getRandomInt(0, window.innerHeight - size);
    const left = getRandomInt(0, window.innerWidth - size);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add(this.classes.baconContent);
    imgContainer.style.zIndex = '999';
    imgContainer.style.top = top + 'px';
    imgContainer.style.left = left + 'px';

    const particleEffect = new ParticleEffect(
      imgContainer,
      size / 2,
      size / 2,
      80,
      this.baconParticleImage
    );
    particleEffect.pop();

    const bacon = new BaconImage(
      imgContainer,
      this.image.src,
      size
    );

    bacon.createImage();
    this.container.appendChild(imgContainer);
  }
}

