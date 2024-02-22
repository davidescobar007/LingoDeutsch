import PropTypes from "prop-types"

const PictureAtom = ({ image }) => {
   return (
      <picture>
         {/* webP */}
         <source
            media="(min-width: 0px) and (max-width: 640px)"
            srcSet={`${image}?thumb=0x300`}
            type="image/webp"
         />
         <source
            media="(min-width: 641px) and (max-width: 768px)"
            srcSet={`${image}?thumb=0x500`}
            type="image/webp"
         />
         <source
            media="(min-width: 769px) and (max-width: 1024px)"
            srcSet={`${image}?thumb=0x700`}
            type="image/webp"
         />
         <source
            media="(min-width: 1025px) and (max-width: 1280px)"
            srcSet={`${image}?thumb=0x900`}
            type="image/webp"
         />
         <source media="(min-width: 1281px)" srcSet={`${image}?thumb=0x1000`} type="image/webp" />

         {/* jpeg */}
         <source
            media="(min-width: 0px) and (max-width: 640px)"
            srcSet={`${image}?thumb=0x300`}
            type="image/jpeg"
         />
         <source
            media="(min-width: 641px) and (max-width: 768px)"
            srcSet={`${image}?thumb=0x500`}
            type="image/jpeg"
         />
         <source
            media="(min-width: 769px) and (max-width: 1024px)"
            srcSet={`${image}?thumb=0x700`}
            type="image/jpeg"
         />
         <source
            media="(min-width: 1025px) and (max-width: 1280px)"
            srcSet={`${image}?thumb=0x900`}
            type="image/jpeg"
         />
         <source media="(min-width: 1281px)" srcSet={`${image}?thumb=0x1000`} type="image/jpeg" />

         <img
            alt={image}
            decoding="async"
            height={50}
            loading="lazy"
            sizes="(max-width: 500px) 100vw, 50vw"
            src={image}
            srcSet={`${image}?thumb=0x300 300w, ${image}?thumb=0x500 500w, ${image}?thumb=0x700 700w, ${image}?thumb=0x900 900w, ${image}?thumb=1000w`}
            type="image/jpeg"
         />
      </picture>
   )
}

PictureAtom.propTypes = { image: PropTypes.string.isRequired }

export default PictureAtom
