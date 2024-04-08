<?php

function render_financial_card($attributes, $content) {
    $backgroundImage = isset($attributes['backgroundImage']) ? ' style="background-image:url(' . esc_url($attributes['backgroundImage']) . ');"' : '';

    // Start building the output.
    $output = '<div class="financial-card"' . $backgroundImage . '>';
    
    // Include the inner blocks' content directly.
    $output .= $content;
    
    $output .= '</div>'; // Close the .financial-card container.

    return $output;
}
