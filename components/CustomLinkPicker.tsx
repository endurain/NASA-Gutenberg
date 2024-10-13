import { TextControl, ToggleControl, Button, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';

// CustomLinkPicker component
const CustomLinkPicker = ({ url, opensInNewTab, linkLabel, onChange }) => {
    const [isLinkPickerOpen, setIsLinkPickerOpen] = useState(false);

    const handleLinkChange = (updatedUrl) => {
        onChange({
            url: updatedUrl,
            opensInNewTab,
            linkLabel,
        });
    };

    const handleToggleChange = (newTab) => {
        onChange({
            url,
            opensInNewTab: newTab,
            linkLabel,
        });
    };

    const handleLabelChange = (newLabel) => {
        onChange({
            url,
            opensInNewTab,
            linkLabel: newLabel,
        });
    };

    return (
        <div className="custom-link-picker">
            <Button onClick={() => setIsLinkPickerOpen(!isLinkPickerOpen)} variant="secondary">
                {url ? 'Edit Link' : 'Add Link'}
            </Button>
            {isLinkPickerOpen && (
                <Popover position="middle center" onClose={() => setIsLinkPickerOpen(false)}>
                    {/* URL Input */}
                    <TextControl
                        label="URL"
                        value={url || ''}
                        onChange={handleLinkChange}
                        placeholder="Enter URL"
                    />
                    {/* Toggle to open in a new tab */}
                    <ToggleControl
                        label="Open in new tab"
                        checked={opensInNewTab}
                        onChange={handleToggleChange}
                    />
                    {/* Input for Link Label (clickable text) */}
                    <TextControl
                        label="Link Text"
                        value={linkLabel || ''}
                        onChange={handleLabelChange}
                        placeholder="Enter Link Text"
                    />
                </Popover>
            )}
        </div>
    );
};

export default CustomLinkPicker;
