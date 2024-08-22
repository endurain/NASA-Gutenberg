import { registerBlockType, BlockConfiguration } from '@wordpress/blocks';
import { RichText, MediaUpload, URLInputButton } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import attributes from './attributes.json';


interface BlockAttributes {
  heading: string;
  description: string;
  backgroundImage: string;
  iconUrl: string;
  link: string;
}


registerBlockType<BlockAttributes>('nasag/grid-item', {
    title: 'Grid Item',
    icon: 'grid-view',
    category: 'layout',
    attributes: attributes as BlockConfiguration<BlockAttributes>['attributes'],

    edit: ({ attributes, setAttributes }) => {
        // Function to update the icon URL attribute
        const onSelectImage = (media: {url:string}) => {
            setAttributes({ iconUrl: media.url });
        };

        return (
            <div className="grid-item">
                <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={['image']}
                    value={attributes.iconUrl}
                    render={({ open }) => (
                        <Button className="grid-item__media" onClick={open}>
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
              <a href={attributes.link} className="grid-item__link">
                <div className="grid-item">
                  {attributes.iconUrl && (
                    <img className="grid-item__icon" src={attributes.iconUrl} alt="" />
                  )}
                  <RichText.Content tagName="p" value={attributes.description} />
                </div>
              </a>
            ) : (
              <div className="grid-item">
                {attributes.iconUrl && (
                  <img className="grid-item__icon" src={attributes.iconUrl} alt="" />
                )}
                <RichText.Content tagName="p" value={attributes.description} />
              </div>
            )}
          </>
        );
      }   
});
