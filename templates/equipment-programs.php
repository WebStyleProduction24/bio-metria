<?php

// Блок "Программы и оборудование"

?>

<section class="equipment">
	<div class="container">
		<span class="title equipment_title">Оборудование и программы</span>
		<div class="equipment-list row">

			<div class="equipment-list__item col-md-4">
				<div class="equipment-list__normal">
					<svg class="equipment-list__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
						<use xlink:href="#equipment-1" />
					</svg>
					<span class="equipment-list__name"><?php echo get_the_category_by_ID( 53 ); ?></span>
				</div>
				<a href="<?php echo get_category_link(53); ?>">
					<div class="equipment-list__hover">
						<div class="equipment-list__top">
							<svg class="equipment-list__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
								<use xlink:href="#equipment-1" />
							</svg>
							<span class="equipment-list__title"><?php echo get_the_category_by_ID( 53 ); ?></span>
						</div>
						<?php echo term_description( 53 ); ?>
						<a class="equipment-list__link" href="<?php echo get_category_link(53); ?>"><i class="fas fa-angle-double-right"></i></a>
					</div>
				</a>
			</div>

			<div class="equipment-list__item col-md-4">
				<div class="equipment-list__normal">
					<svg class="equipment-list__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
						<use xlink:href="#equipment-5" />
					</svg>
					<span class="equipment-list__name"><?php echo get_the_category_by_ID( 57 ); ?></span>
				</div>
				<a href="<?php echo get_category_link(57); ?>">
					<div class="equipment-list__hover">
						<div class="equipment-list__top">
							<svg class="equipment-list__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129.81 121.1">
								<use xlink:href="#equipment-5" />
							</svg>
							<span class="equipment-list__title"><?php echo get_the_category_by_ID( 57 ); ?></span>
						</div>
						<?php echo term_description( 57 ); ?>
						<a class="equipment-list__link" href="<?php echo get_category_link(57); ?>"><i class="fas fa-angle-double-right"></i></a>
					</div>
				</a>
			</div>

			<div class="equipment-list__item col-md-4">
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