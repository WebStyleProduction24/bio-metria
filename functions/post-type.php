<?php

add_action( 'init', 'true_register_post_type_init' ); // Использовать функцию только внутри хука init
 
function true_register_post_type_init() {
	$labels = array(
		'name' => 'Предложения',
		'singular_name' => 'Предложение', // админ панель Добавить->Функцию
		'add_new' => 'Добавить предложение',
		'add_new_item' => 'Добавить новое предложение', // заголовок тега <title>
		'edit_item' => 'Редактировать предложение',
		'new_item' => 'Новое предложение',
		'all_items' => 'Все предложения',
		'view_item' => 'Просмотр предложения на сайте',
		'search_items' => 'Искать предложение',
		'not_found' =>  'Предложений не найдено.',
		'not_found_in_trash' => 'В корзине нет предложений.',
		'menu_name' => 'Слайдер предложений' // ссылка в меню в админке
	);
	$args = array(

		'labels' => $labels,
		'description' => 'Слайдер предложений под ключ на главной странице',
		'public' => true,
		'exclude_from_search' => false,
		'show_ui' => true, // показывать интерфейс в админке
		'has_archive' => true, 
		'menu_icon' => 'dashicons-update', // иконка в меню
		'menu_position' => 2, // порядок в меню
		'supports' => array( 'title', 'editor', 'excerpt')
	);

	register_post_type('slider_of_offers', $args);
}
