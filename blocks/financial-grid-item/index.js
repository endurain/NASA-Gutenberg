import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, URLInputButton } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import attributes from './attributes.json';


registerBlockType('lendedu/financial-grid-item', {
    title: 'Financial Grid Item',
    icon: 'grid-view',
    category: 'layout',
    attributes,

    edit: ({ attributes, setAttributes }) => {
        // Function to update the icon URL attribute
        const onSelectImage = (media) => {
            setAttributes({ iconUrl: media.url });
        };

        return (
            <div className="financial-grid-item">
                <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={['image']}
                    value={attributes.iconUrl}
                    render={({ open }) => (
                        <Button className="financial-grid-item__media" onClick={open}>
                            {!attributes.iconUrl ? 'Upload Icon' : <img src={attributes.iconUrl} alt="" />}
                        </Button>
                    )}
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
              <a href={attributes.link} className="financial-grid-item__link">
                <div className="financial-grid-item">
                  {attributes.iconUrl && (
                    <img className="financial-grid-item__icon" src={attributes.iconUrl} alt="" />
                  )}
                  <RichText.Content tagName="p" value={attributes.description} />
                </div>
              </a>
            ) : (
              <div className="financial-grid-item">
                {attributes.iconUrl && (
                  <img className="financial-grid-item__icon" src={attributes.iconUrl} alt="" />
                )}
                <RichText.Content tagName="p" value={attributes.description} />
              </div>
            )}
          </>
        );
      }   
});
