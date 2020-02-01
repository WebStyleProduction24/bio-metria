<?php

//Добавляем класс к цитате слайдера предложений

function get_excerpt_slider_of_offers() {

	add_filter( "the_excerpt", "add_class_excerpt" );

	function add_class_excerpt( $excerpt ) {

		return str_replace( '<p>', '<p class="slider__text">', $excerpt );

	}

}

//Заменяем класс цитаты поста
function get_excerpt_post() {
	add_filter( "the_excerpt", "add_class_excerpt_post" );
	function add_class_excerpt_post( $excerpt ) {
		return str_replace( '<p class="slider__text">', '<p class="articles__text">', $excerpt );
	}
}

//Заменяем обрезку текста в цитате
add_filter('excerpt_more', function($more) {
	return '...';
});

//Изменяем длину цитаты
add_filter( 'excerpt_length', function(){
	return 20;
} );
