import { registerBlockType } from '@wordpress/blocks';
import { RichText, InnerBlocks, InspectorControls, MediaUpload  } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import attributes from './attributes.json';

// Define the default image URL (absolute path)
const DEFAULT_IMAGE_URL = '/wp-content/themes/twentytwentyfour-child/images/500x500.png';


registerBlockType('lendedu/financial-card', {
    title: 'Financial Card',
    icon: 'grid-view',
    category: 'layout',
    attributes, // Use the imported attributes
    edit: ({ attributes, setAttributes }) => {
        // Function to update the background image attribute
        const onSelectImage = (media) => {
            setAttributes({ backgroundImage: media.url });
        };
        return (
            <>
                <InspectorControls>
                    <PanelBody title="Background Image" initialOpen={true}>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={attributes.backgroundImage}
                            render={({ open }) => (
                                <Button className="button button-large" onClick={open}>
                                    {!attributes.backgroundImage ? 'Select Background Image' : 'Change Background Image'}
                                </Button>
                            )}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className="financial-card" style={{ backgroundImage: `url(${attributes.backgroundImage})` }}>
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
                    <div className="financial-card_items">
                        <InnerBlocks
                            allowedBlocks={['lendedu/financial-card-item']}
                            renderAppender={() => (
                                <InnerBlocks.ButtonBlockAppender />
                            )}
                        />
                    </div>
                </div>
            </>
           
        );
    },
    save: ({ attributes }) => {
        const bgstyle = {
            backgroundImage: `url(${attributes.backgroundImage})`
          };
        
        return (
            <div className="financial-card" style={bgstyle}>
                <RichText.Content tagName="h2" value={attributes.heading} />
                <RichText.Content tagName="p" value={attributes.description} />
                <div className="financial-card-items">
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});
