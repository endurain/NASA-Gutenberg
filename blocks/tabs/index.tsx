import { registerBlockType } from '@wordpress/blocks';
import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import attributes from './attributes.json';

registerBlockType('nasag/tabs', {
    title: 'Tabs',
    icon: 'grid-view',
    category: 'layout',
    attributes,

    edit: ({ attributes, setAttributes, clientId }) => {
        const blockProps = useBlockProps();

        // access data from the WordPress data stores
        // useSelect to get the inner blocks tab-items
        const tabItems = useSelect(select => {
            const { getBlock } = select('core/block-editor');
            const block = getBlock(clientId);
            return block ? block.innerBlocks : [];
        }, [clientId]);

        // Update the tabTitles attribute whenever tab items change
        const updatedTabTitles = tabItems.map(tabItem => tabItem.attributes.tabTitle || `Untitled Tab`);

         // This ensures that the tabTitles array is updated and saved
         // checks current value of attributes.tabTitles against updatedTabTitles
        if (JSON.stringify(attributes.tabTitles) !== JSON.stringify(updatedTabTitles)) {
            setAttributes({ tabTitles: updatedTabTitles });
        }

        return (
            <div {...blockProps}>
                <RichText
                    tagName="h2"
                    placeholder="Add your heading..."
                    value={attributes.heading}
                    onChange={(heading) => setAttributes({ heading })}
                />

                {/* InnerBlocks for tab content */}
                <div className="tab-content">
                    <InnerBlocks
                        allowedBlocks={['nasag/tab-item']}
                        renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                    />
                </div>
            </div>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
        const { tabTitles } = attributes;

        return (
            <div {...blockProps} className="tabs">
                <RichText.Content tagName="h2" value={attributes.heading} />

                {/* generate the tab buttons based on saved content */}
                <div className="tab-titles">
                    {tabTitles.map((tabTitle, index) => (
                        <button key={index} className="tab-button">
                            {tabTitle}
                        </button>
                    ))}
                </div>

                {/* The tab content */}
                <div className="tab-content">
                    <InnerBlocks.Content />
                </div>    
            </div>
        );
    },
});
