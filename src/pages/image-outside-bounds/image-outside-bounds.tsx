// from: https://courses.joshwcomeau.com/css-for-js/01-rendering-logic-1/07-margin
// the bounds refer to within the padding of the card

import "./image-outside-bounds.scss";

export const ImageOutsideBounds = () => {
  return (
    <div className="image-outside-bounds">
      <div className="card">
        <p>
          Otters have long, slim bodies and relatively short limbs. Their most striking anatomical
          features are the powerful webbed feet used to swim, and their seal-like abilities holding
          breath underwater.
        </p>
        <div className="stretched-out">
          <img
            alt="A cute otter in water"
            src="https://courses.joshwcomeau.com/cfj-mats/otter.jpg"
          />
        </div>
        <p>
          More importantly, otters are glorious water dogs, playful and curious. The otter, no
          other, is the best animal.
        </p>
      </div>
    </div>
  );
};
