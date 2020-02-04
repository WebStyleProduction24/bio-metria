<?php



//Отображаем слайдер предложений на главной странице в header



?>



<div class="slider-offers slider-main">

	<?php

	$args=array(

		'post_type' => 'slider_of_offers',

		'order' => 'AC'

	);



	$slider_of_offers = get_posts($args);

	get_excerpt_slider_of_offers();

	foreach ($slider_of_offers as $post) :

		$id = get_the_ID();

		switch ($id) { 

			case 84:

			$link = '/catalog/schityvateli-dokumentov/';

			break;

			case 85:

			$link = '/catalog/programmy/biometricheskaia-podpis';

			break;			

			case 89:

			$link = '/catalog/biometricheskie-chitateli/';

			break;

			case 222:

			$link = '/catalog/programmy/phpbox-veb-klient/';

			break;

		}

		?>

		<div class="slider__item">

			<div class="slider__wrap">

				<span class="slider__title"><?php the_title(); ?></span>

				<?php the_excerpt(); ?>

				<a class="slider__more" href="<?php echo $link; ?>">Узнать подробнее</a>

			</div>

		</div>

	<?php endforeach; ?>

</div>