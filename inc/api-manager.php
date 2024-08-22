<?php

function nasa_api_key_menu() {
    add_menu_page(
        'API Manager',          // Page title
        'API Manager',          // Menu title
        'manage_options',            // Capability
        'api-key-settings',          // Menu slug
        'nasa_api_key_settings_page', // Callback function
        'dashicons-admin-generic',   // Icon (optional)
        80                           // Position (optional)
    );
}
add_action('admin_menu', 'nasa_api_key_menu');

// callback 
function nasa_api_key_settings_page() {
    // Check if the user has the required capabilities
    if (!current_user_can('manage_options')) {
        return;
    }

    // Check if the form was submitted
    if (isset($_POST['nasa_api_key_nonce']) && wp_verify_nonce($_POST['nasa_api_key_nonce'], 'save_nasa_api_key')) {
        // Update the API key option in the database
        update_option('nasa_api_key', sanitize_text_field($_POST['nasa_api_key']));
        echo '<div class="updated"><p>API Key saved.</p></div>';
    }

    // Get the current API key value from the database
    $api_key = get_option('nasa_api_key', '');

    // Render the settings form
    ?>
    <div class="wrap">
        <h1>API Key Settings</h1>
        <form method="post" action="">
            <?php wp_nonce_field('save_nasa_api_key', 'nasa_api_key_nonce'); ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">NASA API Key</th>
                    <td><input type="text" name="nasa_api_key" value="<?php echo esc_attr($api_key); ?>" class="regular-text" /></td>
                </tr>
            </table>
            <?php submit_button('Save API Key'); ?>
        </form>
    </div>
    <?php
}
