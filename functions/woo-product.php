<?php

/*
 *
 *Функции страницы продукта
 *
*/

//Вывод похожих продуктов
function similar_products() { ?>
	<a href="<?php echo get_permalink(); ?>" style = "color:#292929;">
		<div class="equipment-slider__item">
			<?php woocommerce_template_loop_product_image(); ?>
			<?php woocommerce_template_loop_product_title_bio(); ?>
		</div>
	</a>

	<?php
}