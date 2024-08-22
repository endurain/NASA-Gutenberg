<?php

function render_rover_slider($attributes, $content) {
    $backgroundImage = isset($attributes['backgroundImage']) ? ' style="background-image:url(' . esc_url($attributes['backgroundImage']) . ');"' : '';

    $output = '<div class="card"' . $backgroundImage . '>';
    
    // Include the inner blocks' content directly.
    $output .= $content;
    
    $output .= '</div>';

    return $output;
}
