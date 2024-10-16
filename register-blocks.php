<?php

function register_gutenberg_blocks() {
    $block_directories = glob(get_stylesheet_directory() . '/blocks/*', GLOB_ONLYDIR);

    $dynamic_blocks = [
        'card',
        'rover-slider'
    ];

    foreach ($block_directories as $dir) {
        $block_name = basename($dir);

        // Define the path for the built files of the block.
        $dist_path = "/dist/{$block_name}/";
        $editor_script_path = $dist_path . 'index.js';
        $editor_style_path  = $dist_path . 'editor.css';
        $style_path         = $dist_path . 'style.css';

        // Check if the asset file for the block exists.
        $asset_file_path = get_stylesheet_directory() . $dist_path . 'index.asset.php';
        if (!file_exists($asset_file_path)) {
            continue; // Skip if asset file does not exist.
        }
        $asset_file = include($asset_file_path);

        // Prepare block registration arguments
        $block_args = array(
            'editor_script' => $block_name . '-editor-script',
            'editor_style'  => $block_name . '-editor-style',
            'style'         => $block_name . '-style',
        );

        // If the block is dynamic, attempt to include its render callback file.
        if (in_array($block_name, $dynamic_blocks)) {
            $render_callback_file = get_stylesheet_directory() . "/blocks/{$block_name}/render-{$block_name}.php";
            if (file_exists($render_callback_file)) {
                include $render_callback_file;
                $render_callback_function_name = 'render_' . str_replace('-', '_', $block_name);
                if (function_exists($render_callback_function_name)) {
                    $block_args['render_callback'] = $render_callback_function_name;
                }
            }
        }

        // Register the block type with WordPress, including potential render callback.
        register_block_type("nasag/{$block_name}", $block_args);

        // Enqueue the editor script and style.
        add_action('enqueue_block_editor_assets', 
        function() use (
        $editor_script_path,
        $asset_file,
        $block_name,
        $editor_style_path) 
        {
            wp_enqueue_script(
                $block_name . '-editor-script',
                get_stylesheet_directory_uri() . $editor_script_path,
                $asset_file['dependencies'],
                $asset_file['version'],
                true // Load in footer
            );

            if ($block_name === 'rover-slider') {
                $api_key = get_option('nasa_api_key', '');
                wp_localize_script($block_name . '-editor-script', 'nasaBlockSettings', array(
                    'api_key' => $api_key,
                ));
            }

            if (file_exists(get_stylesheet_directory() . $editor_style_path)) {
                wp_enqueue_style(
                    $block_name . '-editor-style',
                    get_stylesheet_directory_uri() . $editor_style_path,
                    array(),
                    filemtime(get_stylesheet_directory() . $editor_style_path)
                );
            }
        });

        // Enqueue the front-end style and scripts.
        add_action('wp_enqueue_scripts', function() use ($style_path, $block_name) {
            if (file_exists(get_stylesheet_directory() . $style_path)) {
                wp_enqueue_style(
                    $block_name . '-style',
                    get_stylesheet_directory_uri() . $style_path,
                    array(),
                    filemtime(get_stylesheet_directory() . $style_path)
                );
            }

            // ROVER BLOCK: Ensure Swiper is enqueued for the frontend.
            if ($block_name === 'rover-slider') {
                wp_enqueue_script(
                    'swiper-js',
                    'https://unpkg.com/swiper/swiper-bundle.min.js',
                    array(),
                    '11.1.10',
                    true // Load in footer
                );
                wp_enqueue_style(
                    'swiper-css',
                    'https://unpkg.com/swiper/swiper-bundle.min.css',
                    array(),
                    '11.1.10'
                );
            }
            // TABS BLOCK
            if ($block_name === 'tabs') {
                wp_enqueue_script(
                    'tabs-switching-script',
                    get_stylesheet_directory_uri() . '/inc/js/tabs.js', 
                    [], 
                    null,   
                    true    
                );
            }

        });
    }
}
add_action('init', 'register_gutenberg_blocks');
