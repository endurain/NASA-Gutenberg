import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, URLInputButton } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import attributes from './attributes.json';


registerBlockType('lendedu/financial-card-item', {
    title: 'Financial Grid Item',
    icon: 'grid-view',
    category: 'layout',
    attributes,

    edit: ({ attributes, setAttributes }) => {
        // Function to update the icon URL attribute
        const onSelectImage = (media) => {
            setAttributes({ imgUrl: media.url });
        };

        return (
            <div className="financial-card-item">
                <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={['image']}
                    value={attributes.imgUrl}
                    render={({ open }) => (
                        <Button className="financial-card-item__media" onClick={open}>
                            {!attributes.imgUrl ? 'Upload Image' : <img src={attributes.imgUrl} alt="" />}
                        </Button>
                    )}
                />
                <RichText
                    tagName="h2"
                    placeholder="Add your heading..."
                    value={attributes.heading}
                    onChange={(heading) => setAttributes({ heading })}
                />
                <RichText
                    tagName="p"
                    value={attributes.description}
                    onChange={(description) => setAttributes({ description })}
                    placeholder="Description"
                />
                <URLInputButton
                    url={attributes.link}
                    onChange={(link) => setAttributes({ link })}
                />
            </div>
        );
    },

    save: ({ attributes }) => {
        return (
          <>
            {attributes.link ? (
              <a href={attributes.link} className="financial-card-item__link">
                <div className="financial-card-item">
                  {attributes.imgUrl && (
                    <img className="financial-card-item__icon" src={attributes.imgUrl} alt="" />
                  )}
                  <RichText.Content tagName="h3" value={attributes.heading} />
                  <RichText.Content tagName="h3" value={attributes.description} />
                </div>
              </a>
            ) : (
              <div className="financial-card-item">
                {attributes.imgUrl && (
                  <img className="financial-card-item__icon" src={attributes.imgUrl} alt="" />
                )}
                <RichText.Content tagName="h3" value={attributes.heading} />
                <RichText.Content tagName="p" value={attributes.description} />
              </div>
            )}
          </>
        );
      }   
});
