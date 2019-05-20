<?php

// Подключаем блок "Программы и оборудование"

?>

<section class="equipment">
	<div class="container">
		<span class="title equipment_title">Оборудование и программы</span>
		<div class="equipment-list row">

			<div class="equipment-list__item col-lg-2 col-md-3">
				<div class="equipment-list__normal">
					<svg class="equipment-list__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
						<use xlink:href="#equipment-1" />
					</svg>
					<span class="equipment-list__name">Планшеты для подписи</span>
				</div>
				<a href="<?php echo get_category_link(16); ?>">
					<div class="equipment-list__hover">
						<div class="equipment-list__top">
							<svg class="equipment-list__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
								<use xlink:href="#equipment-1" />
							</svg>
							<span class="equipment-list__title">Планшеты для подписи</span>
						</div>
						<?php echo term_description( 16 ); ?>
						<a class="equipment-list__link" href="<?php echo get_category_link(16); ?>"><i class="fas fa-angle-double-right"></i></a>
					</div>
				</a>
			</div>

			<div class="equipment-list__item col-lg-2 col-md-3">
				<div class="equipment-list__normal">
					<svg class="equipment-list__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
						<use xlink:href="#equipment-2" />
					</svg>
					<span class="equipment-list__name"><?php echo get_the_category_by_ID( 27 ); ?></span>
				</div>
				<a href="<?php echo get_category_link(27); ?>">
					<div class="equipment-list__hover">
						<div class="equipment-list__top">
							<svg class="equipment-list__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
								<use xlink:href="#equipment-2" />
							</svg>
							<span class="equipment-list__title"><?php echo get_the_category_by_ID( 27 ); ?></span>
						</div>
						<?php echo term_description( 27 ); ?>
						<a class="equipment-list__link" href="<?php echo get_category_link(27); ?>"><i class="fas fa-angle-double-right"></i></a>
					</div>
				</a>
			</div>

			<div class="equipment-list__item col-lg-2 col-md-3">
				<div class="equipment-list__normal">
					<svg class="equipment-list__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
						<use xlink:href="#equipment-3" />
					</svg>
					<span class="equipment-list__name">Биометрические терминалы</span>
				</div>
				<a href="<?php echo get_category_link(25); ?>">
					<div class="equipment-list__hover">
						<div class="equipment-list__top">
							<svg class="equipment-list__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
								<use xlink:href="#equipment-3" />
							</svg>
							<span class="equipment-list__title">Биометрические терминалы</span>
						</div>
						<?php echo term_description( 25 ); ?>
						<a class="equipment-list__link" href="<?php echo get_category_link(25); ?>"><i class="fas fa-angle-double-right"></i></a>
					</div>
				</a>
			</div>

			<div class="equipment-list__item col-lg-2 col-md-3">
				<div class="equipment-list__normal">
					<svg class="equipment-list__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
						<use xlink:href="#equipment-4" />
					</svg>
					<span class="equipment-list__name">Программное обеспечение и OCR</span>
				</div>
				<a href="<?php echo get_category_link(20); ?>">
					<div class="equipment-list__hover">
						<div class="equipment-list__top">
							<svg class="equipment-list__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
								<use xlink:href="#equipment-4" />
							</svg>
							<span class="equipment-list__title">Программное обеспечение и OCR</span>
						</div>
						<?php echo term_description( 20 ); ?>
						<a class="equipment-list__link" href="<?php echo get_category_link(20); ?>"><i class="fas fa-angle-double-right"></i></a>
					</div>
				</a>
			</div>
		</div>

		<div class="equipment-list equipment-list_second row">
			<div class="equipment-list__item col-lg-2 col-md-3">
				<div class="equipment-list__normal">
					<svg class="equipment-list__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
						<use xlink:href="#equipment-5" />
					</svg>
					<span class="equipment-list__name"><?php echo get_the_category_by_ID( 22 ); ?></span>
				</div>
				<a href="<?php echo get_category_link(22); ?>">
					<div class="equipment-list__hover">
						<div class="equipment-list__top">
							<svg class="equipment-list__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
								<use xlink:href="#equipment-5" />
							</svg>
							<span class="equipment-list__title"><?php echo get_the_category_by_ID( 22 ); ?></span>
						</div>
						<?php echo term_description( 22 ); ?>
						<a class="equipment-list__link" href="<?php echo get_category_link(22); ?>"><i class="fas fa-angle-double-right"></i></a>
					</div>
				</a>
			</div>

			<div class="equipment-list__item col-lg-2 col-md-3">
				<div class="equipment-list__normal">
					<svg class="equipment-list__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
						<use xlink:href="#equipment-6" />
					</svg>
					<span class="equipment-list__name">Установки <?php echo get_the_category_by_ID( 21 ); ?></span>
				</div>
				<a href="<?php echo get_category_link(21); ?>">
					<div class="equipment-list__hover">
						<div class="equipment-list__top">
							<svg class="equipment-list__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
								<use xlink:href="#equipment-6" />
							</svg>
							<span class="equipment-list__title">Установки <?php echo get_the_category_by_ID( 21 ); ?></span>
						</div>
						<?php echo term_description( 21 ); ?>
						<a class="equipment-list__link" href="<?php echo get_category_link(21); ?>"><i class="fas fa-angle-double-right"></i></a>
					</div>
				</a>
			</div>

			<div class="equipment-list__item col-lg-2 offset-2-right col-md-3">
				<div class="equipment-list__normal">
					<svg class="equipment-list__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
						<use xlink:href="#equipment-7" />
					</svg>
					<span class="equipment-list__name"><?php echo get_the_category_by_ID( 19 ); ?></span>
				</div>
				<a href="<?php echo get_category_link(19); ?>">
					<div class="equipment-list__hover">
						<div class="equipment-list__top">
							<svg class="equipment-list__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
								<use xlink:href="#equipment-7" />
							</svg>
							<span class="equipment-list__title"><?php echo get_the_category_by_ID( 19 ); ?></span>
						</div>
						<?php echo term_description( 19 ); ?>
						<a class="equipment-list__link" href="<?php echo get_category_link(19); ?>"><i class="fas fa-angle-double-right"></i></a>
					</div>
				</a>
			</div>
		</div>
	</div>
</section>