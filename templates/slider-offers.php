<?php

//Отображаем слайдер предложений на главной странице в header

?>

<div class="slider">
	<?php
	$args=array(
		'post_type' => 'slider_of_offers'
	);

	$slider_of_offers = get_posts($args);
	get_excerpt_slider_of_offers();
	foreach ($slider_of_offers as $post) :
		?>
		<div class="slider__item">
			<div class="slider__wrap">
				<span class="slider__title"><?php the_title(); ?></span>
				<?php the_excerpt(); ?>
				<a class="slider__more" href="<?php the_permalink(); ?>">Узнать подробнее</a>
			</div>
		</div>
	<?php endforeach; ?>
</div>