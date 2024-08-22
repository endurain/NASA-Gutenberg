import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import { RichText, InnerBlocks, InspectorControls, MediaUpload  } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import attributes from './attributes.json';

interface BlockAttributes {
    heading: string;
    description: string;
    backgroundImage: string;
    backgroundImageId: number;
}

registerBlockType<BlockAttributes>('nasag/card', {
    title: 'Card',
    icon: 'grid-view',
    category: 'layout',
    attributes: attributes as BlockConfiguration<BlockAttributes>['attributes'], // Use the imported attributes
    edit: ({ attributes, setAttributes }) => {
        // Function to update the background image attribute
        const onSelectImage = (media: {id: number; url: string}) => {
            setAttributes({ 
                backgroundImage: media.url,
                backgroundImageId: media.id
             });
        };
        return (
            <>
                <InspectorControls>
                    <PanelBody title="Background Image" initialOpen={true}>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={attributes.backgroundImageId}
                            render={({ open }) => (
                                <Button className="button button-large" onClick={open}>
                                    {!attributes.backgroundImage ? 'Select Background Image' : 'Change Background Image'}
                                </Button>
                            )}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className="card" style={{ backgroundImage: `url(${attributes.backgroundImage})` }}>
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
                    <div className="card_items">
                        <InnerBlocks
                            allowedBlocks={['nasag/card-item']}
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
            <div className="card" style={bgstyle}>
                <RichText.Content tagName="h2" value={attributes.heading} />
                <RichText.Content tagName="p" value={attributes.description} />
                <div className="card-items">
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});
