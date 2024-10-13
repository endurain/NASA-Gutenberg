import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import attributes from './attributes.json';
import CustomLinkPicker from '../../components/CustomLinkPicker'; 

registerBlockType('nasag/tab-item', {
    title: 'Tab Item',
    icon: 'grid-view',
    category: 'layout',
    attributes,

    edit: ({ attributes, setAttributes }) => {
        const { backgroundImage, description, link, linkTarget, linkLabel, tabTitle } = attributes;

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

                {/* Description */}
                <RichText
                    tagName="p"
                    value={description}
                    onChange={(description) => setAttributes({ description })}
                    placeholder="Description"
                />

                {/* Custom Link Picker for URL, Label, and Open in New Tab */}
                <CustomLinkPicker
                    url={link}
                    opensInNewTab={linkTarget === '_blank'}
                    linkLabel={linkLabel}
                    onChange={handleLinkChange}
                />
            </div>
        );
    },

    save: ({ attributes }) => {
        const { backgroundImage, description, link, linkLabel, linkTarget, tabTitle } = attributes;

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
                <RichText.Content tagName="h3" value={tabTitle} />

                <RichText.Content tagName="p" value={description} />

                {/* Render the Link */}
                {link && (
                <a
                    href={link}
                    target={linkTarget}
                    rel={linkTarget === '_blank' ? 'noopener noreferrer' : 'noopener'}  // Include the rel attribute
                    className="tab-item__link"
                >
                    {linkLabel || 'Click here'}
                </a>
            )}
            </div>
        );
    },
});
