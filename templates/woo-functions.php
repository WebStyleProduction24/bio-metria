<?php

/*Декларируем поддержку WooCommerce v.3.6.2*/
add_action( 'after_setup_theme', 'woocommerce_support' );
function woocommerce_support() {
	add_theme_support( 'woocommerce' );
}

//Функции вывода функционала в админке для заполнения вкладок страницы товара
function art_woo_add_video_fields() {
	global $product, $post;
	?>
	<div class="options_group">
		<h2><strong>Контент вкладки "Видео"</strong></h2><p>
		<?php
		wp_editor(get_post_meta( $post->ID, '_video_desc', true ), 'video_desc', array(
			'wpautop'       => 1,
			'media_buttons' => 1,
			'textarea_name' => 'video_desc',
			'textarea_rows' => 10,
			'tabindex'      => null,
			'editor_css'    => '<style>.quicktags-toolbar, .wp-editor-tools, .wp-editor-wrap, .wp-switch-editor {padding: 5px 10px;}.woocommerce_options_panel textarea {height: 25em;}</style>',
			'editor_class'  => 'form-field',
			'teeny'         => 0,
			'dfw'           => 0,
			'tinymce'       => 1,
			'quicktags'     => 1,
			'drag_drop_upload' => false
		) );		
		?>
	</p></div>
	<?php
}

function art_woo_add_program_fields() {
	global $product, $post;
	?>
	<div class="options_group">
		<h2><strong>Контент вкладки "ПО"</strong></h2><p>
		<?php
		wp_editor(get_post_meta( $post->ID, '_program_desc', true ), 'program_desc', array(
			'wpautop'       => 1,
			'media_buttons' => 1,
			'textarea_name' => 'program_desc',
			'textarea_rows' => 10,
			'tabindex'      => null,
			'editor_css'    => '<style>.quicktags-toolbar, .wp-editor-tools, .wp-editor-wrap, .wp-switch-editor {padding: 5px 10px;}.woocommerce_options_panel textarea {height: 25em;}</style>',
			'editor_class'  => 'form-field',
			'teeny'         => 0,
			'dfw'           => 0,
			'tinymce'       => 1,
			'quicktags'     => 1,
			'drag_drop_upload' => false
		) );		
		?>
	</p></div>
	<?php
}


//Сохранение дополнительных полей вкладок в админке страницы товара
function art_woo_custom_video_save( $post_id ) {
	$woocommerce_textarea = $_POST['video_desc'];
	if ( ! empty( $woocommerce_textarea ) ) {
		update_post_meta( $post_id, '_video_desc', $woocommerce_textarea );
	}
}

function art_woo_custom_program_save( $post_id ) {
	$woocommerce_textarea = $_POST['program_desc'];
	if ( ! empty( $woocommerce_textarea ) ) {
		update_post_meta( $post_id, '_program_desc', $woocommerce_textarea );
	}
}


// Добавляем новые вкладки на странице товара

function woo_custom_product_tabs( $tabs ) {
	$tabs['video'] = array(
		'title'     => 'Видео',
		'priority'  => 10,
		'callback'  => 'woo_video_tab_content'
	);

	$tabs['programm'] = array(
		'title'     => 'ПО',
		'priority'  => 11,
		'callback'  => 'woo_program_tab_content'
	);
	unset($tabs['reviews']);
	unset($tabs['description']['title']);
	$tabs['description']['title'] = 'Полное описание';
	return $tabs;
}

// Контент новых вкладок

function woo_video_tab_content() {
	global $post;
	$video_desc= get_post_meta( $post->ID, '_video_desc', true );
	?>
	<?php echo $video_desc; ?>
	<?php
}

function woo_program_tab_content() {
	global $post;
	$program_desc= get_post_meta( $post->ID, '_program_desc', true );
	?>
	<?php echo $program_desc; ?>
	<?php
}

add_filter( 'woocommerce_short_description', 'filter_function_name_1033' );
function filter_function_name_1033( $product_short_description ){
	// filter...

	return $product_short_description;
}


function product_woo_add_custom_fields() {
	echo '<div class="options_group">';
	echo '<h2><strong>Отображение наименования продукта на странице</strong></h2>';
	echo '<p>Заполняется, если в наименовании кроме модели написан и тип продукта, например <i>Планшет Signotec ALPHA</i>.<br>';
	echo 'Если в наименовании продукта указана только модель, то достаточно заполнить одно поле: <u>Тип продукта</u>.</p>';
	echo '<p>';	
	// текстовое поле
	woocommerce_wp_text_input( array(
		'id'          => '_product_custom_woo',
		'label'       => 'Тип продукта',
		'placeholder' => 'Например, планшет',
		'desc_tip'    => 'true',
		'type'				=>	'text',
		'description' => 'Укажите тип продукта',
	) );	
	// текстовое поле
	woocommerce_wp_text_input( array(
		'id'          => '_model_custom_woo',
		'label'       => 'Модель',
		'placeholder' => 'Модель',
		'desc_tip'    => 'true',
		'type'				=>	'text',
		'description' => 'Введите модель продукта',
	) );	
	echo '</p></div>';	
}

function product_woo_custom_fields_save( $post_id ) {
	
	update_post_meta( $post_id, '_product_custom_woo', esc_attr( $_POST['_product_custom_woo'] ) );
	update_post_meta( $post_id, '_model_custom_woo', esc_attr( $_POST['_model_custom_woo'] ) );
	
}


function get_product_model() {
	global $post, $product;
	$product_custom = get_post_meta( $post->ID, '_product_custom_woo', true );
	$model_custom = get_post_meta( $post->ID, '_model_custom_woo', true );
	if ( $product_custom && $model_custom) {
		$print_text = '<span class="product-desc__type">' . $product_custom . '</span>';
		$print_text .= '<h1 class="product-desc__title">' . $model_custom . '</h1>';
		echo $print_text;
	} else if ($product_custom) {
		$print_text = '<span class="product-desc__type">' . $product_custom . '</span>';
		echo $print_text;
		the_title( '<h1 class="product-desc__title">', '</h1>' );
	} else {
		the_title( '<h1 class="product-desc__title">', '</h1>' );
	}
}