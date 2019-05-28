<?php

/*
 *
 *Функции страницы категории товаров
 *
*/




//Изображения продукта
function woocommerce_template_loop_product_image() {
	remove_action( 'begin_fetch_post_thumbnail_html', '_wp_post_thumbnail_class_filter_add' );
	global $product;
	$id = $product->ID;
	$size = array(247, 216);
	$attr = array('class' => 'category-list__img');
	$img = get_the_post_thumbnail($id, $size, $attr);
	echo $img;
}

//Заголовок продукта
function woocommerce_template_loop_product_title_bio() {
	global $post;
	$product_custom = get_post_meta( $post->ID, '_product_custom_woo', true );
	$model_custom = get_post_meta( $post->ID, '_model_custom_woo', true );
	if ( $product_custom && $model_custom) {
		$print_text = '<p class="category-list__cat">' . $product_custom . '</p>';
		$print_text .= '<p class="category-list__name">' . $model_custom . '</p>';
		echo $print_text;
	} else if ($product_custom) {
		$print_text = '<p class="category-list__name">' . $product_custom . '</p>';
		echo $print_text;
		the_title( '<p class="category-list__name">', '</p>' );
	} else {
		the_title( '<p class="category-list__name">', '</p>' );
	}
}

//Краткое описание продукта 
function woocommerce_template_loop_excerpt() {
	global $post;
	$short_description = $post->post_excerpt;
	$short_description = mb_substr( $short_description, 0, 150 );
	$content_excerpt = '<p class="category-list__desc">' . $short_description . '<a href="' . get_permalink() . '">[...]</a></p>';
	echo $content_excerpt;
}

//Кнопка описание товара
function woocommerce_description_product() {
	echo '<a href="' . get_permalink() . '" class="btn category-list__btn">Описание товара</a>';
}

//Кнопа бесплатная консультация


function free_consultation() {
	button_consultation();
}