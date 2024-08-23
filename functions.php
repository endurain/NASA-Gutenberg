<?php
// Add a function to enqueue your scripts and styles.
function twentytwentyfour_child_enqueue_styles() {

    $parent_style = 'twentytwentyfour-style'; // This is 'twentytwentyfour-style' for the Twenty Twenty Four theme.

    // Enqueue the parent theme stylesheet.
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    
    // Enqueue the child theme stylesheet.
    wp_enqueue_style( 'twentytwentyfour-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );

    // Enqueue your compiled Javascript file.
    wp_enqueue_script( 'twentytwentyfour-child-js',
        get_stylesheet_directory_uri() . '/dist/bundle.js',
        array(), // If you have any dependencies, list them here.
        wp_get_theme()->get('Version'),
        true
    );

    // Enqueue your compiled CSS file.
    wp_enqueue_style( 'twentytwentyfour-child-css',
        get_stylesheet_directory_uri() . '/dist/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );
}
add_action( 'wp_enqueue_scripts', 'twentytwentyfour_child_enqueue_styles' );

function setup_theme_supported_features() {
    // Support wide alignment for a wider block editor layout.
    add_theme_support('align-wide');
}
add_action('after_setup_theme', 'setup_theme_supported_features');


// Include the block registration file
include get_stylesheet_directory() . '/register-blocks.php';

// Include api manager
require_once get_stylesheet_directory() . '/inc/api-manager.php';



