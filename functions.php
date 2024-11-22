<?php 

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function add_cors_http_header(){
    header("Access-Control-Allow-Origin: http://localhost:5173/");
}
add_action('init','add_cors_http_header');



function tosku_theme_support() {
	add_theme_support('post-thumbnails');
}
add_action('after_setup_theme','tosku_theme_support');
/**
* Add main javascript
*/
function tosku_enqueue_scripts(){ 
	wp_enqueue_style( 'tosku-one',get_stylesheet_directory_uri() . '/dist/assets/index-CiGBWPVF.css' );
	wp_enqueue_script_module('tosku-one', get_template_directory_uri() . '/dist/assets/index-Bq9x15ey.js', array(), "0.15" );
	wp_enqueue_script_module('tosku-one-featured', get_template_directory_uri() . '/dist/assets/Featured-Cfvsfwxr.js', array('tosku-one'), "0.1" );
	wp_enqueue_script_module('tosku-one-contact', get_template_directory_uri() . '/dist/assets/Contact-NBSAqDFt.js', array('tosku-one'), "0.1" );
  	wp_enqueue_script_module('tosku-one-html', get_template_directory_uri() . '/dist/assets/Html-Dr0rzUv7.js', array('tosku-one'), "0.1" );
   	wp_enqueue_script_module('tosku-one-html', get_template_directory_uri() . '/dist/assets/About-BHbUeT-V.js', array('tosku-one'), "0.1" );
	wp_enqueue_script_module('tosku-one-axios', get_template_directory_uri() . '/dist/assets/axios-CCb-kr4I.js', array('tosku-one'), "0.1" );
}

add_action( 'wp_enqueue_scripts', 'tosku_enqueue_scripts' );

/**
* Remove Post page from admin
*/

/* function remove_posts_menu() {
    remove_menu_page('edit.php'); // 'edit.php' is the slug for the Posts menu
}

add_action('admin_menu', 'remove_posts_menu');
 */
/**
* Remove Comments page from admin
*/

/* function remove_comments_menu() {
    remove_menu_page('edit-comments.php'); // 'edit-comments.php' is the slug for the Comments menu
}

add_action('admin_menu', 'remove_comments_menu'); */

/**
* Remove Pages page from admin
*/



/* function remove_pages_menu() {
    remove_menu_page('edit.php?post_type=page'); // 'edit.php?post_type=page' is the slug for the Pages menu
}

add_action('admin_menu', 'remove_pages_menu');
 */

  
/**
* Custom Members Edit page
*/

function add_thumbnail_column($columns) {
    $new_columns = array();

	    // Re-add the existing columns.
    foreach ($columns as $key => $value) {
        $new_columns[$key] = $value;
    }
    // Add the featured image column first.
    $new_columns['featured_image'] = __('Thumbnail');

    return $new_columns;
}
add_filter('manage_members_posts_columns', 'add_thumbnail_column');

function show_custom_thumbnail_column($column, $post_id) {
    if ($column === 'featured_image') {
        $post_thumbnail = get_the_post_thumbnail($post_id, array(50, 50)); // Thumbnail size
        echo $post_thumbnail ? $post_thumbnail : __('No Image');
    }
}
add_action('manage_members_posts_custom_column', 'show_custom_thumbnail_column', 10, 2);

/**
* Custom Featured Edit page
*/

function add_thumbnail_image_column($columns) {
    $new_columns = array();

	   // Re-add the existing columns.
    foreach ($columns as $key => $value) {
        $new_columns[$key] = $value;
    }

    // Add the featured image column first.
    $new_columns['featured_image'] = __('Thumbnail');


    return $new_columns;
}
add_filter('manage_featured_posts_columns', 'add_thumbnail_image_column');

function show_custom_thumbnail_image_column($column, $post_id) {
    if ($column === 'featured_image') {
        $post_thumbnail = get_the_post_thumbnail($post_id, array(50, 50)); // Thumbnail size
        echo $post_thumbnail ? $post_thumbnail : __('No Image');
    }
}
add_action('manage_featured_posts_custom_column', 'show_custom_thumbnail_image_column', 10, 2);

/**
* Modify .htaccess for react route handling 
*/

function modify_htaccess_once() {
    // Check if the .htaccess has already been modified
    if (!get_option('htaccess_modified')) {
        $filePath = ABSPATH . '.htaccess';
        $rule = "\n<IfModule mod_rewrite.c>\n"
              . "  RewriteEngine On\n"
              . "  RewriteBase /\n"
              . "  RewriteRule ^index\\.php$ - [L]\n"
              . "  RewriteCond %{REQUEST_FILENAME} !-f\n"
              . "  RewriteCond %{REQUEST_FILENAME} !-d\n"
              . "  RewriteRule . /index.html [L]\n"
              . "</IfModule>\n";

        if (is_writable($filePath)) {
            if ($file = fopen($filePath, 'a')) {
                fwrite($file, $rule);
                fclose($file);

                // Set the flag to prevent re-execution
                update_option('htaccess_modified', true);
            }
        }
    }
}

// Hook into admin_init
add_action('admin_init', 'modify_htaccess_once');

/**
* Create Featured Post Type 
*/

add_action( 'init', function() {
	register_post_type( 'featured', array(
	'labels' => array(
		'name' => 'Featured',
		'singular_name' => 'Featured',
		'menu_name' => 'Featured Work',
		'all_items' => 'All Featured',
		'edit_item' => 'Edit Featured',
		'view_item' => 'View Featured',
		'view_items' => 'View Featured',
		'add_new_item' => 'Add New Featured',
		'add_new' => 'Add New Featured',
		'new_item' => 'New Featured',
		'parent_item_colon' => 'Parent Featured:',
		'search_items' => 'Search Featured',
		'not_found' => 'No featured found',
		'not_found_in_trash' => 'No featured found in Trash',
		'archives' => 'Featured Archives',
		'attributes' => 'Featured Attributes',
		'insert_into_item' => 'Insert into featured',
		'uploaded_to_this_item' => 'Uploaded to this featured',
		'filter_items_list' => 'Filter featured list',
		'filter_by_date' => 'Filter featured by date',
		'items_list_navigation' => 'Featured list navigation',
		'items_list' => 'Featured list',
		'item_published' => 'Featured published.',
		'item_published_privately' => 'Featured published privately.',
		'item_reverted_to_draft' => 'Featured reverted to draft.',
		'item_scheduled' => 'Featured scheduled.',
		'item_updated' => 'Featured updated.',
		'item_link' => 'Featured Link',
		'item_link_description' => 'A link to a featured.',
	),
	'public' => true,
	'show_in_rest' => true,
	'menu_icon' => 'dashicons-format-video',
    'menu_position' => 11,
	'supports' => array(
		0 => 'title',
		1 => 'editor',
		2 => 'page-attributes',
		3 => 'thumbnail',
		4 => 'custom-fields',
	),
	'delete_with_user' => false,
) );
} );

/**
* Create Members Post Type 
*/

add_action( 'init', function() {
	register_post_type( 'members', array(
	'labels' => array(
		'name' => 'Members',
		'singular_name' => 'Member',
		'menu_name' => 'Members',
		'all_items' => 'All Members',
		'edit_item' => 'Edit Member',
		'view_item' => 'View Member',
		'view_items' => 'View Members',
		'add_new_item' => 'Add New Member',
		'add_new' => 'Add New Member',
		'new_item' => 'New Member',
		'parent_item_colon' => 'Parent Member:',
		'search_items' => 'Search Members',
		'not_found' => 'No Member found',
		'not_found_in_trash' => 'No Member found in Trash',
		'archives' => 'Members Archives',
		'attributes' => 'Member Attributes',
		'insert_into_item' => 'Insert into Member',
		'uploaded_to_this_item' => 'Uploaded to this Member',
		'filter_items_list' => 'Filter Members list',
		'filter_by_date' => 'Filter Members by date',
		'items_list_navigation' => 'Members list navigation',
		'items_list' => 'Members list',
		'item_published' => 'Member published.',
		'item_published_privately' => 'Member published privately.',
		'item_reverted_to_draft' => 'Member reverted to draft.',
		'item_scheduled' => 'Member scheduled.',
		'item_updated' => 'Member updated.',
		'item_link' => 'Member Link',
		'item_link_description' => 'A link to a Member.',
	),
	'public' => true,
	'show_in_rest' => true,
	'menu_icon' => 'dashicons-id',
    'menu_position' => 12,
	'supports' => array(
		0 => 'title',
		1 => 'editor',
		2 => 'page-attributes',
		3 => 'thumbnail',
		4 => 'custom-fields',
	),
	'delete_with_user' => false,
) );
} );

/* video url custom post type  */

function add_custom_url_meta_box() {
    add_meta_box(
        'custom_url_meta_box', // ID
        'Custom Field', // Title
        'custom_url_meta_box_html', // Callback
        'featured', // Post type
        'normal', // Context
        'default' // Priority
    );
}
add_action('add_meta_boxes', 'add_custom_url_meta_box');

function custom_url_meta_box_html($post) {
    $value = get_post_meta($post->ID, 'custom_url_meta_box', true);
    ?>
    <label for="custom_field">Video URL:</label>
    <input type="text" name="custom_field" id="custom_field" value="<?php echo esc_attr($value); ?>">
    <?php
}
function save_custom_meta_box_data($post_id) {
    if (array_key_exists('custom_field', $_POST))  {
        update_post_meta($post_id, 'custom_url_meta_box', sanitize_text_field($_POST['custom_field']));
    }
}
add_action('save_post', 'save_custom_meta_box_data');

function register_custom_field_in_rest() {
    register_rest_field('featured', 'custom_featured_url_meta', array(
        'get_callback'    => 'get_custom_field_value',
        'update_callback' => null,
        'schema'          => null,
    ));
}
add_action('rest_api_init', 'register_custom_field_in_rest');

function get_custom_field_value($object, $field_name, $request) {
    return get_post_meta($object['id'], 'custom_url_meta_box', true);
} 