import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import attributes from './attributes.json';
import LinkSelector from '../../components/LinkSelector'; 

registerBlockType('nasag/tab-item', {
    title: 'Tab Item',
    icon: 'grid-view',
    category: 'layout',
    attributes,

    edit: ({ attributes, setAttributes }) => {
        const { backgroundImage, description, link, linkTarget, linkLabel, tabTitle, tagLine } = attributes;
        
        const handleLinkChange = ({ url, opensInNewTab, linkLabel }) => {
            setAttributes({
                link: url,
                linkTarget: opensInNewTab ? '_blank' : '_self',
                linkLabel,
            });
        };

        const onSelectBackgroundImage = (media) => {
            setAttributes({ backgroundImage: media.url });
        };

        return (
            <div
                className="tab-item"
                style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Tab Title */}
                <RichText
                    tagName="h3"
                    value={tabTitle}
                    onChange={(tabTitle) => setAttributes({ tabTitle })}
                    placeholder="Tab Title"
                    className="tab-item__title"
                />

                {/* Background Image Upload */}
                <MediaUpload
                    onSelect={onSelectBackgroundImage}
                    allowedTypes={['image']}
                    value={backgroundImage}
                    render={({ open }) => (
                        <Button className="tab-item__media" onClick={open}>
                            {!backgroundImage ? 'Select Background Image' : 'Replace Background Image'}
                        </Button>
                    )}
                />

                {/* Tagline/Eyebrow */}
                <RichText
                    tagName="p"
                    value={tagLine}
                    onChange={(tagLine) => setAttributes({ tagLine })}
                    placeholder="Enter Tag Line"
                    className="tab-item__tagline"
                />

                {/* Description */}
                <RichText
                    tagName="p"
                    value={description}
                    onChange={(description) => setAttributes({ description })}
                    placeholder="Add description"
                    className="tab-item__description"
                />

                {/* Custom Link Picker for URL, Label, and Open in New Tab */}
                <LinkSelector
                    url={link}
                    opensInNewTab={linkTarget === '_blank'}
                    linkLabel={linkLabel}
                    onChange={handleLinkChange}
                />
            </div>
        );
    },

    save: ({ attributes }) => {
        const { backgroundImage, description, link, linkLabel, linkTarget, tagLine } = attributes;

        return (
            <div
                className="tab-item"
                style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="tab-item__content">
                    {/* Tagline/Eyebrow */}
                    <RichText.Content tagName="p" value={tagLine} className="tab-item__tagline" />
                    {/* Description */}
                    <RichText.Content tagName="p" value={description} className="tab-item__description" />

                    {/* Render the Link */}
                    {link && (
                    <a
                        href={link}
                        target={linkTarget}
                        rel={linkTarget === '_blank' ? 'noopener noreferrer' : 'noopener'} 
                        className="tab-item__link"
                    >
                        {linkLabel || 'Learn more'}
                    </a>
                
                    )}
                </div>
            </div>
        );
    },
});
