import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import attributes from './attributes.json';
import { Swiper, SwiperSlide } from 'swiper/react';

// nasaBlockSettings is a global variable
declare const nasaBlockSettings: {
    api_key: string;
};

interface BlockAttributes {
    heading: string;
    description: string;
}

interface RoverImageAttributes {
    img_src: string;
    camera: {
        full_name: string;
    };
}

registerBlockType<BlockAttributes>('nasag/rover-slider', {
    title: 'Mars Rover Slider',
    icon: 'slides',
    category: 'layout',
    attributes: attributes as BlockConfiguration<BlockAttributes>['attributes'], 
    edit: ({ attributes, setAttributes }) => {
        const [images, setImages] = useState<RoverImageAttributes[]>([]);
        let loader = `<div class="rover-slider__loader"></div>`;
        let roverSliderId = document.getElementById('roverSlider');
        let responseHeading = `<h2 class="rover-slider__heading>Rover Images</h2>`;

        if (roverSliderId !== null ) {
            roverSliderId.innerHTML = loader;
        }
       
        useEffect(() => {
            // Use the API key directly
            const api_key = nasaBlockSettings.api_key;
            fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${api_key}`)
                .then(response => response.json())
                .then(data => {
                    setImages(data.photos.slice(0, 5)); // Limit to first 5 images
                });
                if (roverSliderId !== null ) {
                    roverSliderId.innerHTML = responseHeading;
                }
        }, []);

        return (
            <div className="rover-slider-admin">
                <RichText
                    tagName="h2"
                    placeholder="Add your heading..."
                    value={attributes.heading}
                    onChange={(heading) => setAttributes({ heading })}
                />
                <RichText
                    tagName="p"
                    placeholder="Add your description..."
                    value={attributes.description}
                    onChange={(description) => setAttributes({ description })}
                />

                {images.length > 0 && (
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image.img_src} alt="Mars Rover Image" />
                                <p>{image.camera.full_name}</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        );
    },
    save: () => {
        return null; // Rendered by PHP
    },
});
