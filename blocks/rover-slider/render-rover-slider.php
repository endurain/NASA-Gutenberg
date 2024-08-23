<?php

function render_rover_slider($attributes, $content) {
    $heading = isset($attributes['heading']) ? $attributes['heading'] : '';
    $description = isset($attributes['description']) ? $attributes['description'] : '';

    $api_key = get_option('nasa_api_key', '');
    if (empty($api_key)) {
        return '<div class="rover-slider">NASA API key is missing. Add it via wp-admin.</div>';
    }

    $response = wp_remote_get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key={$api_key}");
    
    if (is_wp_error($response)) {
        return '<div class="rover-slider">Error fetching images.</div>';
    }

    $data = wp_remote_retrieve_body($response);
    $photos = json_decode($data, true)['photos'];
    
    // Check if we got any photos
    if (empty($photos)) {
        return '<div class="rover-slider">No photos available.</div>';
    }

    // Limit to the first 5 images
    $photos = array_slice($photos, 0, 5);

    // Include the template file
    ob_start();
    include get_stylesheet_directory() . '/blocks/rover-slider/rover-slider-template.php';
    return ob_get_clean();
}


