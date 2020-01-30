<?php

remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );

remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );

// remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );

//перемещаем положение цены на карточке товара
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
//add_action( 'woocommerce_before_single_product_summary', 'woocommerce_template_single_price', 30 );
add_action( 'wsp24_product_price_cart', 'woocommerce_template_single_price', 10 );

// Регистрируем хуки дополнительных вкладок в админке страницы товара
add_action( 'woocommerce_product_options_general_product_data', 'art_woo_add_program_fields' );
add_action( 'woocommerce_product_options_general_product_data', 'art_woo_add_video_fields' );

add_action( 'woocommerce_process_product_meta', 'art_woo_custom_video_save', 10 );
add_action( 'woocommerce_process_product_meta', 'art_woo_custom_program_save', 15 );

add_filter( 'woocommerce_product_tabs', 'woo_custom_product_tabs' );

//Формируем доп поля наименования продукта
add_action( 'woocommerce_product_options_general_product_data', 'product_woo_add_custom_fields' );

add_action( 'woocommerce_process_product_meta', 'product_woo_custom_fields_save', 10 );

add_action('woocommerce_single_product_summary', 'get_product_model', 16);

//Перемещаем блок похожих товаров
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );
add_action( 'woocommerce_related_products_bio', 'woocommerce_output_related_products', 10 );

//Меняем отображение продукта в категории товаров
remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );
remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 10 );

add_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_image', 10 );
add_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title_bio', 10 );
add_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_excerpt', 1 );
add_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_description_product', 20 );
add_action( 'woocommerce_after_shop_loop_item_title', 'free_consultation', 30 );

//Изменяем контент перед списком продуктов
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_output_all_notices', 10 );
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );

// add_action( 'woocommerce_before_shop_loop', 'category_list_menu', 40 );
add_action( 'woocommerce_before_shop_loop', 'category_before_list', 50 );

//Контент после списка продуктов
add_action('woocommerce_after_main_content', 'category_after_list', 20);